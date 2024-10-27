import mongoose from 'mongoose'
import { TagCategory } from '@/models/TagCategory'
const { ObjectId, Number, String, Date, Boolean } = mongoose.Schema.Types

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  Category: {
    type: ObjectId,
    ref: 'TagCategory',
    required: true,
  },

  code: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
})

TagSchema.set('toJSON', { getters: true, virtuals: false })

TagSchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret._id = ret._id.toString()

    return ret
  },
}

module.exports = {
  Tag: mongoose.models.Tag || mongoose.model('Tag', TagSchema),
  TagSchema,
}
