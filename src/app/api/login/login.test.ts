import { describe, it, expect } from "vitest";
import { POST } from "./route"; // Import the API handler directly
import { db } from "@/db";
import { users } from "@/db/schema";
import { hash } from "bcryptjs";

describe("Login API", () => {
  it("should return a token for valid credentials", async () => {
    // 1. ARRANGE: Create the user in the test database
    // We must hash the password so it matches what the login route expects
    const hashedPassword = await hash("secretpassword123", 10);

    await db.insert(users).values({
      email: "student@test.com",
      password: hashedPassword,
      role: "student",
    });

    // 2. ACT: Simulate the POST request
    // We create a fake Request object with the user's credentials
    const req = new Request("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: "student@test.com",
        password: "secretpassword123",
      }),
    });

    // Call the API route function
    const response = await POST(req);

    // 3. ASSERT: Verify the response
    const body = await response.json();

    // Check that we got a 200 OK status
    expect(response.status).toBe(200);

    // Check that our standard response format is correct
    expect(body.success).toBe(true);
    expect(body.message).toBe("Login successful!");
    
    // Check that we actually got a token back
    expect(body.data).toBeDefined();
    expect(body.data.token).toBeDefined();
    expect(typeof body.data.token).toBe("string");
  });
});