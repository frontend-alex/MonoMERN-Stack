  import passport from "passport";

  import { env, getAppUrl } from "@/config/env";

  import { Strategy as GoogleStrategy } from "passport-google-oauth20";
  import { Strategy as FacebookStrategy } from "passport-facebook";
  import { Strategy as GitHubStrategy } from "passport-github2";
  import { Strategy as TwitterStrategy } from "passport-twitter";
  import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
  import { Strategy as InstagramStrategy } from "passport-instagram";


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
      enabled: true,
      config: {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${getAppUrl()}/api/v1/auth/google/callback`,
      },
    },
    {
      name: "github",
      label: "GitHub",
      Strategy: GitHubStrategy,
      enabled: false,
      config: {
        clientID: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
        callbackURL: `${getAppUrl()}/api/v1/auth/github/callback`,
      },
    },
    {
      name: "facebook",
      label: "Facebook",
      Strategy: FacebookStrategy,
      enabled: false,
      config: {
        clientID: env.FACEBOOK_CLIENT_ID,
        clientSecret: env.FACEBOOK_CLIENT_SECRET,
        callbackURL: `${getAppUrl()}/api/v1/auth/facebook/callback`,
        profileFields: ["id", "emails", "name", "picture.type(large)"],
      },
    },
    {
      name: "twitter",
      label: "Twitter",
      Strategy: TwitterStrategy,
      enabled: false,
      config: {
        consumerKey: env.TWITTER_CONSUMER_KEY,
        consumerSecret: env.TWITTER_CONSUMER_SECRET,
        callbackURL: `${getAppUrl()}/api/v1/auth/twitter/callback`,
        includeEmail: true,
      },
    },
    {
      name: "linkedin",
      label: "LinkedIn",
      Strategy: LinkedInStrategy,
      enabled: false,
      config: {
        clientID: env.LINKEDIN_CLIENT_ID,
        clientSecret: env.LINKEDIN_CLIENT_SECRET,
        callbackURL: `${getAppUrl()}/api/v1/auth/linkedin/callback`,
        scope: ["r_emailaddress", "r_liteprofile"],
      },
    },
    {
      name: "instagram",
      label: "Instagram",
      Strategy: InstagramStrategy,
      enabled: false,
      config: {
        clientID: env.INSTAGRAM_CLIENT_ID,
        clientSecret: env.INSTAGRAM_CLIENT_SECRET,
        callbackURL: `${getAppUrl()}/api/v1/auth/instagram/callback`,
      },
    },
  ];

