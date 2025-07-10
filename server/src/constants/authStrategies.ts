import passport from "passport";

import { env } from "../config/env";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as FacebookStrategy } from "passport-facebook";

type VerifyCallback = (
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: (error: any, user?: any, info?: any) => void
) => void;

interface PassportStrategyConstructor {
  new (options: any, verify: VerifyCallback): passport.Strategy;
}

export const strategies: {
  name: string;
  Strategy: PassportStrategyConstructor;
  config: any;
}[] = [
  {
    name: "google",
    Strategy: GoogleStrategy,
    config: {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
  },
  {
    name: "github",
    Strategy: GitHubStrategy,
    config: {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
  },
  {
    name: "facebook",
    Strategy: FacebookStrategy,
    config: {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "emails", "name", "picture.type(large)"], // optional
    },
  },
];
