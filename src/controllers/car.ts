import CarModel from '../models/car'

export default {
  add: async (model: string, year: number) => CarModel.create({ model, year }),
  getAll: async () => CarModel.find(),
}