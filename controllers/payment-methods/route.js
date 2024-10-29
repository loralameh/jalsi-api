import { NextResponse } from "next/server";
import { PaymentMethod } from "@models/PaymentMethod";

export async function GET(req) {
  try {
    const data = await PaymentMethod.find();

    return NextResponse.json(
      { message: "success", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("error get paymentMethod", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
export async function POST(req) {
  try {
    const data = await req.json();
    const newPaymentMethod = new PaymentMethod(data);
    await newPaymentMethod.save();

    return NextResponse.json(
      { message: "success", data: newPaymentMethod },
      { status: 201 }
    );
  } catch (error) {
    console.error("error paymentMethod", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
