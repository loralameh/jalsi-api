import { NextResponse } from "next/server";
import { User } from "@/models/User";

//  https://github.com/TwilioDevEd/verify-v2-quickstart-node/blob/next/routes/verify.js

import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function GET(req, { params }) {
  try {
    const { userId } = params;

    const user = await User.findById(userId);
    const phoneNumber = user.phoneNumber;
    //resend verify code from twillo
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.error("error User", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
export async function PUT(req, { params }) {
  try {
    const { userId } = params;
    const { verificationCode } = await req.json();

    let user = await User.findById(userId).select("phoneNumber");
    user = JSON.parse(JSON.stringify(user));

    let verificationResult;
    //twillo check verification code
    verificationResult = await client.verify.v2
      .services(process.env.VERIFICATION_SID)
      .verificationChecks.create({
        code: verificationCode,
        to: user.phoneNumber,
      });

    if (verificationResult.valid) {
      let user = await User.findByIdAndUpdate(
        userId,
        { isPhoneVarified: true },
        { new: true }
      );
      user = JSON.parse(JSON.stringify(user));
    }
    console.log("verificationResult", verificationResult);

    return NextResponse.json(
      { message: "success", data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("error User", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
