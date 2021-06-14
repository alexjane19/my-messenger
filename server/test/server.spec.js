const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("Auth API", () => {
  describe("Login", () => {
    it("it should return 200", (done) => {
      chai
        .request(app)
        .post(`/auth/login`)
        .send({ email: "thomas@email.com", password: "123456" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("username").eql("thomas");
          res.body.should.have.property("email").eql("thomas@email.com");
          done();
        });
    });
  });

  describe("Register", () => {
    it("it should return 200", (done) => {
      chai
        .request(app)
        .post(`/auth/register`)
        .send({ username: "test", email: "test@email.com", password: "123456" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("username").eql("test");
          res.body.should.have.property("email").eql("test@email.com");
          done();
        });
    });
    it("it should return 401", (done) => {
      chai
        .request(app)
        .post(`/auth/register`)
        .send({
          username: "thomas",
          email: "thomas@email.com",
          password: "123456",
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
