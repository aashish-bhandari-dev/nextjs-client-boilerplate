import {
  AuthResponseData,
  ForgotPasswordInput,
  ForgotPasswordResponse,
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
  ResetPasswordInput,
  ResetPasswordResponse,
  VerifyEmailOtpInput,
  VerifyOtpResponse,
} from "@/types/auth.types";
import { BaseApiResponse } from "@/types/base.types";
import { User } from "@/types/user.types";
import { serverApi } from "@/lib/api/server-api";
import { handleApiError } from "@/lib/utils";

class AuthRepo {
  /**
   * Log in user using identifier (email, username, or phone) and password.
   */
  async login({
    credentials,
    onSuccess,
    onError,
  }: {
    credentials: LoginInput;
    onSuccess: (data: AuthResponseData) => void;
    onError: (message: string) => void;
  }): Promise<AuthResponseData | undefined> {
    try {
      const response = await serverApi.post<LoginResponse | AuthResponseData>(
        "/auth/login",
        {
          identifier: credentials.identifier,
          password: credentials.password,
        }
      );

      const authData: AuthResponseData = (
        response as BaseApiResponse<AuthResponseData>
      )?.data?.user
        ? (response as BaseApiResponse<AuthResponseData>).data
        : (response as AuthResponseData);

      if (!authData?.user) {
        throw new Error(
          "Invalid authentication response structure received from server."
        );
      }

      onSuccess(authData);
      return authData;
    } catch (error) {
      const message = handleApiError(
        error,
        "Login failed. Please check your credentials."
      );
      onError(message);
      return undefined;
    }
  }

  /**
   * Register a new user account.
   */
  async register({
    data,
    onSuccess,
    onError,
  }: {
    data: RegisterInput;
    onSuccess: (data: AuthResponseData) => void;
    onError: (message: string) => void;
  }): Promise<AuthResponseData | undefined> {
    try {
      const payload: Record<string, unknown> = {
        firstName: data.firstName.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
      };

      if (data.lastName && data.lastName.trim()) {
        payload.lastName = data.lastName.trim();
      }
      if (data.username && data.username.trim()) {
        payload.username = data.username.trim();
      }
      if (data.phone && data.phone.trim()) {
        payload.phone = data.phone.trim();
      }

      const response = await serverApi.post<
        RegisterResponse | AuthResponseData
      >("/auth/register", payload);

      const authData: AuthResponseData = (
        response as BaseApiResponse<AuthResponseData>
      )?.data?.user
        ? (response as BaseApiResponse<AuthResponseData>).data
        : (response as AuthResponseData);

      if (!authData?.user) {
        throw new Error(
          "Invalid registration response structure received from server."
        );
      }

      onSuccess(authData);
      return authData;
    } catch (error) {
      const message = handleApiError(
        error,
        "Registration failed. Please check your details."
      );
      onError(message);
      return undefined;
    }
  }

  /**
   * Send password reset OTP or link to user's email.
   */
  async forgotPassword({
    data,
    onSuccess,
    onError,
  }: {
    data: ForgotPasswordInput;
    onSuccess: (message: string, otp?: string) => void;
    onError: (message: string) => void;
  }): Promise<boolean> {
    try {
      const response = await serverApi.post<ForgotPasswordResponse>(
        "/auth/forgot-password",
        {
          email: data.email.trim().toLowerCase(),
        }
      );

      const msg =
        response?.message ||
        "Password reset instructions have been sent to your email.";
      const otp = response?.data?.otp;
      onSuccess(msg, otp);
      return true;
    } catch (error) {
      const message = handleApiError(
        error,
        "Failed to process forgot password request."
      );
      onError(message);
      return false;
    }
  }

  /**
   * Reset user password using token or OTP.
   */
  async resetPassword({
    data,
    onSuccess,
    onError,
  }: {
    data: ResetPasswordInput;
    onSuccess: (message: string) => void;
    onError: (message: string) => void;
  }): Promise<boolean> {
    try {
      const response = await serverApi.post<ResetPasswordResponse>(
        "/auth/reset-password",
        {
          email: data.email.trim().toLowerCase(),
          tokenOrOtp: data.tokenOrOtp.trim(),
          newPassword: data.newPassword,
        }
      );

      const msg =
        response?.message ||
        "Password reset successfully. You can now log in with your new password.";
      onSuccess(msg);
      return true;
    } catch (error) {
      const message = handleApiError(
        error,
        "Failed to reset password. Please verify your OTP code or token."
      );
      onError(message);
      return false;
    }
  }

  /**
   * Verify email address using the 6-digit numeric OTP code.
   */
  async verifyEmailOtp({
    data,
    onSuccess,
    onError,
  }: {
    data: VerifyEmailOtpInput;
    onSuccess: (user: User) => void;
    onError: (message: string) => void;
  }): Promise<User | undefined> {
    try {
      const response = await serverApi.post<VerifyOtpResponse>(
        "/auth/verify-email-otp",
        {
          email: data.email.trim().toLowerCase(),
          otp: data.otp.trim(),
        }
      );

      const verifiedUser =
        response?.data?.user || (response as unknown as { user: User })?.user;

      if (!verifiedUser) {
        throw new Error("Failed to retrieve verified user details.");
      }

      onSuccess(verifiedUser);
      return verifiedUser;
    } catch (error) {
      const message = handleApiError(
        error,
        "Failed to verify email OTP. Please check the code."
      );
      onError(message);
      return undefined;
    }
  }

  /**
   * Resend verification OTP code to user's email.
   */
  async resendVerificationOtp({
    email,
    onSuccess,
    onError,
  }: {
    email: string;
    onSuccess: (message: string, otp?: string) => void;
    onError: (message: string) => void;
  }): Promise<boolean> {
    try {
      const response = await serverApi.post<
        BaseApiResponse<{ message: string; otp?: string }>
      >("/auth/send-email-otp", {
        email: email.trim().toLowerCase(),
      });

      const msg =
        response?.message ||
        "Verification OTP code sent to your email address.";
      const otp = response?.data?.otp;
      onSuccess(msg, otp);
      return true;
    } catch (error) {
      const message = handleApiError(
        error,
        "Failed to resend verification OTP."
      );
      onError(message);
      return false;
    }
  }

  /**
   * Fetch current authenticated user's profile.
   */
  async getMe({
    onSuccess,
    onError,
  }: {
    onSuccess: (user: User) => void;
    onError?: (message: string) => void;
  }): Promise<User | undefined> {
    try {
      const response = await serverApi.get<BaseApiResponse<User> | User>(
        "/auth/me"
      );
      const user = (response as BaseApiResponse<User>)?.data?.id
        ? (response as BaseApiResponse<User>).data
        : (response as User);

      if (!user?.id) {
        throw new Error("Invalid user profile response.");
      }

      onSuccess(user);
      return user;
    } catch (error) {
      const message = handleApiError(error, "Failed to load user profile.");
      onError?.(message);
      return undefined;
    }
  }

  /**
   * Invalidate session on server.
   */
  async logout({
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void;
    onError?: (message: string) => void;
  } = {}): Promise<void> {
    try {
      await serverApi.post("/auth/logout");
      onSuccess?.();
    } catch (error) {
      const message = handleApiError(error, "Logout error");
      onError?.(message);
    }
  }
}

export const authRepo = new AuthRepo();
export { AuthRepo };
export default authRepo;
