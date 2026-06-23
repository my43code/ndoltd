import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import { revalidateSite } from "@/lib/revalidateSite";

export async function PUT(request, { params }) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const { title, summary, content, image } = await request.json();

    if (!id) {
      return NextResponse.json({ message: "Missing post id" }, { status: 400 });
    }

    if (!title || !summary || !content) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, summary, content, image },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    revalidateSite();

    return NextResponse.json({ message: "Post updated", post: updatedPost }, { status: 200 });
  } catch (error) {
    console.error("PUT /api/posts/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to update post", error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const authError = await requireAdmin(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    await connectMongoDB();
    await Post.findByIdAndDelete(id);
    revalidateSite();
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/posts/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to delete post" },
      { status: 500 }
    );
  }
}
