import { clearDatabase, connect } from "../utils/dbHandler";
import request from "supertest";
import app from "../../app";
import { ObjectID } from "mongodb";

const agent = request(app);

beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  await clearDatabase();
});

describe("POST /users/signup", () => {
  it("should create a new user", async (done) => {
    await agent
      .post("/users/signup")
      .send(newUser)
      .expect(201)
      .then((res) => {
        expect(res.body.data.user).toBeTruthy();
      });
    done();
  });
});

describe("POST /users/login", () => {
  it("should return 200 if token is correct", async () => {
    let token: any;

    // seed database by creating new user
    await agent
      .post("/users/signup")
      .send(newUser)
      .expect(201)
      .then((res) => {
        expect(res.body.data.user).toBeTruthy();
      });

    // login
    await agent
      .post("/users/login")
      .send(login)
      .expect(200)
      .then((res) => {
        expect(res.body.data.user).toBeTruthy();
        token = res.body.token;
      });

    const res = await agent
      .get("/questions")
      .set("authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});

describe("auth middleware", () => {
  let token: string;
  let question;

  const exec = () => {
    const res = agent
      .post("/questions")
      .set("authorization", `Bearer ${token}`)
      .send(question);

    return res;
  };

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

    question = validQuestion;
  });

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 401 if token is an invalid string", async () => {
    token = "a";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 200 if  token is valid", async () => {
    const res = await exec();
    expect(res.status).toBe(201);
  });
});

const id = ObjectID.createFromHexString("08900823AD32DEAA09080990");
const validQuestion = { title: "Jest", body: "Jest for testing", author: id };

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
