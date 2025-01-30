import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { client } from "@/sanity/lib/client";
import {
  errorHandler,
  InternalServerError,
  UnauthorizedError,
  ValidationError,
} from "@/lib/errors";

export async function POST(request: NextRequest) {}

export async function PATCH(request: NextRequest) {
  try {
    const { token } = await request.json();
    const result = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET as string
    );
    if (
      typeof result !== "string" &&
      result?.purpose === "email_verification"
    ) {
      const temp = client
        .patch(result?.account_id)
        .set({
          is_email_verified: true,
        })
        .commit();
      return NextResponse.json({
        success: true,
        pass: true,
        message: "Woohoo! Your email has been verified!",
      });
    }
    throw new ValidationError(
      "This token is lost—doesn’t know its job! Let’s find the right one."
    );
  } catch (error: any & { name: string }) {
    if (
      error?.name === "TokenExpiredError" ||
      error?.name === "JsonWebTokenError"
    ) {
      return errorHandler(
        new UnauthorizedError(
          "Oops! Your token expired like milk left out too long. Get a fresh one!"
        )
      );
    }
    return errorHandler(
      new InternalServerError(
        "Token verification failed or other error occurred."
      )
    );
  }
}
