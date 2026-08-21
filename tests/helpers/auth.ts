import request from "supertest";
import app from "../../src/app";

export const getAuthToken = async (): Promise<string> => {
  await request(app).post("/register").send({
    name: "Test User",
    email: "habit@test.com",
    password: "password123",
  });

  const response = await request(app).post("/login").send({
    email: "habit@test.com",
    password: "password123",
  });

  return response.body.token;
};
