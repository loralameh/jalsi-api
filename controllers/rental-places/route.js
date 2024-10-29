import { NextResponse } from "next/server";
import { RentalPlace } from "@models/RentalPlace";

import dayjs from "dayjs";
import {
  getFullyBookedPlaces,
  getRentalPlaceMinMaxPrice,
} from "@lib/backendHelpers/rentalPlace";

export async function GET(req) {
  try {
    const isFeatured = req.nextUrl.searchParams.get("isFeatured");
    const createdAt = req.nextUrl.searchParams.get("createdAt");
    const tag = req.nextUrl.searchParams.get("tag");
    const page = req.nextUrl.searchParams.get("page") || 1;
    const rows = 10;

    const dateFilter = req.nextUrl.searchParams.get("date");
    const minPriceFilter = req.nextUrl.searchParams.get("min");
    const maxPriceFilter = req.nextUrl.searchParams.get("max");
    const nameFilter = req.nextUrl.searchParams.get("name");
    const skipCount = (page - 1) * rows;

    let sort = createdAt ? { createdAt } : {};
    let filter = {};
    if (isFeatured) {
      filter.isFeatured = isFeatured;
    }
    if (createdAt) {
      // Filter to include only places added within the last month
      const oneMonthAgo = dayjs().subtract(1, "month").toDate();
      filter.createdAt = { $gte: oneMonthAgo };
    }
    if (tag) {
      filter = { ...filter, Tags: { $in: [tag] } };
    }
    if (nameFilter) {
      // Case-insensitive regex to match one or more words
      const regex = new RegExp(nameFilter.trim().replace(/\s+/g, "|"), "i");
      filter = { ...filter, name: { $regex: regex } };
    }
    if (minPriceFilter && maxPriceFilter) {
      filter = {
        ...filter,
        minPrice: { $gte: minPriceFilter },
        maxPrice: { $lte: maxPriceFilter },
      };
    }
    let data = await RentalPlace.find(filter)
      .skip(skipCount)
      .limit(rows)
      .sort(sort) // Sort by createdAt descending (-1 for descending, 1 for ascending)
      .populate([{ path: "amenities", populate: "Amenity" }]);

    data = JSON.parse(JSON.stringify(data));

    if (dateFilter && dateFilter != null) {
      let fullyBookedPlacesIds = [];

      fullyBookedPlacesIds = await getFullyBookedPlaces({
        date: dateFilter,
        rentalPlaces: data,
      });

      //remove objects from an array (data) based on matching _id values present in another array (fullyBookedPlacesIds)
      data = data.filter((obj) => !fullyBookedPlacesIds.includes(obj._id));
    }

    return NextResponse.json({ message: "success", data }, { status: 200 });
  } catch (error) {
    console.error("error get rentalPlace", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
export async function POST(req) {
  try {
    const data = await req.json();
    if (data.timeBasedRates) {
      const { minPrice, maxPrice } = getRentalPlaceMinMaxPrice(
        data.timeBasedRates
      );
      data.minPrice = minPrice;
      data.maxPrice = maxPrice;
    }
    const newRentalPlace = new RentalPlace(data);
    await newRentalPlace.save();

    return NextResponse.json(
      { message: "success", data: newRentalPlace },
      { status: 201 }
    );
  } catch (error) {
    console.error("error rentalPlace", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
