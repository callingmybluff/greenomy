import CarModel from '../models/car'

const get = async (carID: string) => CarModel.findById(carID)

export default {
  add: async (model: string, year: number) => CarModel.create({ model, year }),
  getAll: async () => CarModel.find(),
  get: get,
  getSome: async (CarsID: string[]) => Promise.all(CarsID.map(id => get(id)))
}