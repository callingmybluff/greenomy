import Mongoose from 'mongoose'

const officeSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
)

export default Mongoose.model('Office', officeSchema)