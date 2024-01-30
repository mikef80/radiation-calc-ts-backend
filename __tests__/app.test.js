const app = require("../app");
const request = require("supertest");
const { userData } = require("../db/data/test-data");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");

beforeEach(() => seed({ userData }));
afterAll(() => db.end());

describe("/api/auth/signup", () => {
  const user = {
    firstname: "Quentin",
    lastname: "Blake",
    email: "qblake@gmail.com",
    password: "123456789",
  };

  it("POST 201 returns new user object", () => {
    return request(app)
      .post("/api/auth/signup")
      .send(user)
      .expect(201)
      .then(({ body }) => {
        expect(body.user).toContainKeys(["firstname", "lastname", "email"]);
      });
  });
});
