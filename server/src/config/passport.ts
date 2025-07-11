import passport from "passport";

import { strategies } from "@/constants/authProviders";
import { AccountProviders } from "@shared/types/enums";
import { CreateOAuthUser } from "@/repositories/auth/auth.repository";
import { findByEmail, findById } from "@/repositories/user/user.repository";

strategies.forEach(({ Strategy, config, label }) => {
  passport.use(
    new Strategy(config, async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const username = profile.displayName || profile.username || email || "unknown-user";

        if (!email) return done(null, false, { message: "No email provided" });

        let user = await findByEmail(email);

        if (!user) {
          user = await CreateOAuthUser(username, email, label as AccountProviders);
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
    const user = await findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
