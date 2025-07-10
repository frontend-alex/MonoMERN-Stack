import { registerService, sendOtpService, validateOtpService } from "@/services/auth/auth.service";
import { NextFunction, Request, Response } from "express";

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
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
        email
      }
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
      message: "Account successfully verfied"
    })

  } catch (err) {
    next(err);
  }
};
