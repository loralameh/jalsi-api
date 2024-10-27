import mongoose from 'mongoose'
const { String } = mongoose.Schema.Types

const ContactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
})

ContactMessageSchema.set('toJSON', { getters: true, virtuals: false })

ContactMessageSchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret._id = ret._id.toString()

    return ret
  },
}

module.exports = {
  ContactMessage:
    mongoose.models.ContactMessage ||
    mongoose.model('ContactMessage', ContactMessageSchema),
  ContactMessageSchema,
}
