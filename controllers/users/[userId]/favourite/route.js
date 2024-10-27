import { NextResponse } from "next/server";
import { User } from "@/models/User";

export async function GET(req, { params }) {
  try {
    const { userId } = params;
    let data = await User.findById(userId)
      .select("FavoritePlaces")
      .populate("FavoritePlaces");

    const { FavoritePlaces } = JSON.parse(JSON.stringify(data));

    return NextResponse.json(
      { message: "success", data: FavoritePlaces },
      { status: 200 }
    );
  } catch (error) {
    console.error("error get user", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { userId, placeId } = params;

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isFavorite = user.FavoritePlaces.includes(placeId);

    const updateOperation = isFavorite
      ? { $pull: { FavoritePlaces: placeId } }
      : { $push: { FavoritePlaces: placeId } };

    const updatedUser = await User.findByIdAndUpdate(userId, updateOperation, {
      new: true,
    }).populate("FavoritePlaces");

    return NextResponse.json(
      { message: "success", data: updatedUser.FavoritePlaces },
      { status: 200 }
    );
  } catch (error) {
    console.error("error toggling favorite place", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
