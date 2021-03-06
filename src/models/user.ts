import Mongoose from 'mongoose'
import BCrypt from 'bcrypt'

// TS interface for the return value
interface IUser {
  name: string;
  password: string;
}
interface UserModel extends Mongoose.Model<IUser> {
  signin(name: string, password: string): any;
}

const schema = new Mongoose.Schema<IUser, UserModel>({
  // Ideally, we would have public ID that does not match DB's `_id`. for simplicity, `_id` is returned
  name: {
    type: String,
    required: [true, 'Please enter a name'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [3, 'A minimum of 3 characters is required'],
  },
});

schema.pre('save', async function (next) {
  this.password = await BCrypt.hash(this.password, await BCrypt.genSalt())
  next()
})

schema.statics.signin = async function (name, password) {
  const user = await this.findOne({ name })
  if (user) {
    const isValidPassword = await BCrypt.compare(password, user.password)
    if (isValidPassword) return user
    throw Error('incorrect password')
  }
  throw Error('incorrect name')
}

export default Mongoose.model<IUser, UserModel>('user', schema)
export {
  UserModel,
  IUser,
}