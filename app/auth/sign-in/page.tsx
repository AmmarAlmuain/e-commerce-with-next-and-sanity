"use client";
import { sign_in_validations } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { sign_in_data_type } from "@/lib/types";
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

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const form = useForm<sign_in_data_type>({
    resolver: zodResolver(sign_in_validations),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: sign_in_data_type) {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    setLoading(false);
    if (result?.error) {
      toast(result?.code, {
        description: formatted_date(),
      });
    } else {
      redirect("/");
    }
  }
  return (
    <>
      <main className="w-full min-h-screen flex items-center justify-center">
        <Card className="max-w-lg w-full border-none shadow-none">
          <CardHeader>
            <CardTitle>Welcome Back, Shopper!</CardTitle>
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
                        <div className="flex w-full justify-between text-center">
                          <div className="flex justify-between items-end w-full">
                            <FormLabel>Password</FormLabel>
                            <Link
                              className="hover:underline text-end leading-none text-sm"
                              href={"/auth/sign-up"}
                            >
                              Forgot your password?
                            </Link>
                          </div>
                        </div>
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
                    {loading ? <LoadingSpinner size={14} /> : "Sign in"}
                  </Button>
                </form>
              </Form>
              <Button variant="outline" className="w-full">
                Sign in with Google
              </Button>
              <div className="text-sm text-center">
                Don't have an account?{" "}
                <Link className="underline" href={"/auth/sign-up"}>
                  Sign up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
