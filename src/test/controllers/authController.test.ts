import { signToken } from "./../../controllers/authController";
import { Types } from "mongoose";

// create an id with the type ObjectId
const id = Types.ObjectId("4edd40c86762e0fb12000003");

describe("signToken", () => {
  it("should return a valid JWT signed token", () => {
    const token = signToken(id);
    expect(token).toBeTruthy();
  });
});

const data = {
  firstName: "John",
  lastName: "Doe",
  email: "doe@gmail.com",
  username: "doe",
  password: "123456789",
  passwordConfirm: "123456789",
};
