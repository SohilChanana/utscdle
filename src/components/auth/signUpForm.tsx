"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/lib/models/zod";
import { signUp } from "@/lib/actions/auth/signUp";
import { SignUpProps } from "@/components/auth/props";
import { sendWelcomeEmail } from "../../lib/actions/email/sendWelcomeEmail";

export function SignUpForm({ setOpen }: SignUpProps) {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      // Sign up the user
      await signUp(values);

      // Send a request to the backend API to send the welcome email
      const response = await fetch("/api/sendWelcomeEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: values.email, username: values.name }), // Send the email to the backend
      });

      const result = await response.json();
      if (result.success) {
        console.log("Welcome email sent!");
      } else {
        console.error("Error sending welcome email:", result.message);
      }

      setOpen(false); // Close the form/modal
    } catch (error) {
      console.error("Sign-up error:", error);
    }
  
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full items-center gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Must be at least 3 characters" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@domain.com"
                  {...field}
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Must be at least 8 characters"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Must be same as above password"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </Form>
  );
}
