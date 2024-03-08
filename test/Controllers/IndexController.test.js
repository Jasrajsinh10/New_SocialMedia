const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

// -----------------------------------------------------
// -------------------------------------------------------

// const server = 'http://localhost:1337';
// const session = require('supertest-session');
// const app = require('../../../app');
// const testSession = session(app);

chai.use(chaiHttp);


describe('GET Pages', () => {
  it('should return home page', async () => {
    chai
    .request(sails.hooks.http.app)
    .get('/')
    .end((err, res) => {
      if (err) {
        throw err;
      }
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      // console.log(res.text);
    });
  });

  it('should return signup page', async () => {
    chai
    .request(sails.hooks.http.app)
    .get('/signup')
    .end((err, res) => {
      if (err) {
        throw err;
      }
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      // console.log(res.text);
    });
  });

  it('should return login page', async () => {
    chai
    .request(sails.hooks.http.app)
    .get('/login')
    .end((err, res) => {
      if (err) {
        throw err;
      }
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      // console.log(res.text);
    });
  });

  it('should return userposts page', async () => {
    chai
    .request(sails.hooks.http.app)
    .get('/Myposts')
    .end((err, res) => {
      if (err) {
        throw err;
      }
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      // console.log(res.text);
    });
  });

  it('should return postcreate page', async () => {
    chai
    .request(sails.hooks.http.app)
    .get('/postcreation')
    .end((err, res) => {
      if (err) {
        throw err;
      }
      expect(res).to.have.status(200);
      expect(res).to.be.html;
      // console.log(res.text);
    });

    it('get homepage', async() => {
      const res = await chai
        .request(sails.hooks.http.app)
        .get("/home")
      expect(res.statusCode).to.equal(200);
      expect(res).to.be.html;
    })
  });
});