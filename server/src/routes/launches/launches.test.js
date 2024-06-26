const request = require("supertest");
const app = require("../../app");

const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => await mongoConnect());

  afterAll(async () => await mongoDisconnect());

  describe("TEST GET /launches", () => {
    test("it should respond with 200 success", async () => {
      await request(app)
        .get("/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("TEST POST /launches", () => {
    const completeLaunchData = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
      launchDate: "January 4, 2028",
    };

    const launchDataWithoutDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
    };

    const launchDataWithInvalidDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
      launchDate: "no",
    };

    test("it should respond with 201 created", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunchData)
        .expect(201)
        .expect("Content-Type", /json/);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(responseDate).toBe(requestDate);
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("should catch missing required properties", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithoutDate)
        .expect(400)
        .expect("Content-Type", /json/);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });

    test("should catch invalid dates", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithInvalidDate)
        .expect(400)
        .expect("Content-Type", /json/);

      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
});
