import passport from "passport";

import { env, getAppUrl } from "@/config/env";
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
  label: string;
  enabled: boolean;
}[] = [
  {
    name: "google",
    label: "Google",
    Strategy: GoogleStrategy,
    enabled: !!env.GOOGLE_CLIENT_ID,
    config: {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${getAppUrl()}/api/v1/auth/google/callback`,
    },
  },
  {
    label: "Github",
    name: "github",
    Strategy: GitHubStrategy,
    enabled: !!env.GOOGLE_CLIENT_ID,
    config: {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${getAppUrl()}/api/v1/auth/github/callback`, 
    },
  },
  {
    name: "facebook",
    label: "Facebook",
    Strategy: FacebookStrategy,
    enabled: !!env.GOOGLE_CLIENT_ID,
    config: {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${getAppUrl()}/api/v1/auth/facebook/callback`, 
      profileFields: ["id", "emails", "name", "picture.type(large)"],
    },
  },
];
