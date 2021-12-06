import OfficeBookingModel from '../models/officeBooking'

export default {
  create: async (officeID: string, userID: string) => OfficeBookingModel.create({ office: officeID, user: userID }),
  delete: async (bookingID: string) => OfficeBookingModel.deleteOne({ office: bookingID }),
}