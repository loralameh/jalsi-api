const { mongoose } = require("mongoose");
const { ObjectId, Number, String, Date, Boolean } = mongoose.Schema.Types;

const SubscriptionPlanSchema = new mongoose.Schema({
  plan: {
    type: String,
    enum: ["gold", "platinum", "silver"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  duration: {
    type: String,
    enum: ["year", "2 years", "half year"],
    required: false,
  },
  //TODO: should add the features that the plan offer like featured for 1 month for free, number of allowed properties, allowed to use friends list blocked list,
  //! how can I make plan flexible enough till I reach the market study and decide on how subscription plans are going to work
  // I think I should use casltle library for abilities according to the subscribed plan
});

SubscriptionPlanSchema.set("toJSON", { getters: true, virtuals: false });

SubscriptionPlanSchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret._id = ret._id.toString();

    return ret;
  },
};

module.exports = {
  SubscriptionPlan:
    mongoose.models.SubscriptionPlan ||
    mongoose.model("SubscriptionPlan", SubscriptionPlanSchema),
  SubscriptionPlanSchema,
};
