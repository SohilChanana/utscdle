"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";

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
import { signInSchema } from "@/lib/models/zod";
import { signInCredentialsWrapper } from "@/lib/actions/auth/auth";
import { SignInProps } from "@/components/auth/props";

export function SignInForm({ setOpen, setContent }: SignInProps) {
  const errorNoUserRef = useRef<HTMLParagraphElement>(null);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signInSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Submit completed");
    signInCredentialsWrapper(values)
      .then(() => {
        localStorage.clear();
        console.log("Sign in successful, localStorage cleared.");
        setOpen(false);
        window.location.assign("/daily-challenge");

      })
      .catch(() => {
        // console.error("Sign in failed:", e);
        if (errorNoUserRef.current) {
          errorNoUserRef.current.innerText =
            "We couldn't find an account that matches those credentials.";
        }
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full items-center gap-4"
      >
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
        {/* Error message if user does not have an account */}
        <p
          ref={errorNoUserRef}
          className={cn("text-[0.8rem] font-medium text-destructive")}
        />
        <Button type="submit">Sign In</Button>
        <p className="text-sm text-muted-foreground text-center">
          Don&apos;t have an account?{" "}
          <button
            className="underline flex-nowrap"
            onClick={() => setContent("sign-up")}
          >
            Sign Up
          </button>
        </p>
      </form>
    </Form>
  );
}
