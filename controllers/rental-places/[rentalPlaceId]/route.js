import { NextResponse } from "next/server";
import { RentalPlace } from "@/models/RentalPlace";

export async function GET(req, { params }) {
  try {
    const { rentalPlaceId } = params;
    let data = await RentalPlace.findById(rentalPlaceId).populate([
      "Tags",
      {
        path: "Reviews",
        populate: { path: "Reviewer", select: ["firstName", "lastName"] },
      },
      { path: "amenities", populate: "Amenity" },
      {
        path: "PropertyOwner",
        populate: {
          path: "User",
          select: ["firstName", "lastName", "phoneNumber", "profileImage"],
        },
      },
      {
        path: "Pools",
        populate: "Type",
      },
      {
        path: "Accommodation",
        populate: {
          path: "Type",
        },
      },
    ]);
    data = JSON.parse(JSON.stringify(data));

    let minPrice = 0;
    let maxPrice = 0;
    //loop over all rates that this place offer
    for (let j = 0; j < data.timeBasedRates.length; j++) {
      const currentRate = data.timeBasedRates[j];
      if (minPrice < currentRate.price) {
        minPrice = currentRate.price;
      }
      if (maxPrice < currentRate.price) {
        maxPrice = currentRate.price;
      }
    }
    data = {
      ...data,
      minPrice,
      maxPrice,
    };

    return NextResponse.json(
      { message: "success", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("error get rentalPlace", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { rentalPlaceId } = params;
    const data = await RentalPlace.findById(rentalPlaceId);

    return NextResponse.json(
      { message: "success", data: data },
      { status: 201 }
    );
  } catch (error) {
    console.error("error rentalPlace", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
