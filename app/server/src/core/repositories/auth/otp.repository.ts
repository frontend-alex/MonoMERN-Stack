import { Otp } from "@/core/models/Otp";
import { OtpType } from "@shared/types/otp";
import { generateOTP } from "@/shared/utils/utils";

export const createOtp = async (userId: string, type: OtpType, expiresInMinutes: number = 5) => {
  const code = generateOTP();
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
  
  // Invalidate any existing OTPs of the same type for this user
  await Otp.updateMany(
    { userId, type, isUsed: false },
    { isUsed: true }
  );
  
  const otp = new Otp({
    userId,
    code,
    type,
    expiresAt,
  });
  
  return await otp.save();
};

export const findByCodeAndType = async (code: string, type: OtpType) => {
  return await Otp.findOne({ code, type, isUsed: false });
};

export const findByUserIdAndType = async (userId: string, type: OtpType) => {
  return await Otp.findOne({ userId, type, isUsed: false });
};

export const markAsUsed = async (otpId: string) => {
  return await Otp.findByIdAndDelete(otpId);
};

export const invalidateUserOtps = async (userId: string, type: OtpType) => {
  return await Otp.deleteMany({ userId, type, isUsed: false });
};

export const cleanupExpiredOtps = async () => {
  return await Otp.deleteMany({
    expiresAt: { $lt: new Date() }
  });
};
