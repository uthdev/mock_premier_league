/* eslint-disable @typescript-eslint/no-empty-function */
import { Request, Response, NextFunction } from 'express';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { faker } from '@faker-js/faker'
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../src/index';
// import models from '../../models';
import { AuthController } from '../src/controllers';
import RequestWithUser from 'interfaces/requestWithUser.interface';
// import { Agent } from 'http';

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

interface RequestWithBody {
  body: Record<string, unknown>;
}

interface StubResponse {
  status: () => void;
  json: () => void;

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
    // const req: RequestWithBody  = {
    //   body: {
    //     email: 'fakemail@mail.com',
    //   }
    // };
  
    // const res = {
    //   status: () => {},
    //   json: () => {},
    // };

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
    // it('fake conflict error and return a status 409', async () => {
    //   const  = {
    //     firstName: faker.name.firstName(),
    //     lastName: faker.name.lastName(),
    //     password: faker.internet.password(),
    //   };
    //   const res = await request
    //     .post('/auth/signup')
    //     .send(badRequest);
    //   expect(res).to.have.status(400);
    //   expect(res.body).to.have.property('status');
    //   expect(res.body.status).to.equal(400);
    //   expect(res.body).to.have.property('message');
    // });
    // it('fake conflict error and return a status 409', async () => {
    //   const user = {
    //     id: 'ksd095',
    //     email: 'fakemail@mail.com',
    //     password: '9ijk3632',
    //     createdAt: '2010/10/10'
    //   };
    //   sinon.stub(res, 'status').returnsThis();
    //   sinon.stub(models.Users, 'findOne').returns(user);

    //   await AuthController.signUp(req, res);
    //   expect(res.status).to.have.been.calledWith(409);
    // });
    // it('fakes server error when creating account', async () => {
    //   sinon.stub(res, 'status').returnsThis();
    //   sinon.stub(models.Users, 'findOne').throws();

    //   await AuthController.registration(req: Request, res: Response, next);
    //   expect(res.status).to.have.been.calledWith(500);
    // });
  });
})