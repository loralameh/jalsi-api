// models/Account.js

import mongoose from 'mongoose'

const { ObjectId, Number, String, Date, Boolean } = mongoose.Schema.Types

const AccountSchema = new mongoose.Schema(
  {
    provider: { type: String, required: true },
    type: { type: String, required: true },
    providerAccountId: { type: String, required: true },
    userId: { type: ObjectId, required: true },
  },
  {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
)

AccountSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Ensure virtual fields are serialised.
AccountSchema.set('toJSON', {
  virtuals: true,
})
AccountSchema.options.toJSON = {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret._id = ret._id.toString()

    return ret
  },
}
module.exports = {
  Account: mongoose.models.Account || mongoose.model('Account', AccountSchema),
  AccountSchema,
}
