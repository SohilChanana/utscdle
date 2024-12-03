import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const signUpSchema = z
  .object({
    name: z.string().min(1, { message: "Username is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // This sets the error on the confirmPassword field
  });

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string(),
});


const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const imageSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, and .png formats are supported."
    )
})