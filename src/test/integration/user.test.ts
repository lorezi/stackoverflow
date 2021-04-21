import { clearDatabase, connect } from "../utils/dbHandler";
import request from "supertest";
import app from "../../app";

const agent = request(app);

beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  await clearDatabase();
});

describe("/users", () => {
  describe("POST /users/signup", () => {
    it("should create a new user", async () => {
      const res = await agent.post("/users/signup").send(newUser);

      expect(res.status).toBe(201);
      expect(res.body.data.user).toBeTruthy();
    });
  });

  describe("POST /users/login", () => {
    it("should return 200 if token is correct", async () => {
      // seed database by creating new user
      await agent
        .post("/users/signup")
        .send(newUser)
        .expect(201)
        .then((res) => {
          expect(res.body.data.user).toBeTruthy();
        });

      // login
      const res = await agent.post("/users/login").send(login);

      expect(res.status).toBe(200);
      expect(res.body.data.user).toBeTruthy();
    });
  });
});

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
