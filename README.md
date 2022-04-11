# Mock Premier league

Mock Premier is an api for  

---

## Features

- User can Sign Up.
- Admin can Sign up/login
- User can Sign in.
- Admin can create Team
- Admin can create Fixture
- Admin can delete a Team.
- Admin can delete a Fixture.
- Admin can edit a Team.
- Admin can edit a Fixture.
- Users/Admin can see Team(s).
- Users/Admin can see fixture(s).
- Users/Admin can see pending fixtures.
- Users/Admin can see completed fixtures.
- any body can search fixtures and teams

---

---

## Backend

The api is hosted on [Heroku](https://uthdev-premier.herokuapp.com/)

---

## Documentation

The api is documented with [Postman](https://documenter.getpostman.com/view/6265858/UVkjwyJB)

---

## Technologies Used

- Node.js
- Express.js
- Mongodb
- ESLint
- TypeOrm
- Heroku
- Typescript

---

## Testing Tools

- [Mocha](https://mochajs.org)
- [Chai](https://www.chaijs.com)
- [Sinon](https://sinonjs.org/)
- [NYC](https://istanbul.js.org)
- [Postman](https://www.getpostman.com)

---

## API Information

The API is hosted on [https://uthdev-premier.herokuapp.com/](https://uthdev-premier.herokuapp.com/)

METHOD |  RESOURCE   |     DESCRIPTION                | ENDPOINTS
-------|-------------|--------------------------------|-----------
GET    | ----        | Home page                      |`/`
POST   | fixture     | Create a fixture               |`/fixtures`
GET    | fixture     | Get all fixtures               |`/fixtures/`
GET    | fixture     | Get pending fixture            |`/fixtures?status=pending`
GET    | fixture     | Get completed fixture          |`/fixtures?status=completed`
PATCH  | fixture     | Update a fixture               |`/fixtures/:id`
GET    | fixture     | Get a single fixture           |`/fixtures/:id`
DELETE | fixture     | Delete a product               |`/fixtures/:id`
GET    | Team        | Get teams                      |`/teams`
GET    | Team        | Get a teams                    |`/teams/:id`
PATCH  | Team        | edit a team                    |`/teams/:id`
POST   | Team        | Create a team                  |`/teams`
DELETE | Team        | Delete a team                  |`/teams/:id`
POST   | User/Admin  | User signup                    |`/auth/signup`
POST   | User/Admin  | User signin                    |`/auth/login`
GET    | -----       | Search teams and fixtures      |`/search?q=`

---

#### Clone

- Clone this repo to your local machine using `https://github.com/uthdev/mock_premier_league`

#### Setup

- Installing the project's dependencies:

> run the command below

```shell
npm install
```

> Then create a .env file in the root directory of the project

```shell
touch .env
```

> Then copy the content of the .env-example file in the root directory into .env file and fill in th required parameters

> To start the server, run the command below

```shell
npm start
```

---

## Test

- To test the app

> run test using the command below

```shell
npm run test
```

---

## Author

Adeleke Gbolahan Uthman
