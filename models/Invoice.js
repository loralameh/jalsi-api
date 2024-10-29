const { mongoose } = require("mongoose");
import { Booking } from "@models/Booking";
import { PaymentMethod } from "@models/PaymentMethod";
import { PropertyOwner } from "@models/PropertyOwner";
import { RentalPlace } from "@models/RentalPlace";
import { User } from "@models/User";

const { ObjectId, Number, String, Date, Boolean } = mongoose.Schema.Types;

const InvoiceSchema = new mongoose.Schema(
  {
    PaymentMethod: {
      type: ObjectId,
      ref: "PaymentMethod",
      required: true,
    },
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
    Issuer: {
      type: ObjectId,
      ref: "PropertyOwner",
      required: true,
    },
    IssuedTo: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    issuerName: {
      type: String,
      required: true,
    },
    issuedToName: {
      type: String,
      required: true,
    },
    bookedPlaceName: {
      type: String,
      required: true,
    },
    paydate: {
      type: Date,
      required: true,
    },
    paidAmount: {
      type: Number,
      required: true,
    },
    totalBalance: {
      type: Number,
      required: true,
    },
    remainingBalance: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

InvoiceSchema.set("toJSON", { getters: true, virtuals: false });

InvoiceSchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret._id = ret._id.toString();

    return ret;
  },
};
module.exports = {
  Invoice: mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema),
  InvoiceSchema,
};
