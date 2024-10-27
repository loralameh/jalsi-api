import mongoose from 'mongoose'
const { ObjectId, Number, String, Date, Boolean } = mongoose.Schema.Types

const PaymentMethodSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['OMT', 'wish', 'bob'],
    required: true,
  },
  receiverPhoneNumber: {
    type: String,
    required: true,
  },
  receiverName: {
    type: String,
    required: true,
  },
})

PaymentMethodSchema.set('toJSON', { getters: true, virtuals: false })

PaymentMethodSchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret._id = ret._id.toString()

    return ret
  },
}

module.exports = {
  PaymentMethod:
    mongoose.models.PaymentMethod ||
    mongoose.model('PaymentMethod', PaymentMethodSchema),
  PaymentMethodSchema,
}
