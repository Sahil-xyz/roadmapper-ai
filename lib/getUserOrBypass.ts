// lib/getUserOrBypass.ts
import { auth, currentUser } from "@clerk/nextjs/server";
import { createUserIfNotExists } from "./createUserIfNotExists";

export async function getUserOrBypass() {
  const { userId } = await auth();

  if (userId) {
    const user = await currentUser();
    return await createUserIfNotExists(userId, user?.emailAddresses?.[0]?.emailAddress || "no-email");
  }

  if (process.env.NODE_ENV === "development") {
    console.warn("⚠️ Clerk auth bypassed for local testing.");
    return await createUserIfNotExists("local-test-user", "test@example.com");
  }

  return null;
}
