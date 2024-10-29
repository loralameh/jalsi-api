import { NextResponse } from "next/server";
import { ContactMessage } from "@models/ContactMessage";

export async function GET(req) {
  try {
    const data = await ContactMessage.find();

    return NextResponse.json(
      { message: "success", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("error get user", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
export async function POST(req) {
  try {
    const data = await req.json();
    const newContactMessage = new ContactMessage(data);
    await newContactMessage.save();

    return NextResponse.json(
      { message: "success", data: newContactMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("error user", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
