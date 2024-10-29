import { NextResponse } from "next/server";
import { User } from "@models/User";

import bcrypt from "bcrypt";

export async function GET(req) {
  try {
    const data = await User.find();

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
    const newUser = new User(data);

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(data.password, salt);
    newUser.password = hashedPwd;
    await newUser.save();

    return NextResponse.json(
      { message: "success", data: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("error user", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
