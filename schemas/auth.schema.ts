import { z } from 'zod';

/**
 * Login Form Validation Schema
 */
export const loginFormSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, 'Email, username, or phone number is required'),
  password: z
    .string()
    .min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const loginSchema = loginFormSchema;
export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type LoginInput = z.infer<typeof loginFormSchema>;

/**
 * Register Form Validation Schema
 */
export const registerFormSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, 'First name is required'),
    lastName: z
      .string()
      .trim()
      .optional()
      .or(z.literal('')),
    username: z
      .string()
      .trim()
      .min(3, 'Username must be at least 3 characters')
      .regex(
        /^[a-zA-Z0-9_.-]+$/,
        'Username can only contain letters, numbers, dots, and underscores',
      )
      .optional()
      .or(z.literal('')),
    email: z
      .string()
      .trim()
      .min(1, 'Email address is required')
      .email('Invalid email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
    phone: z
      .string()
      .trim()
      .optional()
      .or(z.literal('')),
    terms: z
      .boolean()
      .refine((val) => val === true, {
        message: 'You must agree to the Terms of Service and Privacy Policy',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const registerSchema = registerFormSchema;
export type RegisterFormValues = z.infer<typeof registerFormSchema>;

/**
 * Forgot Password Validation Schema
 */
export const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required')
    .email('Invalid email address'),
});

export const forgotPasswordSchema = forgotPasswordFormSchema;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;

/**
 * Reset Password Validation Schema
 */
export const resetPasswordFormSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, 'Email address is required')
      .email('Invalid email address'),
    tokenOrOtp: z
      .string()
      .trim()
      .min(1, 'Reset code or token is required'),
    newPassword: z
      .string()
      .min(6, 'New password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const resetPasswordSchema = resetPasswordFormSchema;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

/**
 * Verify Email OTP Validation Schema
 */
export const verifyEmailOtpFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required')
    .email('Invalid email address'),
  otp: z
    .string()
    .trim()
    .length(6, 'OTP code must be exactly 6 digits')
    .regex(/^[0-9]+$/, 'OTP code must contain only numbers'),
});

export const verifyEmailOtpSchema = verifyEmailOtpFormSchema;
export type VerifyEmailOtpFormValues = z.infer<typeof verifyEmailOtpFormSchema>;

/**
 * Change Password Validation Schema
 */
export const changePasswordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(6, 'New password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const changePasswordSchema = changePasswordFormSchema;
export type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;
