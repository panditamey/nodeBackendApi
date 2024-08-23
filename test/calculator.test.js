import * as chai from "chai";

import { add, multiply } from "./calculator.js";

//Arrange
describe("Testing Calculator", () => {
  let x, y;
  beforeEach(() => {
    x = 2;
    y = 4;
    console.log("Initializing (Arrange)");
  });

  afterEach(() => {
    x = 0;
    y = 0;
    console.log("Afer Each (TearDown)");
  });

  it("should add two numbers", () => {
    //Act
    const result = add(x, y);
    //Assert
    chai.expect(result).to.equal(6);
  });

  
  it("should multiply two numbers", () => {
    //Act
    const result = multiply(x, y);
    //Assert
    chai.expect(result).to.equal(8);
  });
});
