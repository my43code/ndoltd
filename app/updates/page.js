export const revalidate = 60;

import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import PostCard from "@/components/PostCard";
import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/Post";

async function getPosts() {
  try {
    await connectMongoDB();
    const posts = await Post.find().sort({ createdAt: -1 }).lean();
    return { posts };
  } catch (error) {
    if (process.env.npm_lifecycle_event !== "build") {
      console.error("Failed to load posts:", error);
    }
    return { posts: [] };
  }
}

export default async function UpdatesPage() {
  const data = await getPosts();
  const posts = data?.posts || [];
  const latestPost = posts[0];

  return (
    <main className="bg-slate-50">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.18),transparent_22%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.12),transparent_18%),radial-gradient(circle_at_50%_80%,rgba(250,204,21,0.1),transparent_20%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(2,6,23,0.98)_0%,rgba(15,23,42,0.72)_50%,rgba(6,78,59,0.48)_100%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            <span className="hero-fade-up inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200 backdrop-blur">
              Company updates
            </span>
            <h1 className="hero-fade-up-delay-1 mt-6 text-5xl font-black tracking-tight md:text-7xl">
              News, announcements, and fresh stories from the team.
            </h1>
            <p className="hero-fade-up-delay-2 mt-6 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
              Stay informed with the latest updates, insights, and stories from our team. We share news about our projects, company milestones, and industry trends to keep you in the loop.
            </p>
            <div className="hero-fade-up-delay-3 mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-emerald-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                Contact us
              </Link>
              <Link
                href={latestPost ? `/updates/${latestPost.slug || latestPost._id}` : "/contact"}
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:border-white/30 hover:bg-white/10"
              >
                Read latest update
              </Link>
            </div>
          </div>
        </div>
      </section> 

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionTitle
          eyebrow="Editorial"
          title="Published updates"
          subtitle="Stay informed with the latest news and insights from our team."
          align="left"
        />

        {posts.length === 0 ? (
          <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            No updates yet. Publish the first post from the admin dashboard.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
