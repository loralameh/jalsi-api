const { mongoose } = require("mongoose");
import { OwnerUserGroup } from "@models/OwnerUserGroup";
import { PaymentMethod } from "@models/PaymentMethod";

const { ObjectId, Number, String, Date, Boolean } = mongoose.Schema.Types;

const BookingPolicySchema = new mongoose.Schema({
  UserGroup: {
    type: ObjectId,
    ref: "OwnerUserGroup",
    required: true,
  },
  PropertyOwner: {
    type: ObjectId,
    ref: "OwnerUserGroup",
    required: true,
  },
  AcceptedPaymentMethods: [
    {
      type: ObjectId,
      ref: "PaymentMethod",
      required: true,
    },
  ],
  isDirectReservationApproval: {
    type: Boolean,
    required: false,
  },
  isPayingDepositRequired: {
    type: Boolean,
    required: false,
  },
  depositDeadline: {
    type: Number, //represents the number of days that the deposit must be paid within
    required: false,
  },
  isCanceledIfDepositNotPaid: {
    type: Boolean,
    required: false,
  },
  depositAmount: {
    type: Number,
    required: false,
  },
  totalBalance: {
    type: Number,
    required: false,
  },
  remainingBalance: {
    type: Number,
    required: false,
  },
  isAdvancedRemainingBalanceRequired: {
    //the remaining ammount of money after deposit is paid
    type: Boolean,
    required: false,
  },
  advancedRemainingBalanceDeadline: {
    type: Number, //represents the number of days that the deposit must be paid within
    required: false,
  },
  isCancelIfadvancedRemainingBalanceNotPaid: {
    type: Boolean,
    required: false,
  },
  sendDepositeReminder: {
    //!how to do such functionality can we sceduale sending sms messages? but also we need to check if paid befor sending and not send it randomly

    //sends a reminder for user who have not paid yet 1 day before the deadline
    type: Boolean,
    required: false,
  },
  sendFullPaymentReminder: {
    //sends a reminder for user who have not paid yet 1 day before the deadline
    type: Boolean,
    required: false,
  },
  autoReject: {
    //used mainly for blocked users groups
    type: Boolean,
    required: false,
  },
});

BookingPolicySchema.set("toJSON", { getters: true, virtuals: false });

BookingPolicySchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret._id = ret._id.toString();

    return ret;
  },
};

module.exports = {
  BookingPolicy:
    mongoose.models.BookingPolicy ||
    mongoose.model("BookingPolicy", BookingPolicySchema),
  BookingPolicySchema,
};
