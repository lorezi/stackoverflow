import mongoose from "mongoose";
import { User } from "../../models/userModel";
import { clearDatabase, connect } from "../utils/dbHandler";

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await connect();
});

/**
 * Clear all test data after every test.
 */
beforeEach(async () => {
  await clearDatabase();
});

/**
 * User create test suite
 */
describe("createUser", () => {
  /**
   * Tests that a valid user can be created through the User model without throwing any errors.
   */
  it("should create user", async () => {
    const result = await User.create(validUser);
    expect(result._id).toBeDefined();
    expect(result).toMatchObject({ username: validUser.username });
  });

  /**
   * should exist after created
   */
  it("exists after created", async () => {
    await User.create(validUser);
    const result = await User.findOne();

    expect(result).toHaveProperty("username", validUser.username);
  });

  /**
   * Should throw an error when user doesn't have an author, title and body.
   */
  it("requires author, title and body", async () => {
    invalidUser.forEach(async (data) => {
      await expect(async () => {
        await User.create(data);
      }).rejects.toThrow(mongoose.Error.ValidationError);
    });
  });
});

const invalidUser = [
  {
    firstName: "Burna",

    email: "burna@gmail.com",
    username: "burnaboy",
    password: "123456789",
    passwordConfirm: "123456789",
  },

  {
    firstName: "Burna",
    lastName: "Wazobia",

    username: "burnaboy",
    password: "123456789",
    passwordConfirm: "123456789",
  },
  {
    firstName: "Burna",
    lastName: "Wazobia",
    email: "burna@gmail.com",

    password: "123456789",
    passwordConfirm: "123456789",
  },
  {
    firstName: "Burna",
    lastName: "Wazobia",
    email: "burna@gmail.com",
    username: "burnaboy",
    password: "123456789",
    passwordConfirm: "1234567",
  },
];

const validUser = {
  firstName: "Burna",
  lastName: "Wazobia",
  email: "burna@gmail.com",
  username: "burnaboy",
  password: "123456789",
  passwordConfirm: "123456789",
};
