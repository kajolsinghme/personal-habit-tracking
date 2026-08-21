import request from "supertest";
import app from "../src/app";

describe("Auth API", () => {
  it("should register a user", async () => {
    const response = await request(app).post("/register").send({
      name: "John Doe",
      email: "john@test.com",
      password: "password123",
    });

    expect(response.status).toBe(201);

    expect(response.body.success).toBe(true);

    expect(response.body.user).toHaveProperty("email");

    expect(response.body.user.email).toBe("john@test.com");
  });

  it("should not register duplicate email", async () => {
    await request(app).post("/register").send({
      name: "John Doe",
      email: "john@test.com",
      password: "password123",
    });

    const response = await request(app).post("/register").send({
      name: "Another User",
      email: "john@test.com",
      password: "password123",
    });

    expect(response.status).toBe(409);

    expect(response.body.success).toBe(false);
  });

  it("should login a user", async () => {
    await request(app).post("/register").send({
      name: "Login User",
      email: "login@test.com",
      password: "password123",
    });

    const response = await request(app).post("/login").send({
      email: "login@test.com",
      password: "password123",
    });

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.token).toBeDefined();
  });

  it("should not login with wrong password", async () => {
    await request(app).post("/register").send({
      name: "Wrong Password User",
      email: "wrong@test.com",
      password: "password123",
    });

    const response = await request(app).post("/login").send({
      email: "wrong@test.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);

    expect(response.body.success).toBe(false);
  });

  it("should not login with non-existing email", async () => {
    const response = await request(app).post("/login").send({
      email: "notfound@test.com",
      password: "password123",
    });

    expect(response.status).toBe(401);

    expect(response.body.success).toBe(false);
  });
});
