import { BaseApiResponse } from './base.types';
import { User } from './user.types';

export interface LoginInput {
  identifier: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterInput {
  firstName: string;
  lastName?: string;
  username?: string;
  email: string;
  password: string;
  phone?: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  email: string;
  tokenOrOtp: string;
  newPassword: string;
}

export interface VerifyEmailOtpInput {
  email: string;
  otp: string;
}

export interface SendEmailOtpInput {
  email: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  expiresIn?: number;
}

export interface RequiresVerification {
  email: boolean;
  phone?: boolean;
}

export interface AuthResponseData {
  user: User;
  tokens?: AuthTokens;
  requiresVerification?: RequiresVerification;
  otp?: string;
}

export type LoginResponse = BaseApiResponse<AuthResponseData>;
export type RegisterResponse = BaseApiResponse<AuthResponseData>;
export type VerifyOtpResponse = BaseApiResponse<{ user: User }>;
export type ForgotPasswordResponse = BaseApiResponse<{ message: string; otp?: string }>;
export type ResetPasswordResponse = BaseApiResponse<unknown>;
