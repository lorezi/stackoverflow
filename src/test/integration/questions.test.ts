import { clearDatabase, connect } from "../utils/dbHandler";
import request from "supertest";
import app from "../../app";
import { ObjectID } from "mongodb";
import { Question } from "../../models/questionModel";

const agent = request(app);

beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  await clearDatabase();
});

describe("/questions", () => {
  let token: string;

  beforeEach(async () => {
    /**
     * seed database by creating new user
     * */
    await agent
      .post("/users/signup")
      .send(newUser)
      .expect(201)
      .then((res) => {
        expect(res.body.data.user).toBeTruthy();
      });

    /**
     * login
     */
    await agent
      .post("/users/login")
      .send(login)
      .expect(200)
      .then((res) => {
        expect(res.body.data.user).toBeTruthy();
        token = res.body.token;
      });
  });

  describe("GET /", () => {
    it("should return 401 if user is not authorized", async () => {
      const res = await agent.get("/questions");
      expect(res.status).toBe(401);
    });
  });

  describe("GET /:id", () => {
    it("should return a question if valid id is passed", async () => {
      const question = await Question.create(validQuestion);
      const res = await agent
        .get(`/questions/${question._id}`)
        .set("authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.data.data).toHaveProperty("title", question.title);
    });
  });

  describe("GET /:id/up-vote", () => {
    it("should make a post for up-vote if valid question id is passed", async () => {
      const question = await Question.create(validQuestion);
      const res = await agent
        .patch(`/questions/${question._id}/up-vote`)
        .set("authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });

  describe("GET /:id/down-vote", () => {
    it("should make a post for down-vote if valid question id is passed", async () => {
      const question = await Question.create(validQuestion);
      const res = await agent
        .patch(`/questions/${question._id}/up-vote`)
        .set("authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });

  describe("GET /:id/reply", () => {
    it("should make a post for a response to a question if valid question id is passed", async () => {
      const question = await Question.create(validQuestion);
      const res = await agent
        .post(`/questions/${question._id}/reply`)
        .set("authorization", `Bearer ${token}`)
        .send(reply);
      expect(res.status).toBe(201);
    });
  });

  describe("GET /:id/subscribe", () => {
    it("should subscribe to a question for notifications if valid question id is passed", async () => {
      const question = await Question.create(validQuestion);
      const res = await agent
        .post(`/questions/${question._id}/subscribe`)
        .set("authorization", `Bearer ${token}`)
        .send(reply);
      expect(res.status).toBe(201);
    });
  });
  describe("POST /", () => {
    // create with a valid question

    const postQuestion = async (question) => {
      const res = await agent
        .post("/questions")
        .set("authorization", `Bearer ${token}`)
        .send(question);

      return res;
    };

    it("should return a 401 if client is not logged in", async () => {
      token = "";
      const res = await postQuestion(validQuestion);
      expect(res.status).toBe(401);
    });

    it("should return a 400 if question does not contain title i.e invalid question", async () => {
      const res = await postQuestion(invalidQuestion);

      expect(res.status).toBe(400);
    });

    it("should save the question if it is valid", async () => {
      const res = await postQuestion(validQuestion);

      const result = await Question.findOne();

      expect(res.status).toBe(201);
      expect(result).not.toBeNull();
    });

    it("should return the question if it is valid", async () => {
      const res = await postQuestion(validQuestion);

      expect(res.body.data.data).toHaveProperty("_id");
      expect(res.body.data.data).toHaveProperty("title", validQuestion.title);
    });
  });
});

const id = ObjectID.createFromHexString("08900823AD32DEAA09080990");
const validQuestion = { title: "Jest", body: "Jest for testing", author: id };
const invalidQuestion = { body: "Jest for testing", author: id };

const newUser = {
  firstName: "Burna",
  lastName: "Wazobia",
  email: "burna@gmail.com",
  username: "burnaboy",
  password: "123456789",
  passwordConfirm: "123456789",
};

const login = {
  username: "burnaboy",
  password: "123456789",
};

const reply = {
  answer:
    "Reply with web socket after subscribing - I had a feeling years that Go was the future of compiled software that was still highly productive and fun write. Python was my first love and always will be, but loving programing languages I was on the search for another go-to (haha) tool in my tool belt. Go is that tool. It's simplicity, speed, and library support are phenomenal. But it's passionate and kind community are what absolutely make it a winner for so many projects",
};
