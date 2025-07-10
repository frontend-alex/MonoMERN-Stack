import passport from "passport";

import { strategies } from "@/constants/authStrategies";
import { AccountProviders } from "@shared/types/enums";
import { CreateOAuthUser } from "@/repositories/auth/auth.repository";
import { findByEmail, findById } from "@/repositories/user/user.repository";

strategies.forEach(({ name, Strategy, config }) => {
  passport.use(
    new Strategy(config, async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const username = profile.displayName || profile.username || email || "unknown-user";

        if (!email) return done(null, false, { message: "No email provided" });

        let user = await findByEmail(email);

        if (!user) {
          user = await CreateOAuthUser(username, email, name as keyof typeof AccountProviders);
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    })
  );
});

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
