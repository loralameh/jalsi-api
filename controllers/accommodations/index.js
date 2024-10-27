import { Accommodation } from "@models/Accommodation";

const getAccommodations = async (req, res) => {
  try {
    const data = await Accommodation.find();
    res.status(StatusCodes.OK).json({ data: data });
  } catch (error) {
    console.error("error get accommodation", error.message);
  }
};

const postAccommodations = async (req, res) => {
  // try {
  //   const data = await req.json();
  //   const newAccommodation = new Accommodation(data);
  //   await newAccommodation.save();
  //   return NextResponse.json(
  //     { message: "success", data: newAccommodation },
  //     { status: 201 }
  //   );
  // } catch (error) {
  //   console.error("error accommodation", error.message);
  //   return NextResponse.json({ message: error.message }, { status: 400 });
  // }
};

export { getAccommodations, postAccommodations };
