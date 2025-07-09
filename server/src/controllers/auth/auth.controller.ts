import { registerService } from "@/services/auth/auth.service";
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

  console.log(req.body)

  try {
    await registerService(username, email, password);

    res.status(200).json({
      status: true,
      message: "User successfully created",
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

export const sendOtp = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    next(err);
  }
};

export const validateOtp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { otp } = req.body;

  try {
  } catch (err) {
    next(err);
  }
};
