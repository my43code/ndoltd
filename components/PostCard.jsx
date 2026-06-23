import Image from "next/image";
import Link from "next/link";

export default function PostCard({ post }) {
  const postedAt = post?.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  const readingTime = Math.max(
    1,
    Math.ceil(((post?.content || post?.summary || "").length || 240) / 900)
  );

  return (
    <Link href={`/updates/${post._id}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white/95 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_22px_60px_rgba(15,23,42,0.14)]">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
          <Image
            src={post.image || "/images/project1.webp"}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white backdrop-blur">
              Update
            </span>

            <div className="text-right text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80">
              <p>{postedAt}</p>
              <p>{readingTime} min read</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-bold tracking-tight text-slate-950 md:text-2xl">
            {post.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
            {post.summary}
          </p>
          <div className="mt-auto flex items-center justify-between gap-4 pt-6">
            <span className="text-sm font-semibold text-emerald-700">
              Read story
            </span>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
              Editorial
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
