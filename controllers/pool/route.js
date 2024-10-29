import { Property } from "@models/Pool";
import { Pool } from "@models/Pool";

export async function GET(req) {
  try {
    const data = await Pool.find();

    return NextResponse.json(
      { message: "success", data: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("error get pool", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

// export default async function handler(req, res) {
//   const {
//     method,
//     query: { doctors },
//   } = req;
//   const get = async (req, res) => {
//     try {
//       const prop = await Property.find().populate("Pool").lean();

//       let properties = prop.map((property) => {
//         let minPrice = 0;
//         let maxPrice = 0;
//         if (property.type == "pool") {
//           for (let j = 0; j < property.Pool.rentalPolicy.length; j++) {
//             const pool = property.Pool.rentalPolicy[j];
//             if (minPrice < pool.price) {
//               minPrice = pool.price;
//             }
//             if (maxPrice < pool.price) {
//               maxPrice = pool.price;
//             }
//           }

//           return {
//             ...property,
//             Pool: { ...property.Pool, minPrice, maxPrice },
//           };
//         } else {
//           return property;
//         }
//       });

//       res.status(200).json({ success: true, data: properties, message: "" });
//     } catch (error) {
//       console.error(error);
//       res.status(400).json({ success: false, error: error.message });
//     }
//   };

//   const post = async (req, res) => {
//     try {
//       let updateData = (({
//         type,
//         description,
//         name,
//         PropertyOwner,
//         addressPresentation,
//         imageGallery,
//       }) => ({
//         type,
//         description,
//         name,
//         PropertyOwner,
//         addressPresentation,
//         imageGallery,
//       }))(req.body);

//       let property;

//       switch (req.body.type) {
//         case "pool":
//           const poolData = req.body.Pool;
//           const { beds, rooms, dimentions, rentalPolicy } = poolData;
//           const newPool = await Pool.create({
//             beds,
//             rooms,
//             dimentions,
//             rentalPolicy,
//           });
//           property = await Property.create({
//             ...updateData,
//             Pool: newPool._id,
//           });
//           break;

//         default:
//           property = await Property.create(updateData);

//           break;
//       }

//       res.status(200).json({ success: true, data: property });
//     } catch (error) {
//       console.error({ error });
//       res.status(400).json({ success: false, error: error.message });
//     }
//   };

//   switch (method) {
//     case "GET": {
//       await get(req, res);
//       break;
//     }
//     case "POST": {
//       await post(req, res);
//       break;
//     }
//     default:
//       res.setHeader("Allow", ["GET", "POST"]);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }

// export const config = {
//   api: {
//     bodyParser: true,
//   },
// };
