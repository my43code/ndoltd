import { connectMongoDB } from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    await ContactMessage.create({ name, email, subject, message });

    return NextResponse.json(
      { message: "Message saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      { message: "Failed to save message" },
      { status: 500 }
    );
  }
}