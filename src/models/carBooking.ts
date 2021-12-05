import Mongoose from 'mongoose'

const bookingSchema = new Mongoose.Schema(
  {
    car: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Car',
    },
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  {
    timestamps: true,
  },
)

export default Mongoose.model('CarBooking', bookingSchema)