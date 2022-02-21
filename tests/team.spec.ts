import chai from 'chai';
import chaiHttp from 'chai-http';
// import { faker } from '@faker-js/faker'
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

const team = {
  teamName: 'Arsenal',
}

const updateTeam = {
  teamName: 'Aston Villa'
}

let request: ChaiHttp.Agent;

describe('TEAM CONTROLLERS', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(() => request.close());

  context('Create Team', () => {
    it('should respond with a status 201 and create a new team', async () => {
      const admin = await request
        .post('/auth/login')
        .send(adminUser);
      const adminToken = admin.body.data.token.token;
      const res = await request
        .post('/teams')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(team);
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
        .post('/teams')
        .set({ Authorization: `Bearer ${userToken}` })
        .send(team);
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(403);
      expect(res.body).to.have.property('message');
    });
    it('should respond with a status 401 when Bearer token is not provided', async () => {
      const res = await request
        .post('/teams')
        .set({ Authorization: `Bearer ${''}` })
        .send(team);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(401);
      expect(res.body).to.have.property('message');
    });
    it('should respond with a status 401 when Bearer token is invalid', async () => {
      const res = await request
        .post('/teams')
        .set({ Authorization: `Bearer ${'kanldfoajfnakga'}` })
        .send(team);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(401);
      expect(res.body).to.have.property('message');
    });
  })

  context('Get All teams', () => {
    it('should respond with a status 200 and get all teams', async () => {
      const admin = await request
        .post('/auth/login')
        .send(adminUser);
      const adminToken = admin.body.data.token.token;
      const res = await request
        .get('/teams')
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
  });

  context('Get Single team', () => {
    it('should respond with a status 200 and get a single team', async () => {
      const admin = await request
        .post('/auth/login')
        .send(adminUser);
      const adminToken = admin.body.data.token.token;
      const newTeam = await request
        .post('/teams')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(team);
      const teamId = newTeam.body.data._id;
      const res = await request
        .get(`/teams/${teamId}`)
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
    it('should respond with a status 200 for non-existing team', async () => {
      const admin = await request
        .post('/auth/login')
        .send(adminUser);
      const adminToken = admin.body.data.token.token;
      const teamId = '621257ca0b7866495e36e0ce';
      const res = await request
        .get(`/teams/${teamId}`)
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(404);
      expect(res.body).to.have.property('message');
    });
  });

  context('Update Team', () => {
    it('should respond with a status 200 and update the team', async () => {
      const admin = await request
        .post('/auth/login')
        .send(adminUser);
      const adminToken = admin.body.data.token.token;
      const newTeam = await request
        .post('/teams')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(team);
      const teamId = newTeam.body.data._id;
      const res = await request
        .patch(`/teams/${teamId}`)
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(updateTeam);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
    it('should respond with a status 404 for non-existing team', async () => {
      const admin = await request
        .post('/auth/login')
        .send(adminUser);
      const adminToken = admin.body.data.token.token;
      const teamId = '621257ca0b7866495e36e0ce';
      const res = await request
        .patch(`/teams/${teamId}`)
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(updateTeam);
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(404);
      expect(res.body).to.have.property('message');
    });
  });

  context('Delete Team', () => {
    it('should respond with a status 200 and delete the team', async () => {
      const admin = await request
        .post('/auth/login')
        .send(adminUser);
      const adminToken = admin.body.data.token.token;
      const newTeam = await request
        .post('/teams')
        .set({ Authorization: `Bearer ${adminToken}` })
        .send(team);
      const teamId = newTeam.body.data._id;
      const res = await request
        .delete(`/teams/${teamId}`)
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(200);
      expect(res.body).to.have.property('data');
    });
    it('should respond with a status 200 for non-existing team', async () => {
      const admin = await request
        .post('/auth/login')
        .send(adminUser);
      const adminToken = admin.body.data.token.token;
      const teamId = '621257ca0b7866495e36e0ce';
      const res = await request
        .delete(`/teams/${teamId}`)
        .set({ Authorization: `Bearer ${adminToken}` });
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('status');
      expect(res.body.status).to.equal(404);
      expect(res.body).to.have.property('message');
    });
  });
});