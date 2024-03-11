const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const bcrypt = require('bcrypt');
chai.use(chaiHttp);
describe('userController test', () => {
  describe('user signup => POST /postsignup', () => {
    // this is signup post test case
    it('should create a new user and redirect to /login', async () => {
      const newUser = {
        username: 'TestUser',
        email: 'test@example.com',
        password: 'testpassword'
      };
      const res = await chai
                .request(sails.hooks.http.app)
                .post('/postsignup')
                .send(newUser)
      expect(res.statusCode).to.equal(200);
      expect(res).to.be.html;
    });
    it('should redirect to signup again if user already exists', async () => {
      const newUser = {
        username: 'TestUser',
        email: 'test@example.com',
        password: 'testpassword'
      };
      const res = await chai
                  .request(sails.hooks.http.app)
                  .post('/postsignup')
                  .send(newUser)
      expect(res.statusCode).to.equal(200); // user already exist
    });
  });
  describe('Use login page testing', () => {
    //this is login page post test case
    it('should check user details and redirect to login page if details are incorect', async () => {
      const user = {
        username: 'TestUser',
        password: 'testpassword'
      };
      const res = await chai
        .request(sails.hooks.http.app)
        .post("/postlogin")
        .send(user)
      expect(res.statusCode).to.equal(200);
      expect(res).to.be.html;
      // expect(res.body.token).to.have.property(String);
    })
  });

  after((done) => {
    User.destroy({
      name: ['TestUser'],
    }).exec(done);
  });




});

