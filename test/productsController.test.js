import app from "../index.js";
import { use, expect, should } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import pool from "../db/db.js";

const chai = use(chaiHttp);
should();

const url = `/products`;

describe("Testing ProductsController", () => {
  it("getAll return OK status", (done) => {
    chai.request
      .execute(app)
      .get(url)
      .end((err, res) => {
        if (err) {
          throw new Error(err.message);
        } else {
          res.should.have.status(200);
        }
      });
    done();
  });

  it("getAll returns a array", (done) => {
    chai.request
      .execute(app)
      .get(url)
      .end((err, res) => {
        if (err) {
          throw new Error(err.message);
        } else {
          res.body.should.be.a("array");
        }
      });
    done();
  });
});

xdescribe("testing productController", () => {
  it("Get All Return Ok status", (done) => {
    chai.request
      .execute(app)
      .get(url)
      .end((err, res) => {
        if (err) {
          throw new Error(err.message);
        } else {
          res.should.have.status(200);
        }
      });
    done();
  });

  it("Get All array", (done) => {
    chai.request
      .execute(app)
      .get(url)
      .end((err, res) => {
        if (err) {
          throw new Error(err.message);
        } else {
          res.body.should.be.a("array");
        }
      });
    done();
  });
});

describe("testing database productController", () => {
  afterEach(() => {
    sinon.restore();
  });
  //   beforeEach(() => {
  //     sinon.restore();
  //   });
  it("should return 200 and product data when products are found", async () => {
    const mockData = [
      {
        product_id: 1,
        product_name: "Soccer Ball",
        price: 100,
        category: "Soccer",
        star_rating: 2,
        description: "A Soccer ball",
        imageurl: "SOCCERball.jpg",
      },
    ];

    // Stub the 'query' method of 'pool' and resolve with mock data
    sinon
      .stub(pool, "query")
      .resolves({ rowCount: mockData.length, rows: mockData });

    // Make a request to the endpoint
    const res = await chai.request.execute(app).get(url);

    // Check that the response status is 200 and the body matches the mock data
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array").that.deep.equals(mockData);
  });

  //   it("return 404 status not found", async () => {
  //     sinon.stub(pool, "query").resolves({ rowsCount: 0 });
  //     const result = await chai.request.execute(app).get(url);
  //     //  console.log(result)
  //     expect(result).to.have.status(404);
  //   });

  //  it('should return  for internal server error', async () => {
  //   sinon.stub(pool, 'query').rejects (new Error('Database error'));
  //    const res = await chai.request.execute(app).get('/products');
  //    expect (res).to.have.status (500);
  //    expect(res.body).to.have.property('error').to.equal('Internal Error');
  //   });
  //   it("should return 500 for internal server error", async () => {
  //     sinon.stub(pool, "query").rejects(new Error("Database error"));
  //     const res = await chai.request.execute(app).get("/products");
  //     expect(res).to.have.status(500);
  //     expect(res.body).to.have.property("error").to.equal("Internal Error");
  //   });
});

describe("mocking createNewProduct", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("Should return 201 and created product data when all required fields are provided", async () => {
    const newProduct = {
      product_name: "Kayak",
      price: "1000",
      category: "Water-Sports",
      star_rating: "4.5",
      description: "A new product",
      product_code: "TEN-RAC",
      imageurl: "assest/images/kayak.jpg",
    };

    const mockData = { newProduct };

    sinon.stub(pool, "query").resolves({ rows: [mockData] });
    console.log(url);
    const result = await chai.request
      .execute(app)
      .post(url)
      .send(newProduct);

    expect(result).to.have.status(201);
    expect(result.body).to.be.above("object").that.deep.equals(mockData);
  });
});
