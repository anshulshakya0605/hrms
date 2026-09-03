export const ERROR_MESSAGES = {
  GENERIC: "Something went wrong. Please try again.",
  NETWORK: "Unable to connect to the server.",
  UNAUTHORIZED: "Your session has expired. Please login again.",
  FORBIDDEN: "You do not have permission to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION: "Please check the entered information.",
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN: "Login successful.",
  LOGOUT: "Logout successful.",
  PASSWORD_CHANGED: "Password changed successfully.",
  PASSWORD_RESET: "Password reset successfully.",
} as const;