import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: {
      /** The user's database id. */
      guestId: any;
    } & DefaultSession["user"];
  }

  interface User {
    guestId: any;
  }
}
