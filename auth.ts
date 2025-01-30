import NextAuth, { Account, Profile, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { sign_in_validations } from "./lib/validations";
import * as argon2 from "argon2";
import { InvalidCredentials } from "./lib/errors";
import { client } from "./sanity/lib/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          if (!credentials.email || !credentials.password) {
            throw new InvalidCredentials();
          }
          credentials.email = (credentials.email as string).toLowerCase();
          const { error } = sign_in_validations.safeParse(credentials);
          if (error) {
            throw new InvalidCredentials();
          }
          const account = await client.fetch(
            `*[_type=="account" && email match $email][0] { _id, email, password_hash }`,
            {
              email: credentials.email,
            }
          );
          if (!account) {
            throw new InvalidCredentials();
          }
          const is_matched_password = await argon2.verify(
            account.password_hash,
            credentials.password as string
          );
          if (!is_matched_password) {
            throw new InvalidCredentials();
          }
          const profile = await client.fetch(
            `*[_type=="profile" && account_id->_id match $account_id][0] { _id, first_name, last_name }`,
            {
              account_id: account._id,
            }
          );
          return {
            account_id: account._id,
            profile_id: profile._id,
            email: account.email,
            first_name: profile.first_name,
            last_name: profile.last_name,
          };
        } catch (error) {
          console.error(error);
          throw new InvalidCredentials();
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.account_id = user.account_id;
        token.profile_id = user.profile_id;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.account_id = token.account_id;
      session.user.profile_id = token.profile_id;
      session.user.first_name = token.first_name;
      session.user.last_name = token.last_name;
      return session;
    },
  },
});
