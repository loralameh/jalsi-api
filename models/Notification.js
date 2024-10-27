import mongoose from 'mongoose'
import { User } from 'src/models/User'
import { PropertyOwner } from 'src/models/PropertyOwner'

const { ObjectId, Number, String, Date, Boolean } = mongoose.Schema.Types

const NotificationSchema = new mongoose.Schema(
  {
    to: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    from: {
      type: ObjectId,
      ref: 'PropertyOwner',
      required: true,
    },
    severity: {
      type: String,
      enum: ['urgent', 'normal', 'info'],
      required: false,
    },
    severity: {
      type: String,
      enum: ['delivered', 'sent', 'read'],
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)

NotificationSchema.set('toJSON', { getters: true, virtuals: false })

NotificationSchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret._id = ret._id.toString()

    return ret
  },
}

module.exports = {
  Notification:
    mongoose.models.Notification ||
    mongoose.model('Notification', NotificationSchema),
  NotificationSchema,
}
