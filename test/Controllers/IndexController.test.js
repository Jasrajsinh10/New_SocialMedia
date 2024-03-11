const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;



chai.use(chaiHttp);


describe('GET Pages', () => {
  // Home page
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
  // signup page
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
  // LOGIN PAGE
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
  // USERPOST PAGE
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
  //  POST CREATE PAGE
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
    //  HOME PAGE THROUGH DIFFERENT ROUTE
    it('get homepage', async() => {
      const res = await chai
        .request(sails.hooks.http.app)
        .get("/home")
      expect(res.statusCode).to.equal(200);
      expect(res).to.be.html;
    })
    // POST EDITING PAGE
    it('get editpost page', async() => {
      const res = await chai
        .request(sails.hooks.http.app)
        .get("/edit/")
      expect(res.statusCode).to.equal(200);
      expect(res).to.be.html;
    })
  });
});