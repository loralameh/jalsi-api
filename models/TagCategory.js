const { mongoose } = require("mongoose");
const { ObjectId, Number, String, Date, Boolean } = mongoose.Schema.Types;

const TagCategorySchema = new mongoose.Schema({
  category: {
    //pool-accommodation-description
    type: String,
    required: true,
  },

  count: {
    type: Number,
    required: true,
  },
});

TagCategorySchema.set("toJSON", { getters: true, virtuals: false });

TagCategorySchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret._id = ret._id.toString();

    return ret;
  },
};

module.exports = {
  TagCategory:
    mongoose.models.TagCategory ||
    mongoose.model("TagCategory", TagCategorySchema),
  TagCategorySchema,
};
