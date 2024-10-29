const { mongoose } = require("mongoose");
import { User } from "@models/User";
import { PropertyOwner } from "@models/PropertyOwner";
const { ObjectId, Number, String, Date, Boolean } = mongoose.Schema.Types;

const OwnerUserGroupSchema = new mongoose.Schema({
  PropertyOwner: {
    type: ObjectId,
    ref: "PropertyOwner",
  },
  name: {
    //group name: by default we have default group and blocked group
    type: String,
    required: true,
  },
  Users: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
});

OwnerUserGroupSchema.set("toJSON", { getters: true, virtuals: false });

OwnerUserGroupSchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret._id = ret._id.toString();

    return ret;
  },
};

module.exports = {
  OwnerUserGroup:
    mongoose.models.OwnerUserGroup ||
    mongoose.model("OwnerUserGroup", OwnerUserGroupSchema),
  OwnerUserGroupSchema,
};
