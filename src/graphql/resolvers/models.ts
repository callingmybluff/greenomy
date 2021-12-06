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
interface ICar {
  model: string
  year: number
}
interface IOffice {
  title: string
}
interface IBookOrder {
  id: string
}
interface ICarBooking {
  bookingID: string
}
interface IOfficeBooking extends ICarBooking { }

export default {
  signup: async ({ name, password }: IAuth) => {
    const user = await AuthController.signup(name, password)
    return {
      user: user.user,
      token: user.token,
    }
  },

  car: (_: any, context: any) => {
    if (!context.isAuthorized)
      throw Error('Unauthorized')
    return CarController.getAll()
  },
  addCar: async ({ model, year }: ICar, context: any) => {
    if (!context.isAuthorized)
      throw Error('Unauthorized')
    return CarController.add(model, year).then(() => true).catch(() => false)
  },
  bookCar: async ({ id }: IBookOrder, context: any) => {
    if (!context.isAuthorized)
      throw Error('Unauthorized')
    return CarBookingController.create(id, context.userID)
  },
  cancelCarBooking: async ({ bookingID }: ICarBooking, context: any) => CarBookingController.delete(bookingID),

  office: (_: any, context: any) => {
    if (!context.isAuthorized)
      throw Error('Unauthorized')
    return OfficeController.getAll()
  },
  addOffice: async ({ title }: IOffice, context: any) => {
    if (!context.isAuthorized)
      throw Error('Unauthorized')
    return OfficeController.add(title).then(() => true).catch(() => false)
  },
  bookOffice: async ({ id }: IBookOrder, context: any) => {
    if (!context.isAuthorized)
      throw Error('Unauthorized')
    return OfficeBookingController.create(id, context.userID)
  },
  cancelOfficeBooking: async ({ bookingID }: IOfficeBooking, context: any) => {
    if (!context.isAuthorized)
      throw Error('Unauthorized')
    return OfficeBookingController.delete(bookingID)
  },
}