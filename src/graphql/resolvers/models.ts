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
interface ICarBookOrder {
  carID: string
}
interface IOfficeBookOrder {
  officeID: string
}
interface ICarBooking {
  carID: string
}
interface IOfficeBooking {
  officeID: string
}

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
  bookCar: async ({ carID }: ICarBookOrder, context: any) => {
    if (!context.isAuthorized)
      throw Error('Unauthorized')
    return CarBookingController.create(carID, context.userID)
  },
  cancelCarBooking: async ({ carID }: ICarBooking, context: any) => {
    if (!context.isAuthorized)
      throw Error('Unauthorized')
    return CarBookingController.delete(carID).then(res => res.deletedCount > 0)
  },

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
  bookOffice: async ({ officeID }: IOfficeBookOrder, context: any) => {
    if (!context.isAuthorized)
      throw Error('Unauthorized')
    return OfficeBookingController.create(officeID, context.userID)
  },
  cancelOfficeBooking: async ({ officeID }: IOfficeBooking, context: any) => {
    if (!context.isAuthorized)
      throw Error('Unauthorized')
    return OfficeBookingController.delete(officeID).then(res => res.deletedCount > 0)
  },
}