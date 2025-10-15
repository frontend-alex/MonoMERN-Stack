import { env } from "@/config/env";
import { DecodedUser } from "@/api/middlewares/auth";
import { NextFunction, Request, Response } from "express";
import { strategies } from "@/shared/constants/authProviders";
import { AuthService } from "@/core/services/auth/auth.service";

const providers = (_req: Request, res: Response, next: NextFunction) => {
  try {
    const publicProviders = strategies
      .filter((s) => s.enabled)
      .map(({ name, label }) => ({
        name,
        label,
      }));

    res.status(201).json({
      success: true,
      message: "Providers successfully fetched",
      data: {
        publicProviders,
      },
    });
  } catch (err) {
    next(err);
  }
};

const handleAuthCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await AuthService.handleAuthCallback(req.user as DecodedUser);

    const redirectUrl = Array.isArray(env.CORS_ORIGINS)
      ? env.CORS_ORIGINS[0]
      : env.CORS_ORIGINS;

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(201).redirect(`${redirectUrl}/auth/callback?token=${token}`);
  } catch (err) {
    next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const token = await AuthService.login(email, password);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(201).json({
      success: true,
      message: "Successfully logged in",
    });
  } catch (err) {
    next(err);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, username } = req.body;

  try {
    await AuthService.register(username, email, password);

    res.status(201).json({
      success: true,
      message: "Registration successfully made",
      data: {
        email,
      },
    });
  } catch (err) {
    next(err);
  }
};

const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, newPassword } = req.body;

  const userId = req.user?.id!;

  try {
    await AuthService.updatePassword(userId, password, newPassword);

    res.status(201).json({
      success: true,
      message: "Password successfully changed",
    });
  } catch (err) {
    next(err);
  }
};

const sendOtp = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  try {
    await AuthService.sendOtp(email);

    res.status(201).json({
      success: true,
      message: `Otp was successfully sent to ${email}`,
    });
  } catch (err) {
    next(err);
  }
};

const validateOtp = async (req: Request, res: Response, next: NextFunction) => {
  const { email, pin } = req.body;

  try {
    await AuthService.validateOtp(email, pin);

    res.status(200).json({
      success: true,
      message: "Account successfully verfied",
    });
  } catch (err) {
    next(err);
  }
};

const sendPasswordEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const { token } = await AuthService.sendPasswordEmail(email);

    res.cookie("reset_token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(201).json({
      success: true,
      message: `Email was successfully sent to you`,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id!;
  const { newPassword } = req.body;
  try {
    await AuthService.resetPassword(userId, newPassword);

    res.clearCookie("reset_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    res.status(201).json({
      success: true,
      message: "Password Successfully changed",
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (_req: Request, res: Response, _next: NextFunction) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  res.status(200).json({
    success: true,
    message: "Successfully logged out",
  });
};

export const AuthController = {
  login,
  logout,
  sendOtp,
  register,
  providers,
  validateOtp,
  resetPassword,
  updatePassword,
  sendPasswordEmail,
  handleAuthCallback,
};
