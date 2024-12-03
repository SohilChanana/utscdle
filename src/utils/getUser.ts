import client from "@/utils/db";

export async function getUserFromDb(email: string) {
  try {
    // Connect to the database
    const db = client.db();
    const collection = db.collection("users");

    // Query the collection for a matching user
    const user = await collection.findOne({
      email,
    });

    // If no user is found, return null
    if (!user) {
      return null;
    }

    // Return the user details (omit sensitive information if needed)
    return {
      id: user._id, // MongoDB uses _id as the unique identifier
      email: user.email,
      name: user.name,
      password: user.password,
      // Add other fields you want to return
    };
  } catch (error) {
    console.error("Error fetching user from database:", error);
    throw new Error("Failed to fetch user");
  }
}
