import OfficeModel from '../models/office'

export default {
  add: async (title: string) => OfficeModel.create({ title }),
  getAll: async () => OfficeModel.find(),
}