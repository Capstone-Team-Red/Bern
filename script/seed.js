const router = require('express').Router();
const db = require('../server/db/db')
const Users = require('../server/db/models/Users');
const Listings = require('../server/db/models/Listings');
const OrderListings = require('../server/db/models/OrderListings');
const Orders = require('../server/db/models/Orders');
const Renter = require('../server/db/models/Renter');
const Reviews = require('../server/db/models/Reviews');
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
      name: 'Private Home Boxing Class',
      classtype: 'Boxing',
      image: "/images/homeboxinggym.jpg",
      address: '100 5th Ave',
      city: 'New York',
      state: 'NY',
      zipcode: '10011',
      date: '2023-08-31',
      time: '10:00 AM',
      price: 25,
      stock: 5,
      lat: 40.7367,
      lng: -73.9899,
    }),
    Listings.create({
      name: 'Large Backyard Yoga',
      classtype: 'Yoga',
      image: "/images/largebackyardyoga.jpg",
      address: '4592 Ohio Drive SW',
      city: 'Washington',
      state: 'DC',
      zipcode: '20551',
      date: '2023-09-02',
      time: '11:00 AM',
      price: 10,
      stock: 20,
      lat: 38.876281,
      lng: -77.02803,
    }),
    Listings.create({
      name: 'Open Gym in Garage',
      classtype: 'Open Gym',
      image: "/images/garagegym.jpg",
      address: '101 Decatur Street SE',
      city: 'Atlanta',
      state: 'GA',
      zipcode: '30303',
      date: '2023-10-01',
      time: '3:00 PM',
      price: 15,
      stock: 7,
      lat: 33.752770,
      lng: -84.386570,
    }),
    Listings.create({
      name: 'Yoga in my Backyard',
      classtype: 'Yoga',
      image: "/images/backyardyoga.jpg",
      address: '3865 Whittier Blvd',
      city: 'Los Angeles',
      state: 'CA',
      zipcode: '90023',
      date: '2023-12-01',
      time: '2:30 PM',
      price: 30,
      stock: 8,
      lat: 34.023640,
      lng: -118.190002,
    }),
    Listings.create({
      name: 'Garage Boxing',
      classtype: 'Boxing',
      image: "/images/homeboxing.jpg",
      address: '721 South Michigan Ave',
      city: 'Chicago',
      state: 'IL',
      zipcode: '60605',
      date: '2023-08-25',
      time: '8:00 AM',
      price: 50,
      stock: 5,
      lat: 41.872532,
      lng: -87.624779,
    }),
  ]);

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${renters.length} employers`)
  console.log(`seeded ${listings.length} listings`)
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
