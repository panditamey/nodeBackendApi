import sinon from "sinon";
import pool from "../db/db.js";

import app from "../index.js";
import { use, expect, should } from "chai";
import chaiHttp from "chai-http";

const chai = use(chaiHttp);
should();

const url = `/products`;

describe("Mocking product controller", () => {
  afterEach(() => {
    sinon.restore(); //Restore Original Methods
  });

  //1. Test for Empty Response (No Products Found)
  it("Returns 404 when no Products are found", () => {
    sinon.stub(pool, "query").resolves({ rowCount: 0 });
    const result = chai.request(app).get("/products");
    expect(result).to.have.status(400);
  });

  it("should return 200 and product data when products are found", () => {
    const mockData = [
      {
        product_id: 1,
        productname: "WaterBottle",
        price: 40,
        category: "WaterSports",
        star_rating: 4,
        description: "of Lorem Ipsum available",
        imageurl: "assets/images/bottle.jpeg",
      },
    ];
    sinon
      .stub(pool, "query")
      .resolves({ rowCount: mockData.length, rows: mockData });

    const res = chai.request(app).get("/products");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array").that.deep.equals(mockData);
  });

  it("should return 500 for internal server error", () => {
    sinon.stub(pool, "query").rejects(new Error("Database Error"));

    const res = chai.request(app).get("/products");
    expect(res).to.have.status(500);
    expect(res.body).to.have.property("error").to.equal("Internal Error");
  });
});
