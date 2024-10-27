const { mongoose } = require("mongoose");
import { OwnerUserGroup } from "src/models/OwnerUserGroup";
import { SubscriptionPlan } from "src/models/SubscriptionPlan";
import { PaymentMethod } from "src/models/PaymentMethod";
import { User } from "src/models/User";
const { ObjectId, Number, String, Date, Boolean } = mongoose.Schema.Types;

const PropertyOwnerSchema = new mongoose.Schema({
  User: {
    type: ObjectId,
    ref: "User",
  },
  OwnerUserGroups: [
    {
      type: ObjectId,
      ref: "OwnerUserGroup",
      required: false,
    },
  ],

  PaymentMethods: [
    {
      type: ObjectId,
      ref: "PaymentMethod",
    },
  ],

  SubscriptionPlan: {
    type: ObjectId,
    ref: "SubscriptionPlan",
    required: false,
  },
});

PropertyOwnerSchema.set("toJSON", { getters: true, virtuals: false });

PropertyOwnerSchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret._id = ret._id.toString();

    return ret;
  },
};

module.exports = {
  PropertyOwner:
    mongoose.models.PropertyOwner ||
    mongoose.model("PropertyOwner", PropertyOwnerSchema),
  PropertyOwnerSchema,
};
