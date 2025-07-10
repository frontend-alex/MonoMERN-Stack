import { findById } from "@/repositories/user/user.repository";
import { NextFunction, Request, Response } from "express";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findById(req.user?.id!);

    res.status(201).json({
      success: true,
      messsage: "Data successfully fetched",
      data: {
        user,
      },
    });
    
  } catch (err) {
    next(err);
  }
};
