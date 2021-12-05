import Express from 'express'

const router = Express.Router()

router.get('/cars', (_, res) => res.render('list',
  {
    title: 'Cars',
    id: 'cars',
    query: 'query { cars {_id model year} }',
  }
))
router.get('/offices', (_, res) => res.render('list',
  {
    title: 'Offices',
    id: 'offices',
    query: 'query { offices {_id title} }',
  }
))
router.get('/my-bookings', (_, res) => res.render('list',
  {
    title: 'My Bookings',
    id: 'myBookings',
    qeury: '',
  }
))

export default router