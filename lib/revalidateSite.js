import { revalidatePath } from "next/cache";

export function revalidateSite() {
  revalidatePath("/", "layout");
  revalidatePath("/updates/[slug]", "page");
}
