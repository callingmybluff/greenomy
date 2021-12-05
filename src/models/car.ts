import Mongoose from 'mongoose'

const carSchema = new Mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: false,
    },
  },
)

export default Mongoose.model('Car', carSchema)