const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const bcrypt = require('bcrypt');
chai.use(chaiHttp);
describe('PostController test', () => {
  describe('Post create', () => {
    // this is signup post test case
    it('should create a new post and redirect to /home', async () => {
      
      const userid = '65ee9175aee2cb6e20d292f7';
      const username = "TestUser";
      const content = 'sdjfhskjfhskdjf';
      const res = await chai
                .request(sails.hooks.http.app)
                .post('/userpostcreate')
                .send({ userid, username,content })
                .set('bypass-policies-for-testing', 'true');
      expect(res.statusCode).to.equal(200);
      expect(res).to.be.html;
    });
  });
  
   describe('Post editing', () => {
    // this is post editing
    it('should edit a post and redirect to /home', async () => {
      const content = 'lets it';
      const res = await chai
                .request(sails.hooks.http.app)
                .post('/edit/65eed4a8b95386a526bbd2c3')
                .send({ content })
                .set('bypass-policies-for-testing', 'true');
      expect(res.statusCode).to.equal(200);
      expect(res).to.be.html;
    });
  });
 describe('Post DELETE', () => {
    // this is post deleting
    it('should DELETE a post and redirect to /home', async () => {
      const res = await chai
                .request(sails.hooks.http.app)
                .post('/delete/65eecbc948d7e31b5e0d8025')
                .set('bypass-policies-for-testing', 'true');
      expect(res.statusCode).to.equal(404);
    });
  });



});