import { connectMongoDB } from "@/lib/mongodb";
import About from "@/models/About";
import { createDefaultAbout, createDefaultContact, normalizeAboutContent } from "@/lib/siteDefaults";

const defaultContact = createDefaultContact();

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export async function getSiteAbout() {
  try {
    await connectMongoDB();

    let about = await About.findOne().sort({ createdAt: -1 });

    if (!about) {
      const created = await About.create(createDefaultAbout());
      return normalizeAboutContent(created.toObject());
    }

    const normalized = normalizeAboutContent(about.toObject());
    const currentContact = about.contact || {};
    const contactNeedsBackfill = Object.keys(defaultContact).some(
      (key) => !isNonEmptyString(currentContact[key])
    );

    if (contactNeedsBackfill) {
      about = await About.findByIdAndUpdate(
        about._id,
        { contact: normalized.contact },
        { new: true }
      );
    }

    return normalizeAboutContent(about.toObject());
  } catch (error) {
    if (process.env.npm_lifecycle_event !== "build") {
      console.error("Failed to load about content:", error);
    }
    return createDefaultAbout();
  }
}
