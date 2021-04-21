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

// describe("auth middleware", () => {
//   it("should generate a valid token", async () => {
//     const user = await User.create(newUser);
//     const statusCode = 200;
//     const req: any = {
//       secure: "",
//       headers: {
//         "x-forwarded-proto": "",
//       },
//     };
//     let res: any;

//     createSendToken(user, statusCode, req, res);
//     expect(req.statusCode).toBe(statusCode);
//   });
// });

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
