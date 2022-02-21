import chai from 'chai';
import chaiHttp from 'chai-http';
import { faker } from '@faker-js/faker'
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../src/index';


const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

const seededUser = {
  email: 'sasukeuchiha@gmail.com',
  password: 'susano4sure'
}

const dummyUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

let request: ChaiHttp.Agent;

describe('AUTH CONTROLLERS', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(() => request.close());

  context('User Signup', () => {
    it('should respond with a status 201 and create a new account', async () => {
      const res = await request
        .post('/auth/signup')
        .send(dummyUser);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(201);
      expect(res.body).to.have.property('data');
    });
    it('should respond with a status 400 and fail validation', async () => {
      const badRequest = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: faker.internet.password(),
      };
      const res = await request
        .post('/auth/signup')
        .send(badRequest);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('message');
    });
  });

  context('User Signin', () => {
    it('should respond with a status 200 and login user', async () => {
      const res = await request
        .post('/auth/login')
        .send(seededUser);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
    it('should respond with a status 400 and fail validation', async () => {
      const badRequest = {
        password: faker.internet.password(),
      };
      const res = await request
        .post('/auth/login')
        .send(badRequest);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(400);
      expect(res.body).to.have.property('message');
    });
    it('should respond with a status 401 when password does not match', async () => {
      const wrongPassword = {
        email: 'sasukeuchiha@gmail.com',
        password: faker.internet.password(),
      };
      const res = await request
        .post('/auth/login')
        .send(wrongPassword);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(401);
      expect(res.body).to.have.property('message');
    });
  });
})