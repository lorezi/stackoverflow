import { signToken } from "../../controllers/authController";

import { ObjectID } from "mongodb";

import { clearDatabase, connect } from "../utils/dbHandler";

beforeAll(async () => {
  await connect();
});

/**
 * Clear all test data after every test.
 */
beforeEach(async () => {
  await clearDatabase();
});

describe("signToken", () => {
  it("should return a valid JWT signed token", () => {
    const token = signToken(id);
    expect(token).toBeTruthy();
  });
});

// create an id with the type ObjectId
const id = ObjectID.createFromHexString("08900823AD32DEAA09080990");

// const newUser = {
//   firstName: "Burna",
//   lastName: "Wazobia",
//   email: "burna@gmail.com",
//   username: "burnaboy",
//   password: "123456789",
//   passwordConfirm: "123456789",
// };
