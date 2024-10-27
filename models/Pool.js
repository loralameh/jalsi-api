import mongoose from 'mongoose'
import { Tag } from '@/models/Tag'
const { ObjectId, Number, String, Date, Boolean } = mongoose.Schema.Types

const PoolSchema = new mongoose.Schema(
  {
    Type: {
      type: ObjectId,
      ref: 'Tag',
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
    length: {
      type: Number,
      required: false,
    },
    width: {
      type: Number,
      required: false,
    },
    depth: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
)

PoolSchema.set('toJSON', { getters: true, virtuals: false })

PoolSchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret._id = ret._id.toString()

    return ret
  },
}

module.exports = {
  Pool: mongoose.models.Pool || mongoose.model('Pool', PoolSchema),
  PoolSchema,
}
