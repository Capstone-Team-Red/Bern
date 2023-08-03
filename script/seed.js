const router = require('express').Router();
const db = require('../server/db/db')
const Users = require('../server/db/models/Users');
const Listings = require('../server/db/models/Listings');
const OrderListings = require('../server/db/models/OrderListings');
const Orders = require('../server/db/models/Orders');
const Renter = require('../server/db/models/Renter');
module.exports = router;

async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    Users.create({
      username: 'cody',
      password: '123',
      email: 'cody@example.com',
      role: 'User',
      firstname: 'Cody',
      lastname: 'Zucker',
      zipcode: '10001'
    }),
    Users.create({
      username: 'murphy',
      password: '123',
      email: 'murphy@example.com',
      role: 'User',
      firstname: 'Murphy',
      lastname: 'Love',
      zipcode: '20001'
    }),    
    Users.create({
      username: 'john',
      password: '123',
      email: 'john@example.com',
      role: 'User',
      firstname: 'John',
      lastname: 'Doe',
      zipcode: '30301'
    }),    
    Users.create({
      username: 'jane',
      password: '123',
      email: 'jane@example.com',
      role: 'User',
      firstname: 'Jane',
      lastname: 'Smith',
      zipcode: '40003'
    }),    
    Users.create({
      username: 'kevin',
      password: '123',
      email: 'kevin@example.com',
      role: 'User',
      firstname: 'Kevin',
      lastname: 'Kutcher',
      zipcode: '50005'
    }),
  ]);

  // Creating Renters
  const renters = await Promise.all([
    Renter.create({
      username: 'zach',
      password: '123',
      role: 'Renter',
      email: 'zach@constructionkings.com',
      firstname: 'Zach',
      lastname: 'Warner',
      zipcode: '10001'
    }),
    Renter.create({
      username: 'helen',
      password: '123',
      role: 'Renter',
      email: 'helen@dc.com',
      firstname: 'Helen',
      lastname: 'Shell',
      zipcode: '20001'
    }),
    Renter.create({
      username: 'ryo',
      password: '123',
      role: 'Renter',
      email: 'ryo@crunchyroll.com',
      firstname: 'Ryo',
      lastname: 'Kazaki',
      zipcode: '30301'
    }),
    Renter.create({
      username: 'paige',
      password: '123',
      role: 'Renter',
      email: 'paige@clothing.com',
      firstname: 'Paige',
      lastname: 'Hester',
      zipcode: '40003'
    }),
    Renter.create({
      username: 'beth',
      password: '123',
      role: 'Renter',
      email: 'beth@shoretravel.com',
      firstname: 'Beth',
      lastname: 'Shore',
      zipcode: '50005'
    }),
  ]);

  // Creating Listings
  const listings = await Promise.all([
    Listings.create({
      name: 'Boxing in NY',
      classtype: 'Boxing',
      address: '123 Main Street',
      city: 'New York City',
      state: 'NY',
      zipcode: '10001',
      date: '2023-08-31',
      time: '10:00 AM',
      price: 25,
      stock: 10,
    }),
    Listings.create({
      name: 'Yoga in Washington',
      classtype: 'Yoga',
      address: '132 Main Street',
      city: 'Washington',
      state: 'DC',
      zipcode: '20001',
      date: '2023-09-02',
      time: '11:00 AM',
      price: 10,
      stock: 5,
    }),
    Listings.create({
      name: 'Open gym in Atlanta',
      classtype: 'Open Gym',
      address: '456 Maple Avenue',
      city: 'Atlanta',
      state: 'GA',
      zipcode: '30301',
      date: '2023-10-01',
      time: '3:00 PM',
      price: 15,
      stock: 7,
    }),
    Listings.create({
      name: 'Yoga in Louisville',
      classtype: 'Yoga',
      address: '789 Oak Street',
      city: 'Louisville',
      state: 'KY',
      zipcode: '40003',
      date: '2023-12-01',
      time: '2:30 PM',
      price: 30,
      stock: 8,
    }),
    Listings.create({
      name: 'Boxing in Indiana',
      classtype: 'Boxing',
      address: '101 Elm Avenue',
      city: 'Des Moines',
      state: 'IA',
      zipcode: '50005',
      date: '2023-08-25',
      time: '8:00 AM',
      price: 50,
      stock: 5,
    }),
  ]);

  // Creating OrderListings
  const orderListings = await Promise.all([
    OrderListings.create({
      orderId: 2,
      listingId:3,
      quantity: 1
    }),
    OrderListings.create({
      orderId: 4,
      listingId: 4,
      quantity: 1
    }),
    OrderListings.create({
      orderId: 1,
      listingId: 2,
      quantity: 1
    }),
  ]);

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${renters.length} employers`)
  console.log(`seeded ${listings.length} listings`)
  console.log(`seeded ${orderListings.length} orderListings`)
  console.log(`seeded successfully`)

  return {
    users: {
      cody: users[0],
      murphy: users[1],
      john: users[2],
      jane: users[3],
      kevin: users[4]
    },
    renters: {
      zach: renters[0],
      helen: renters[1],
      ryo: renters[2],
      paige: renters[3],
      beth: renters[4]
    },
    listings: {
      listing1: listings[0],
      listing2: listings[1],
      listing3: listings[2],
      listing4: listings[3],
      listing5: listings[4]
    },
    orderListings: {
      orderListings1: orderListings[0],
      orderListings2: orderListings[1],
      orderListings3: orderListings[2],
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
