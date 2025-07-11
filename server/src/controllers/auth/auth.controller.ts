import { env } from "@/config/env";
import { strategies } from "@/constants/authProviders";
import { NextFunction, Request, Response } from "express";
import {
  registerService,
  sendOtpService,
  validateOtpService,
  loginService,
  handleAuthCallbackService,
} from "@/services/auth/auth.service";
import { DecodedUser } from "@/middlewares/auth";

export const providers = (_req: Request, res: Response, next: NextFunction) => {
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

export const handleAuthCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await handleAuthCallbackService(req.user as DecodedUser);

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

    // res.status(201).json({
    //   success: true,
    //   message: "Successfully logged in",
    // });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const token = await loginService(email, password);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    // res.status(201).json({
    //   success: true,
    //   message: "Successfully logged in",
    // });
  } catch (err) {
    next(err);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, username } = req.body;

  try {
    await registerService(username, email, password);

    res.status(201).json({
      success: true,
      message: "User successfully created",
      data: {
        email,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const sendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    await sendOtpService(email);

    res.status(201).json({
      success: true,
      message: `Otp was successfully sent to ${email}`,
    });
  } catch (err) {
    next(err);
  }
};

export const validateOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, pin } = req.body;

  try {
    await validateOtpService(email, pin);

    res.status(200).json({
      success: true,
      message: "Account successfully verfied",
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
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
