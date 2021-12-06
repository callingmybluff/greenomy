import Express from 'express'

const router = Express.Router()

router.get('/cars', (_, res) => res.render('list',
  {
    title: 'Cars',
    id: 'car',
    query: 'query { car {_id model year} }',
  }
))
router.get('/offices', (_, res) => res.render('list',
  {
    title: 'Offices',
    id: 'office',
    query: 'query { office {_id title} }',
  }
))
router.get('/my-bookings', (_, res) => res.render('list',
  {
    title: 'My Bookings',
    id: 'user',
    query: 'query { user { cars {model, year, _id} offices {title, _id} } }',
  }
))

export default router