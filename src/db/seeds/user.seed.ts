import { Connection, createConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { UserEntity } from '../entity/User';
import dotenv from 'dotenv';

dotenv.config()


const users = [
  {
    firstName: 'Naruto',
    lastName: 'Uzumaki',
    isAdmin: true,
    email: 'naruto7@hokage.ninja',
    password: bcrypt.hashSync(<string>process.env.ADMIN_PASSWORD, 10)
  },
  {
    firstName: 'Sasuke',
    lastName: 'Uchiha',
    email: 'sasukeuchiha@gmail.com',
    password: bcrypt.hashSync('susano4sure', 10),
    isAdmin: false,
  },
  {
    firstName: faker.name.findName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync(faker.internet.password(), 10),
  }
]

createConnection().then(async (connection: Connection) => {
  // adminUser.password = await bcrypt.hash(adminUser.password, bcrypt.genSaltSync(10));
  const userRepository = connection.getMongoRepository(UserEntity);
  for(let i = 0; i < users.length; i++) {
    await userRepository.save(users[i]);
  }
  console.log('users seeded');
  process.exit();
})


// (() => {
//   for (let i = 0; i < 50; i++) {
//     const user = {
//       firstName: faker.name.firstName(), 
//       lastName: faker.name.lastName(),
//       isAdmin: false,
//       email: faker.internet.email(),
//       password: faker.internet.password(),
//     }
//     userSeed.push(user);
//   }
// })()
