const { mongoose } = require("mongoose");
import { RentalPlace } from "src/models/RentalPlace";
import { Booking } from "src/models/Booking";
import { User } from "src/models/User";
const { ObjectId, Number, String, Date, Boolean } = mongoose.Schema.Types;

const ReviewSchema = new mongoose.Schema(
  {
    RentalPlace: {
      type: ObjectId,
      ref: "RentalPlace",
      required: true,
    },
    Booking: {
      type: ObjectId,
      ref: "Booking",
      required: true,
    },
    Reviewer: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: false,
    },
    starCount: {
      type: Number,
      required: false,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

ReviewSchema.set("toJSON", { getters: true, virtuals: false });

ReviewSchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret._id = ret._id.toString();

    return ret;
  },
};

module.exports = {
  Review: mongoose.models.Review || mongoose.model("Review", ReviewSchema),
  ReviewSchema,
};
