import {
  AppError,
  ConflictError,
  errorHandler,
  ValidationError,
} from "@/lib/errors";
import { sign_up_data_type } from "@/lib/types";
import { sign_up_validations } from "@/lib/validations";
import { client } from "@/sanity/lib/client";
import * as argon2 from "argon2";
import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import resend from "@/lib/emails";
import EmailVerification from "@/lib/email-templtates/email-verification";

export async function POST(request: NextRequest) {
  try {
    const body: sign_up_data_type = await request.json();
    // validate incoming request body
    const { first_name, last_name, email, password } = body;
    if (!first_name || !last_name || !email || !password)
      throw new ValidationError(
        "Oops! Form Fumble: Looks like there was an error with the form data. Please check your entries and try again"
      );
    body.email = body.email.toLowerCase();
    const { error } = sign_up_validations.safeParse({
      first_name,
      last_name,
      email,
      password,
    });
    if (error) {
      throw new ValidationError(
        "Oops! Form Fumble: Looks like there was an error with the form data. Please check your entries and try again"
      );
    }
    const is_account_exist = await client.fetch(
      `*[_type=="account" && email match $email][0]`,
      {
        email,
      }
    );
    if (is_account_exist)
      throw new ConflictError(
        `Uh-oh! The email address ${email} is already registered.`
      );
    const hashed_password = await argon2.hash(password);
    // account section
    const account_template = {
      _type: "account",
      email,
      password_hash: hashed_password,
      is_email_verified: false,
    };
    const account = await client.create(account_template);
    // profile section
    const profile_template = {
      _type: "profile",
      account_id: {
        _type: "reference",
        _ref: account._id,
      },
      first_name,
      last_name,
      profile_image_url: "/profile/default-image.png",
    };
    const profile = await client.create(profile_template);
    // verification code section
    const token = jwt.sign(
      { account_id: account._id, purpose: "email_verification" },
      process.env.NEXT_PUBLIC_JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );
    const verification_token_template = {
      _type: "email_verification_token",
      account_id: {
        _type: "reference",
        _ref: account._id,
      },
      token,
      is_used: false,
    };
    const email_verification_token = await client.create(
      verification_token_template
    );
    resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Hello World",
      react: EmailVerification({ email, token, first_name, last_name }),
    });
    return NextResponse.json({
      success: true,
      message:
        "Congratulations! 🎉 Your registration was successful. Welcome aboard!",
    });
  } catch (error) {
    console.error(error);
    return errorHandler(error as AppError);
  }
}
