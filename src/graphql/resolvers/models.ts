import AuthController from '../../controllers/auth'
import CarController from '../../controllers/car'
import OfficeController from '../../controllers/office'
import CarBookingController from '../../controllers/carBooking'
import OfficeBookingController from '../../controllers/officeBooking'

// Should be central and reusable
interface IAuth {
  name: string
  password: string
}

export default {
  signup: async ({ name, password }: IAuth) => {
    const user = await AuthController.signup(name, password)
    return {
      user: user.user,
      token: user.token,
    }
  },

  cars: CarController.getAll,
  addCar: async (model: string, year: number) => CarController.add(model, year).then(() => true).catch(() => false),
  bookCar: async (carID: string) => CarBookingController.create(carID, '123'),
  cancelCarBooking: async (bookingID: string) => CarBookingController.delete(bookingID),

  offices: OfficeController.getAll,
  addOffice: async (title: string) => OfficeController.add(title).then(() => true).catch(() => false),
  bookOffice: async (officeID: string) => OfficeBookingController.create(officeID, '123'),
  cancelOfficeBooking: async (bookingID: string) => OfficeBookingController.delete(bookingID),
}