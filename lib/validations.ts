import { z } from "zod";

const sign_up_validations = z.object({
  first_name: z
    .string()
    .nonempty("Hold up, an empty first name?")
    .min(2)
    .max(32),
  last_name: z.string().nonempty("Hold up, an empty last name?").min(2).max(32),
  email: z
    .string()
    .nonempty("Hold up, an empty email?")
    .email("Oops! Email needs an '@' and a domain. Try again, champ!")
    .min(6)
    .max(256)
    .toLowerCase(),
  password: z
    .string()
    .nonempty("Hold up, an empty password?")
    .min(8)
    .max(256)
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[.]).{8,}$/,
      "Whoops-a-daisy! This password needs a glow-up. It's gotta strut with a capital letter, dance with some numbers, and include a fancy dot (.)! Try again, superstar!"
    ),
});

const sign_in_validations = z.object({
  email: z
    .string()
    .nonempty("Hold up, an empty email?")
    .email("Oops! Email needs an '@' and a domain. Try again, champ!")
    .min(6)
    .max(256)
    .toLowerCase(),
  password: z
    .string()
    .nonempty("Hold up, an empty password?")
    .min(8)
    .max(256)
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[.]).{8,}$/,
      "Whoops-a-daisy! This password needs a glow-up. It's gotta strut with a capital letter, dance with some numbers, and include a fancy dot (.)! Try again, superstar!"
    ),
});

export { sign_up_validations, sign_in_validations };
