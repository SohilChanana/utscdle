import bcrypt from "bcryptjs";

export async function saltAndHashPassword(password: string): Promise<string> {
  if (!password) {
    throw new Error("Password cannot be empty");
  }

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error: unknown) {
    throw new Error("Failed to hash password: " + error);
  }
}
