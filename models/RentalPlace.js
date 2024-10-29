const { mongoose } = require("mongoose");
import { Review } from "@models/Review";
import { Accommodation } from "@models/Accommodation";
import { Pool } from "@models/Pool";
import { PropertyOwner } from "@models/PropertyOwner";
import { BookingPolicy } from "@models/BookingPolicy";
import { Amenity } from "@models/Amenity";
import { Tag } from "@models/Tag";

const { ObjectId, Number, String, Date, Boolean } = mongoose.Schema.Types;

const amenityMapSchema = new mongoose.Schema({
  //ex: aminity: parking available , details: 3 cars
  Amenity: { type: ObjectId, ref: "Amenity" },
  details: {
    type: String,
  },
});
const RentalPlaceSchema = new mongoose.Schema(
  {
    PropertyOwner: {
      type: ObjectId,
      ref: "PropertyOwner",
      required: true,
    },
    Tags: [
      {
        type: ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    Pools: [
      {
        type: ObjectId,
        ref: "Pool",
        required: false,
      },
    ],
    Accommodation: {
      type: ObjectId,
      ref: "Accommodation",
      required: false,
    },
    amenities: [
      {
        type: amenityMapSchema,
        required: false,
      },
    ],
    GroupsBookingPolicies: [
      // array of policies (1 policy/ 1 OwnerUserGroup)
      {
        type: ObjectId,
        ref: "BookingPolicy",
        required: false,
      },
    ],
    googleMapAddressLink: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    Reviews: [
      {
        type: ObjectId,
        ref: "Review",
        required: false,
      },
    ],
    totalNumberStars: {
      type: Number,
      default: 0,
    },
    cancellationPolicy: {
      type: String,
      required: false,
    },
    imageGallery: [
      {
        type: String,
        required: false,
      },
    ],
    note: {
      type: String,
      required: false,
    },
    coverImage: {
      type: String,
      required: false,
    },
    videoLink: {
      type: String,
      required: false,
    },
    label: {
      type: String, //could be added to add a label to the property like 'on sale' or 'free breakfast' so any temporary offer
      required: false,
    },
    instaLink: {
      type: String,
      required: false,
    },
    fbLink: {
      type: String,
      required: false,
    },
    tiktokLink: {
      type: String,
      required: false,
    },
    isFeatured: {
      type: Boolean,
      required: true,
      default: false,
    },
    //add checkin checkout time and a flag
    timeBasedRates: [
      {
        slotStart: {
          type: Date,
          required: false,
        },
        slotEnd: {
          type: Date,
          required: false,
        },
        price: {
          type: Number,
          required: false,
        },
        day: {
          type: Number,
          required: false,
        },
      },
    ],
    minPrice: {
      type: Number,
      default: 0,
    },
    maxPrice: {
      type: Number,
      default: 0,
    },
    // faq: [
    //   {
    //     type: String, // Frequently asked questions
    //     required: false,
    //   },
    // ],
  },
  { timestamps: true }
);

RentalPlaceSchema.set("toJSON", { getters: true, virtuals: false });

RentalPlaceSchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret._id = ret._id.toString();
    delete ret.__v;

    return ret;
  },
};

module.exports = {
  RentalPlace:
    mongoose.models.RentalPlace ||
    mongoose.model("RentalPlace", RentalPlaceSchema),
  RentalPlaceSchema,
};
