import request from "supertest";
import app from "../src/app";
import { getAuthToken } from "./helpers/auth";

describe("Habit API", () => {
  it("should create a habit", async () => {
    const token = await getAuthToken();

    const response = await request(app)
      .post("/habits")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Drink Water",
        description: "Drink 3 liters daily",
        frequency: "daily",
      });
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.habit.title).toBe("Drink Water");
  });

  it("should get all habits", async () => {
    const token = await getAuthToken();

    await request(app)
      .post("/habits")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Exercise",
        description: "Workout daily",
        frequency: "daily",
      });

    const response = await request(app)
      .get("/habits")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.habits.length).toBe(1);
  });

  it("should get habit by id", async () => {
    const token = await getAuthToken();

    const createResponse = await request(app)
      .post("/habits")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Read Book",
        description: "Read 20 pages",
        frequency: "daily",
      });

    const habitId = createResponse.body.habit._id;

    const response = await request(app)
      .get(`/habits/${habitId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.habit._id).toBe(habitId);
  });

  it("should update habit", async () => {
    const token = await getAuthToken();

    const createResponse = await request(app)
      .post("/habits")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Old Title",
        frequency: "daily",
      });

    const habitId = createResponse.body.habit._id;

    const response = await request(app)
      .put(`/habits/${habitId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Title",
      });

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.habit.title).toBe("Updated Title");
  });

  it("should delete habit", async () => {
    const token = await getAuthToken();

    const createResponse = await request(app)
      .post("/habits")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Delete Me",
        frequency: "daily",
      });

    const habitId = createResponse.body.habit._id;

    const response = await request(app)
      .delete(`/habits/${habitId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);
  });

  it("should track a habit", async () => {
    const token = await getAuthToken();

    const createResponse = await request(app)
      .post("/habits")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Exercise",
        description: "Workout daily",
        frequency: "daily",
      });

    const habitId = createResponse.body.habit._id;

    const response = await request(app)
      .post(`/habits/${habitId}/track`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);

    expect(response.body.success).toBe(true);

    expect(response.body.trackingLog).toBeDefined();
  });

  it("should not track habit twice on same day", async () => {
    const token = await getAuthToken();

    const createResponse = await request(app)
      .post("/habits")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Reading",
        frequency: "daily",
      });

    const habitId = createResponse.body.habit._id;

    await request(app)
      .post(`/habits/${habitId}/track`)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .post(`/habits/${habitId}/track`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(409);

    expect(response.body.success).toBe(false);
  });

  it("should get habit history", async () => {
    const token = await getAuthToken();

    const createResponse = await request(app)
      .post("/habits")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Meditation",
        frequency: "daily",
      });

    const habitId = createResponse.body.habit._id;

    await request(app)
      .post(`/habits/${habitId}/track`)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get(`/habits/${habitId}/history`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.history).toHaveLength(7);

    expect(response.body.history[0].completed).toBe(true);
  });
});
