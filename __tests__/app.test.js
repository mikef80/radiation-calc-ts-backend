const app = require("../app");
const request = require("supertest");
const { userData } = require("../db/data/test-data");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");

beforeEach(() => seed({ userData }));
afterAll(() => db.end());

describe("/api/auth/signup", () => {
  it("POST 200 returns something", () => {
    return request(app)
      .get("/api/auth/login")
      .expect(200)
      .then(({ body }) => console.log(body));
  });
});
