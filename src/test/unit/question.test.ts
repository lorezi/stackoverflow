import mongoose from "mongoose";
import { clearDatabase, connect } from "../utils/dbHandler";
import { Question } from "../../models/questionModel";
import ObjectID from "bson-objectid";

// create an id with the type ObjectId
const id = ObjectID.createFromHexString("08900823AD32DEAA09080990");
const validQuestion = { title: "Jest", body: "Jest for testing", author: id };

const invalidQuestion = [
  { title: "Jest", body: "What is testing" },
  { body: "What is testing", author: id },
  { title: "Jest", author: id },
];

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
 * Question create test suite
 */
describe("createQuestion", () => {
  /**
   * Tests that a valid question can be created through the Question model without throwing any errors.
   */
  it("should create question", async () => {
    const result = await Question.create(validQuestion);
    expect(result._id).toBeDefined();
    expect(result).toMatchObject({ title: validQuestion.title });
  });

  /**
   * should exist after created
   */
  it("exists after created", async () => {
    await Question.create(validQuestion);
    const result = await Question.findOne();

    expect(result).toHaveProperty("title", validQuestion.title);
  });

  /**
   * Should throw an error when question doesn't have an author, title and body.
   */
  it("requires author, title and body", async () => {
    invalidQuestion.forEach(async (data) => {
      await expect(async () => {
        await Question.create(data);
      }).rejects.toThrow(mongoose.Error.ValidationError);
    });
  });
});
