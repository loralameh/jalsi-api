import { NextResponse } from "next/server";
import { Amenity } from "@models/Amenity";

export async function GET(req) {
  try {
    const data = await Amenity.find();

    return NextResponse.json(
      { message: "success", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("error get amenity", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
export async function POST(req) {
  try {
    const data = await req.json();
    const newAmenity = new Amenity(data);
    await newAmenity.save();

    return NextResponse.json(
      { message: "success", data: newAmenity },
      { status: 201 }
    );
  } catch (error) {
    console.error("error amenity", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
