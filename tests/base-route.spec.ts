import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);

const { expect } = chai;

describe('GENERAL TEST', () => {
  it('should respond with a status code 200 if user visit the root of the app', async () => {
    const res = await chai.request(app)
      .get('/');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message');
  });
});
