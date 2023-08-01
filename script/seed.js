"use strict";

const {
  db,
  Users,
  Listings,
  Orders,
  OrderListings,
} = require("../server/db");
const { faker } = require("@faker-js/faker");

async function seed() {
  try {
    //reset tables and creates the tables from scratch when seeding
    await db.sync({ force: true });
    console.log("db synced!");

    // Declare a variable and set it equal to an array.
    let users = [];

    // This for loop decides how many datapoints you will create.
    // If you want to change the amount, just change the number in the for loop!
    for (let i = 0; i < 100; i++) {
      // The keys in this user object are set equal to the fake information

      let newUser = {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        address:
          faker.location.streetAddress() +
          ", " +
          faker.location.city() +
          ", " +
          faker.location.state({ abbreviated: true }) +
          " " +
          faker.location.zipCode("#####"),
        phone: faker.phone.number("+1 ###-###-####"),
        password: "hi",
      };
      console.log(
        `Username|Password for user ${i + 1} is:`,
        newUser.username,
        `|`,
        newUser.password
      );

      // For each fake user you create, you're going to push them into the user array you declare above
      users.push(newUser);
    }

    // For each user in the array, you are going to create a new user instance in the database
    await Promise.all(users.map((user) => Users.create(user)));

    // Declare a variable and set it equal to an array.
    let listings = [];
    // let prices = [] // Array to store the randomly generated prices

    // This for loop decides how many datapoints you will create.
    // If you want to change the amount, just change the number in the for loop!
    for (let i = 0; i < 50; i++) {
      // The keys in this user object are set equal to the fake information

      let newListings = {
        name: faker.commerce.productName(),
        image: faker.image.urlLoremFlickr({ category: "business" }),
        description: faker.commerce.productAdjective(),
        category: faker.commerce.product(),
        price: faker.commerce.price({ min: 1, max: 200 }),
        stock: faker.number.int({ min: 10, max: 50 }),
      };

      // For each fake user you create, you're going to push them into the user array you declare above
      listings.push(newListings);
    }

    // For each user in the array, you are going to create a new user instance in the database
    await Promise.all(listings.map((listing) => Listings.create(listing)));

    // Declare a variable and set it equal to an array
    // The keys in this user object are set equal to the fake information

    const allListings = await Listings.findAll();

    for (const listing of allListings) {
      const orderListingData = {
        orderId: faker.number.int({ min: 1, max: 20 }),
        listingId: faker.number.int({ min: 1, max: 20 }),
        quantity: faker.number.int({ min: 1, max: 5 }),
      };

      await OrderListings.create(orderListingData);
    }
  } catch (err) {
    console.log(err);
  }

  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
