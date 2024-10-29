import { NextResponse } from "next/server";
import { PropertyOwner } from "@models/PropertyOwner";

export async function GET(req) {
  try {
    const data = await PropertyOwner.find();

    return NextResponse.json(
      { message: "success", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("error get propertyOwner", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
export async function POST(req) {
  try {
    const data = await req.json();
    const newPropertyOwner = new PropertyOwner(data);
    await newPropertyOwner.save();

    return NextResponse.json(
      { message: "success", data: newPropertyOwner },
      { status: 201 }
    );
  } catch (error) {
    console.error("error propertyOwner", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
