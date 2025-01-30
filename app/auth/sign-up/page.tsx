"use client";
import { sign_up_validations } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { sign_up_data_type } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import { formatted_date } from "@/lib/utils";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const form = useForm<sign_up_data_type>({
    resolver: zodResolver(sign_up_validations),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: sign_up_data_type) {
    setLoading(true);
    const result = await fetch("/api/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const response = await result.json();
    if (response.success) {
      toast(response?.message, {
        description: formatted_date(),
      });
      setLoading(false);
      redirect("/auth/sign-in");
    } else {
      toast(response?.error?.message, {
        description: formatted_date(),
      });
    }

    setLoading(false);
  }
  return (
    <>
      <main className="w-full min-h-screen flex items-center justify-center">
        <Card className="max-w-lg w-full border-none shadow-none">
          <CardHeader>
            <CardTitle>Welcome, Future Shopper!</CardTitle>
            <CardDescription>
              Your Gateway to Endless Possibilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="flex gap-x-4">
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="flex justify-between w-full">
                            First Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Your First Name"
                              type="text"
                              id="first_name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="flex justify-between w-full">
                            Last Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Your Last Name"
                              type="text"
                              id="last_name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-between w-full">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your Email"
                            type="email"
                            id="email"
                            {...field}
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
                        <FormLabel className="flex justify-between w-full">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Your Passowrd"
                            type="password"
                            id="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    {loading ? <LoadingSpinner size={14} /> : "Sign up"}
                  </Button>
                </form>
              </Form>
              <Button variant="outline" className="w-full">
                Sign up with Google
              </Button>
              <div className="text-sm text-center">
                Already have an account?{" "}
                <Link className="underline" href={"/auth/sign-in"}>
                  Sign in
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
