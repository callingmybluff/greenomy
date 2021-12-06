import UserController from '../../controllers/user'
import CarBookingController from '../../controllers/carBooking'
import CarController from '../../controllers/car'
import OfficeBookingController from '../../controllers/officeBooking'
import OfficeController from '../../controllers/office'

export default {
  user: async (_: any, context: any) => {
    if (!context.isAuthorized)
      throw Error('Unauthorized')
    return Promise.all([
      UserController.get(context.userID),
      CarBookingController.get(context.userID),
      OfficeBookingController.get(context.userID),
    ]).then(res => Promise.all([
      res[0],
      CarController.getSome(res[1].map(carB => carB.car)),
      OfficeController.getSome(res[2].map(officeB => officeB.office)),
    ])).then(res => {
      return {
        name: res[0]?.name,
        cars: res[1],
        offices: res[2],
      }
    })
  }
}