import { NextResponse } from "next/server";
import { hash } from "bcrypt";

import { User } from "@/models/User";

export async function POST(request) {
  try {
    const { email, password, firstName, lastName, phoneNumber } =
      await request.json();
    //TODO YOU MAY WANT TO ADD SOME VALIDATION HERE

    const hashedPassword = await hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
    });
    await user.save();
    // TODO send a verification code via whatsapp
    return NextResponse.json(
      { message: "success", data: "user created" },
      { status: 201 }
    );
  } catch (error) {
    console.log({ e });
    let message = "error happened while registering this user";
    if (error.code && error.code === 11000 && error.keyPattern?.email == 1) {
      //TODO send a warning message to the user with this email
      message = `email already used!`;
    }
    if (
      error.code &&
      error.code === 11000 &&
      error.keyPattern?.phoneNumber == 1
    ) {
      //TODO send a warning message to the user with this phoneNumber
      message = `phone number already used!`;
    }
    return NextResponse.json({ message }, { status: 400 });
  }
}
