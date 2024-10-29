import { NextResponse } from "next/server";
import { User } from "@models/User";

import bcrypt from "bcrypt";

export async function PATCH(req, { params }) {
  try {
    const { userId } = params;
    const { currentPassword, newPassword, confirmPassword } = await req.json();

    //TODO add more verifications
    const user = await User.findById(userId).select("password");

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Current Password isn't correct" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    let updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: newHashedPassword },
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
