import * as chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
const { expect, should } = chai;
import app from "../index.js";

chai.use(chaiHttp);

const url = "/products";

describe("Testing ProductsController", () => {
  it("should get all products", (done) => {
    chai
      .request(app)
      .get(url)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          res.should.have.status(200);
          done();
        }
      });
  });
});
