import bcrypt from 'bcrypt';

import mongoose, { Schema, Document } from "mongoose";
import { AccountProviders } from "@shared/types/enums";

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string | null;
  provider: keyof typeof AccountProviders;
  hasPassword: boolean;
  emailVerified: boolean;
  imageUrl?: string;
  otp?: string;
  otpExpiry?: number;
  createdAt: Date;
  updatedAt: Date;

  matchPassword(entered: string): Promise<boolean>;
  isOtpExpired(): boolean;
  isResetTokenExpired(): boolean;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    provider: {
      type: String,
      enum: AccountProviders,
      default: AccountProviders.Credentials,
    },
    password: {
      type: String,
      required: false,
    },
    otp: String,
    otpExpiry: Number,
    emailVerified: {
      type: Boolean,
      default: false,
    },
    hasPassword: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
    this.hasPassword = true;
  }
  next();
});

userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.isResetTokenExpired = function (): boolean {
  return !!(this.resetTokenExpires && Date.now() > this.resetTokenExpires);
};

userSchema.methods.isOtpExpired = function (): boolean {
  return !!(this.otpExpiry && Date.now() > this.otpExpiry);
};

const User = mongoose.model<IUser>("User", userSchema);

export { User };
