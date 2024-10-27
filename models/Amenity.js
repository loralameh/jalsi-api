const { mongoose } = require("mongoose");
const { ObjectId, Number, String, Date, Boolean } = mongoose.Schema.Types;

const AmenitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

AmenitySchema.set("toJSON", { getters: true, virtuals: false });

AmenitySchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret._id = ret._id.toString();

    return ret;
  },
};

module.exports = {
  Amenity: mongoose.models.Amenity || mongoose.model("Amenity", AmenitySchema),
  AmenitySchema,
};
