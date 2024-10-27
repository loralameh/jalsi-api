import { NextResponse } from "next/server";
import { BookingPolicy } from "@/models/BookingPolicy";

export async function GET(req) {
  try {
    const data = await BookingPolicy.find();

    return NextResponse.json(
      { message: "success", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("error get bookingPolicy", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
export async function POST(req) {
  try {
    const data = await req.json();
    const newBookingPolicy = new BookingPolicy(data);
    await newBookingPolicy.save();

    return NextResponse.json(
      { message: "success", data: newBookingPolicy },
      { status: 201 }
    );
  } catch (error) {
    console.error("error bookingPolicy", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
