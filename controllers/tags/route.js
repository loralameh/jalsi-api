import { NextResponse } from "next/server";
import { Tag } from "@models/Tag";

export async function GET(req) {
  try {
    let data = await Tag.find();

    return NextResponse.json(
      { message: "success", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("error get tag", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
export async function POST(req) {
  try {
    const data = await req.json();
    const newTag = new Tag(data);
    await newTag.save();

    return NextResponse.json(
      { message: "success", data: newTag },
      { status: 201 }
    );
  } catch (error) {
    console.error("error tag", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
