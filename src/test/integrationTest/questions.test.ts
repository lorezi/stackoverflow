import { server } from "./../../main";
import request from "supertest";

describe("/questions", () => {
  beforeEach(() => {
    server;
  });

  afterEach(() => {
    server.close();
  });

  describe("GET /", () => {
    it("should return all questions", async () => {
      const res = await request(server).get("/questions");
      expect(res.status).toBe(401);
    });
  });
});
