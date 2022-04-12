import chai from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../src/index';

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

const adminUser = {
  email: "hottest94@mail.com",
  password:  "Hottest92"
};

const nonAdmin = {
  email: 'sasukeuchiha@gmail.com',
  password:'susano4sure'
};

const fixture = {
  homeTeam: '625559c9726cdc61a0aae2db',
  awayTeam: '62555f3c426e2fcf4178dde9',
  matchDate: "2022-02-20T03:08:00.489Z",
  season: "2022/2023",
}

const updateFixture = {
  homeTeam: '625559c9726cdc61a0aae2db',
  awayTeam: '62555f3c426e2fcf4178dde9',
  matchDate: "2022-03-20T03:08:54.489Z",
  status: 'completed',
  season: "2022/2023",
  homeTeamScore: 1,
  awayTeamScore: 2
}

let request: ChaiHttp.Agent;

describe('Fixtures CONTROLLERS', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(() => request.close());

  context('Create fixture', () => {
    it('should respond with a status 201 and create a new fixture', async () => {
      const admin = await request
        .post('/auth/login')
        .send(adminUser);
      const adminToken = admin.body.data.token.token;
      const res = await request
        .post('/fixtures')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(fixture);
        console.log(res.body)
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(201);
      expect(res.body).to.have.property('data');
    });
    it('should respond with a status 403 when user is not admin', async () => {
      const user = await request
        .post('/auth/login')
        .send(nonAdmin);
      const userToken = user.body.data.token.token;
      const res = await request
        .post('/fixtures')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(fixture);
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(403);
      expect(res.body).to.have.property('message');
    });
    it('should respond with a status 401 when Bearer token is not provided', async () => {
      const res = await request
        .post('/fixtures')
        .set({ Authorization: `Bearer ${''}` })
        .send(fixture);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(401);
      expect(res.body).to.have.property('message');
    });
    it('should respond with a status 401 when Bearer token is invalid', async () => {
      const res = await request
        .post('/fixtures')
        .set({ Authorization: `Bearer ${'kanldfoajfnakga'}` })
        .send(fixture);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(401);
      expect(res.body).to.have.property('message');
    });
  })

  context('Get All fixtures', () => {
    it('should respond with a status 200 and get all fixtures', async () => {
      const admin = await request
        .post('/auth/login')
        .send(adminUser);
      const adminToken = admin.body.data.token.token;
      const res = await request
        .get('/fixtures')
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
    it('should respond with a status 200 and get pending fixtures', async () => {
      const admin = await request
        .post('/auth/login')
        .send(adminUser);
      const adminToken = admin.body.data.token.token;
      const res = await request
        .get('/fixtures?status=pending')
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
    it('should respond with a status 200 and get completed fixtures', async () => {
      const admin = await request
        .post('/auth/login')
        .send(adminUser);
      const adminToken = admin.body.data.token.token;
      const res = await request
        .get('/fixtures?status=completed')
        .set({ Authorization: `Bearer ${adminToken}` });
        console.log(res.body)
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });

  context('Get Single fixture', () => {
    it('should respond with a status 200 and get a single fixture', async () => {
      const admin = await request
        .post('/auth/login')
        .send(adminUser);
      const adminToken = admin.body.data.token.token;
      const newFixture = await request
        .post('/fixtures')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(fixture);
        console.log(newFixture.body)
      const fixtureId = newFixture.body.data._id;
      const res = await request
        .get(`/fixtures/${fixtureId}`)
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
    it('should respond with a status 404 for non-existing fixture', async () => {
      const admin = await request
        .post('/auth/login')
        .send(adminUser);
      const adminToken = admin.body.data.token.token;
      const fixtureId = '621257ca0b7866495e36e0ce';
      const res = await request
        .get(`/fixtures/${fixtureId}`)
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(404);
      expect(res.body).to.have.property('message');
    });
    
  });

  context('Update fixture', () => {
    it('should respond with a status 200 and update the fixture', async () => {
      const admin = await request
        .post('/auth/login')
        .send(adminUser);
      const adminToken = admin.body.data.token.token;
      const newFixture = await request
        .post('/fixtures')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(fixture);
      const fixtureId = newFixture.body.data._id;
      console.log(fixtureId);
      const res = await request
        .patch(`/fixtures/${fixtureId}`)
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(updateFixture);
        console.log(res.body)
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
    it('should respond with a status 404 when updating a non-existing fixture', async () => {
      const admin = await request
        .post('/auth/login')
        .send(adminUser);
      const adminToken = admin.body.data.token.token;
      const fixtureId = '621257ca0b7866495e36e0ce';
      const res = await request
        .patch(`/fixtures/${fixtureId}`)
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(updateFixture);
        console.log(res.body)
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(404);
      expect(res.body).to.have.property('message');
    });
    it('should respond with a status 401 when updating a completed fixture', async () => {
      const admin = await request
        .post('/auth/login')
        .send(adminUser);
      const adminToken = admin.body.data.token.token;
      const newFixture = await request
        .post('/fixtures')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(fixture);
      const fixtureId = newFixture.body.data._id;
      console.log(fixtureId);
      await request
        .patch(`/fixtures/${fixtureId}`)
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(updateFixture);
      const res = await request
      .patch(`/fixtures/${fixtureId}`)
      .set({ Authorization: `Bearer ${adminToken}` })
      .send(updateFixture);
        console.log(res.body)
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(403);
      expect(res.body).to.have.property('message');
    });
  });

  context('Delete fixture', () => {
    it('should respond with a status 200 and delete the fixture', async () => {
      const admin = await request
        .post('/auth/login')
        .send(adminUser);
      const adminToken = admin.body.data.token.token;
      const newFixture = await request
        .post('/fixtures')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(fixture);
      const fixtureId = newFixture.body.data._id;
      const res = await request
        .delete(`/fixtures/${fixtureId}`)
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('message');
    });
    it('should respond with a status 404 for non-existing fixture', async () => {
      const admin = await request
        .post('/auth/login')
        .send(adminUser);
      const adminToken = admin.body.data.token.token;
      const fixtureId = '621257ca0b7866495e36e0ce'
      const res = await request
        .delete(`/fixtures/${fixtureId}`)
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(404);
      expect(res.body).to.have.property('message');
    });
  });
});