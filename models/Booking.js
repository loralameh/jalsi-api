const { mongoose } = require("mongoose");
import { Invoice } from "@/models/Invoice";
import { User } from "@/models/User";
import { RentalPlace } from "@/models/RentalPlace";
import { BookingPolicy } from "@/models/BookingPolicy";
import { PaymentMethod } from "@/models/PaymentMethod";

const { ObjectId, Number, String, Date, Boolean } = mongoose.Schema.Types;

const BookingSchema = new mongoose.Schema(
  {
    RentalPlace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RentalPlace",
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    BookingPolicy: {
      type: ObjectId,
      ref: "BookingPolicy",
      required: true,
    },
    BookedBy: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    Invoices: [
      {
        type: ObjectId,
        ref: "Invoice",
        required: false,
      },
    ],
    isFullyPaid: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "waiting deposit payment",
        "deposite paid",
        "full payment paid",
        "rejected",
        "cancelled",
      ],
      required: true,
    },
    message: {
      type: String, //why accepted or why rejected
      required: false,
    },
  },
  { timestamps: true }
);

BookingSchema.set("toJSON", { getters: true, virtuals: false });

BookingSchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret._id = ret._id.toString();

    return ret;
  },
};

module.exports = {
  Booking: mongoose.models.Booking || mongoose.model("Booking", BookingSchema),
  BookingSchema,
};
