import { NextResponse } from "next/server";
import { Review } from "@/models/Review";

export async function GET(req) {
  try {
    const data = await Review.find();

    return NextResponse.json(
      { message: "success", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("error get review", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
export async function POST(req) {
  try {
    const data = await req.json();
    const newReview = new Review(data);
    await newReview.save();

    return NextResponse.json(
      { message: "success", data: newReview },
      { status: 201 }
    );
  } catch (error) {
    console.error("error review", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
