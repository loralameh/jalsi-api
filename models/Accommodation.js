import mongoose from 'mongoose'
const { ObjectId, Number, String, Date, Boolean } = mongoose.Schema.Types

const AccommodationSchema = new mongoose.Schema(
  {
    Type: {
      //could be bungalo, tree house , villa ..
      type: ObjectId,
      ref: 'Tag',
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
    area: {
      type: String,
      required: false,
    },
    bathroom: {
      type: Number,
      required: false,
    },
    beds: {
      type: Number,
      required: false,
    },
    rooms: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
)

AccommodationSchema.set('toJSON', { getters: true, virtuals: false })

AccommodationSchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret._id = ret._id.toString()

    return ret
  },
}

module.exports = {
  Accommodation:
    mongoose.models.Accommodation ||
    mongoose.model('Accommodation', AccommodationSchema),
  AccommodationSchema,
}
