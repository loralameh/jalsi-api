import { NextResponse } from "next/server";
import { Pool } from "@/models/Pool";

export async function POST(req) {
  try {
    const data = await req.json();
    const newPool = new Pool(data);
    await newPool.save();

    return NextResponse.json(
      { message: "success", data: newPool },
      { status: 201 }
    );
  } catch (error) {
    console.error("error pool", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
