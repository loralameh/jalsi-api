const { mongoose } = require("mongoose");
import { RentalPlace } from "@/models/RentalPlace";
import { Booking } from "@/models/Booking";
import { Notification } from "@/models/Notification";
import { PropertyOwner } from "@/models/PropertyOwner";
const { ObjectId, Number, String, Date, Boolean } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
      unique: true,
      sparse: true, //ignore null values
    },
    profileImage: {
      type: String,
      required: false,
      default: "https://i.stack.imgur.com/34AD2.jpg",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    ReviewedPlaces: [
      {
        type: ObjectId,
        ref: "RentalPlace",
      },
    ],
    address: {
      // TODO might want to consider a more detailed structure based on needs
      type: String,
      required: false,
    },
    Bookings: [
      //list of booked properties by this user
      {
        type: ObjectId,
        ref: "Booking",
      },
    ],
    FavoritePlaces: [
      {
        type: ObjectId,
        ref: "RentalPlace",
      },
    ],
    PropertyOwner: {
      type: ObjectId,
      ref: "PropertyOwner",
      required: false,
    },
    role: {
      type: String,
      enum: ["user", "property-owner", "super-admin"],
      required: true,
      default: "user",
    },
    isPhoneVarified: {
      type: Boolean,
      required: true,
      default: false,
    },

    Notifications: [
      {
        type: ObjectId,
        ref: "Notification",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

UserSchema.set("toJSON", { getters: true, virtuals: false });

UserSchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret._id = ret._id.toString();

    return ret;
  },
};

module.exports = {
  User: mongoose.models.User || mongoose.model("User", UserSchema),
  UserSchema,
};
