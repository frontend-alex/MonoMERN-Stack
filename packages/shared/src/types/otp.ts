export interface IOtp {
  id: string;
  userId: string;
  code: string;
  type: OtpType;
  expiresAt: Date;
  isUsed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum OtpType {
  EmailVerification = 'email_verification',
  PasswordReset = 'password_reset',
  Login = 'login',
}
