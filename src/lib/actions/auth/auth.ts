// wrap into a server component
"use server";
import { signIn } from "@/lib/auth";
import { z } from "zod";
import { signInSchema } from "@/lib/models/zod";

export async function signInCredentialsWrapper(
  values: z.infer<typeof signInSchema>
) {
  return await signIn("credentials", { ...values, redirect: false });
}

export async function signInGoogleWrapper() {
  return await signIn("google");
}