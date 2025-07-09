import { AccountProviders } from "./enums";

export type User = {
  _id: string;
  username: string;
  email: string;
  provider: AccountProviders; 
  emailVerified: boolean;
  hasPassword: boolean;
  createdAt: string;
  updatedAt: string;
}