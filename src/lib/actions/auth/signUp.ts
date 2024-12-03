"use server";
import { connectDB } from "@/utils/mongoosedb";
import User from "@/lib/models/user";
import { saltAndHashPassword } from "@/utils/password";

interface signUpSchema {
  email: string;
  password: string;
  name: string;
}

export const signUp = async (values: signUpSchema) => {
  const { email, password, name } = values;
  try {
    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound) {
      throw new Error("User already exists!")
    }
    const hashedPassword = await saltAndHashPassword(password);
    const user = new User({
        name,
        email,
        password: hashedPassword
    });
    await user.save();
  } catch (e) {
    console.log(e);
  }
};
