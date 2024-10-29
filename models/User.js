const { mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const RentalPlace = require("@models/RentalPlace");
// const Booking = require("@models/Booking");
// const Notification = require("@models/Notification");
// const PropertyOwner = require("@models/PropertyOwner");

const { ObjectId, Number, String, Date, Boolean } = mongoose.Schema.Types;

const phoneNumberSchema = new mongoose.Schema({
  countryCode: {
    type: String,
    required: true,
    match: /^\+\d{1,3}$/, // Matches country code with + and 1-3 digits
    trim: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{7,14}$/, // Matches a phone number with 7 to 14 digits
    trim: true,
  },
});
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
      required: [true, "Please provide password"],
      minlength: 6,
    },
    phoneNumber: {
      type: phoneNumberSchema,
      required: true,
    },
    profileImage: {
      type: String,
      required: false,
      default: "https://i.stack.imgur.com/34AD2.jpg",
    },
    email: {
      type: String,
      required: false,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
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

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = {
  User: mongoose.models.User || mongoose.model("User", UserSchema),
  UserSchema,
};
