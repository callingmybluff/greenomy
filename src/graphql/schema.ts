import { buildSchema } from 'graphql'

/**
 * Ideally, one would not expose `_id`, but make up a new one instead. Internal DB ID are better not shared
 */
const schema = buildSchema(`
  ## root query ##
  type Query {
    signin(name: String!, password: String!): AuthData!
    car: [Car]!
    office: [Office]!
    user: User
  }
  type AuthData {
    id: ID!
    user: String!
    token: String!
  }
  type User {
    _id: ID!
    name: String!
    cars: [Car!]!
    offices: [Office!]!
  }
  type Car {
    _id: ID!
    model: String!
    year: Int!
  }
  type Office {
    _id: ID!
    title: String!
  }
  ## root mutation ##
  type Mutation {
    signup(name: String!, password: String!): AuthData!
    addCar(model: String!, year: Int): Boolean
    bookCar(carID: ID!): Boolean
    cancelCarBooking(carID: ID!): Boolean

    addOffice(title: String!): Boolean
    bookOffice(officeID: ID!): Boolean
    cancelOfficeBooking(officeID: ID!): Boolean
  }
  schema {
    query: Query
    mutation: Mutation
}`)

export default schema