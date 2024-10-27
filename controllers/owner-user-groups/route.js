import { NextResponse } from "next/server";
import { OwnerUserGroup } from "@/models/OwnerUserGroup";

export async function GET(req) {
  try {
    const data = await OwnerUserGroup.find();

    return NextResponse.json(
      { message: "success", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("error get ownerUserGroup", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
export async function POST(req) {
  try {
    const data = await req.json();
    const newOwnerUserGroup = new OwnerUserGroup(data);
    await newOwnerUserGroup.save();

    return NextResponse.json(
      { message: "success", data: newOwnerUserGroup },
      { status: 201 }
    );
  } catch (error) {
    console.error("error ownerUserGroup", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
