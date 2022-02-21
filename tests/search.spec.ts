import chai from 'chai';
import chaiHttp from 'chai-http';
// import { faker } from '@faker-js/faker'
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../src/index';

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

// const team = {
//   teamName: 'Arsenal',
// }

// const updateTeam = {
//   teamName: 'Aston Villa'
// }

let request: ChaiHttp.Agent;

describe('Search CONTROLLERS', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(() => request.close());

  context('Search', () => {
    it('should respond with a status 200 and get all teams', async () => {
      const res = await request
        .get('/search?q=man');
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });
});