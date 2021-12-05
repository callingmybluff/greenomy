import Mongoose from 'mongoose'


const bookingSchema = new Mongoose.Schema(
  {
    office: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Office'
    },
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  {
    timestamps: true,
  },
)

export default Mongoose.model('OfficeBooking', bookingSchema)