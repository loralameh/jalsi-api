import { NextResponse } from "next/server";
import { Booking } from "@/models/Booking";

import dayjs from "dayjs";

export async function GET(req) {
  try {
    const rentalPlace = req.nextUrl.searchParams.get("rentalPlace");
    let startDate = req.nextUrl.searchParams.get("startDate");
    let endDate = req.nextUrl.searchParams.get("endDate");

    //default values if no search params found
    startDate = startDate ? dayjs(startDate) : dayjs().startOf("month");
    endDate = endDate ? dayjs(endDate) : dayjs().add(1, "month").endOf("month");

    if (!rentalPlace) {
      console.error("rental place is missing");

      return NextResponse.json(
        { message: "rental place is missing" },
        { status: 400 }
      );
    }

    const data = await Booking.find({
      RentalPlace: rentalPlace,
      startDate: { $gte: startDate },
      endDate: { $lte: endDate },
    }).select(["startDate", "endDate"]);

    return NextResponse.json(
      { message: "success", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("error get booking", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
export async function POST(req) {
  try {
    const data = await req.json();
    const newBooking = new Booking(data);
    await newBooking.save();

    return NextResponse.json(
      { message: "success", data: newBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error("error booking", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
