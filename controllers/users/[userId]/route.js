import { NextResponse } from "next/server";
import { User } from "@/models/User";

export async function GET(req, { params }) {
  try {
    const { userId } = params;
    let data = await User.findById(userId).select("-password");
    data = JSON.parse(JSON.stringify(data));

    return NextResponse.json(
      { message: "success", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("error get user", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { userId } = params;
    const { firstName, lastName, address } = await req.json();
    let updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName: firstName, lastName: lastName, address: address },
      {
        new: true,
      }
    );
    return NextResponse.json(
      { message: "success", data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("error User", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
