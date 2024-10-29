import { NextResponse } from "next/server";
import { Notification } from "@models/Notification";

export async function GET(req) {
  try {
    const data = await Notification.find();

    return NextResponse.json(
      { message: "success", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("error get notification", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
export async function POST(req) {
  try {
    const data = await req.json();
    const newNotification = new Notification(data);
    await newNotification.save();

    return NextResponse.json(
      { message: "success", data: newNotification },
      { status: 201 }
    );
  } catch (error) {
    console.error("error notification", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
