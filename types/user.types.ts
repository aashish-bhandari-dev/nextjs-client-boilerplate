import { BaseApiResponse, BasePaginatedResponse } from "./base.types";

export interface User {
  id: string;
  firstName: string;
  lastName?: string | null;
  fullName: string;
  username?: string | null;
  email: string;
  phone?: string | null;
  image?: string | null;
  bio?: string | null;
  gender?: string | null;
  dateOfBirth?: Date | string | null;
  locale?: string;
  timezone?: string;
  role: string;
  roleId?: string;
  hasCustomPermissions?: boolean;
  isActive: boolean;
  isDeactivated: boolean;
  isEmailVerified: boolean;
  emailVerifiedAt?: Date | string | null;
  isPhoneVerified: boolean;
  phoneVerifiedAt?: Date | string | null;
  provider: string;
  providerId?: string | null;
  permissions?: string[];
  lastLoginAt?: Date | string | null;
  metadata?: Record<string, unknown>;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface CreateUserInput {
  firstName: string;
  lastName?: string | null;
  username?: string | null;
  email: string;
  password?: string;
  phone?: string | null;
  role?: string;
  image?: string | null;
  bio?: string | null;
  gender?: string | null;
  locale?: string;
  timezone?: string;
}

export interface UpdateUserInput extends Partial<CreateUserInput> {
  id?: string;
}

export type GetUserResponse = BaseApiResponse<User>;
export type GetPaginatedUserResponse = BasePaginatedResponse<User>;
