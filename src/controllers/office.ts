import OfficeModel from '../models/office'

const get = async (officeID: string) => OfficeModel.findById(officeID)

export default {
  add: async (title: string) => OfficeModel.create({ title }),
  getAll: async () => OfficeModel.find(),
  get: get,
  // Or re use the above
  getSome: async (officesID: string[]) => Promise.all(officesID.map(id => get(id)))
}