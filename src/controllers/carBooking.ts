import CarBookingModel from '../models/carBooking'

export default {
  create: async (carID: string, userID: string) => CarBookingModel.create({ car: carID, user: userID }),
  delete: async (bookingID: string) => CarBookingModel.deleteOne({ car: bookingID }),
  get: async (userID: string) => CarBookingModel.find({ user: userID }),
}