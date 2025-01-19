import { list } from "postcss";
import { type SchemaTypeDefinition } from "sanity";

const account: SchemaTypeDefinition = {
  name: "account",
  title: "Account",
  type: "document",
  fields: [
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().min(3).max(256).email().lowercase(),
    },
    {
      name: "password_hash",
      title: "Password_Hash",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "is_email_verified",
      title: "Is_Email_Verified",
      type: "boolean",
      initialValue: false,
      validation: (rule) => rule.required(),
    },
  ],
};

const auth_provider: SchemaTypeDefinition = {
  name: "auth_provider",
  title: "Auth_Provider",
  type: "document",
  fields: [
    {
      name: "account_id",
      title: "Account_Id",
      type: "reference",
      to: [{ type: "account" }],
      validation: (rule) => rule.required(),
    },
    {
      name: "provider_type",
      title: "Provider_Type",
      type: "string",
      options: {
        list: ["Google", "GitHub"],
      },
      validation: (rule) => rule.required(),
    },
    {
      name: "provider_id",
      title: "Provider_Id",
      type: "string",
      validation: (rule) => rule.required(),
    },
  ],
};

const profile: SchemaTypeDefinition = {
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    {
      name: "account_id",
      title: "Account_Id",
      type: "reference",
      to: [{ type: "account" }],
      validation: (rule) => rule.required(),
    },
    {
      name: "first_name",
      title: "First_Name",
      type: "string",
      validation: (rule) => rule.min(2).max(32),
    },
    {
      name: "last_name",
      title: "Last_Name",
      type: "string",
      validation: (rule) => rule.min(2).max(32),
    },
    {
      name: "phone_number",
      title: "Phone_Number",
      type: "string",
    },
    {
      name: "gender",
      title: "Gender",
      type: "string",
      options: {
        list: ["Male", "Female", "Other"],
      },
    },
    {
      name: "birth_date",
      title: "Birth_Date",
      type: "date",
    },
    {
      name: "profile_image_url",
      title: "Profile_Image_Url",
      type: "string",
      initialValue: "/profile/default-image.png",
      validation: (rule) => rule.required(),
    },
  ],
};

const verification_code: SchemaTypeDefinition = {
  name: "verification_code",
  title: "Verification_Code",
  type: "document",
  fields: [
    {
      name: "account_id",
      title: "Account_Id",
      type: "reference",
      to: [{ type: "account" }],
      validation: (rule) => rule.required(),
    },
    {
      name: "token",
      title: "Token",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "expiry_date",
      title: "Expiry_Date",
      type: "datetime",
      validation: (rule) => rule.required(),
    },
    {
      name: "is_used",
      title: "Is_Used",
      type: "boolean",
      initialValue: false,
      validation: (rule) => rule.required(),
    },
  ],
};

const password_reset_token: SchemaTypeDefinition = {
  name: "password_reset_token",
  title: "Password_Reset_Token",
  type: "document",
  fields: [
    {
      name: "account_id",
      title: "Account_Id",
      type: "reference",
      to: [{ type: "account" }],
      validation: (rule) => rule.required(),
    },
    {
      name: "token",
      title: "Token",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "expiry_date",
      title: "Expiry_Date",
      type: "datetime",
      validation: (rule) => rule.required(),
    },
    {
      name: "is_used",
      title: "Is_Used",
      type: "boolean",
      initialValue: false,
      validation: (rule) => rule.required(),
    },
  ],
};

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    account,
    auth_provider,
    profile,
    verification_code,
    password_reset_token,
  ],
};
