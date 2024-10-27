import { NextResponse } from "next/server";
import { User } from "@/models/User";

// https://github.com/TwilioDevEd/verify-v2-quickstart-node/blob/next/routes/verify.js
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function PUT(req, { params }) {
  try {
    const { userId } = params;
    const { phoneNumber } = await req.json();
    //save phone number in db
    let user = await User.findByIdAndUpdate(
      userId,
      { phoneNumber },
      { new: true }
    ).select("phoneNumber");

    user = JSON.parse(JSON.stringify(user));

    //twillo call to send verification code to whatsapp
    const channel = "sms";
    let verificationRequest;

    try {
      verificationRequest = await client.verify.v2
        .services(process.env.VERIFICATION_SID)
        .verifications.create({ to: phoneNumber, channel });
      console.log("verificationRequest", verificationRequest);
    } catch (e) {
      console.error(e);
      return NextResponse.json({ message: e.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "success", data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("error User", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
