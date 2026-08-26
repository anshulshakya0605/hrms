export const SUCCESS_MESSAGES = {
  SERVER_RUNNING: "Server is running",
  HEALTH_CHECK_SUCCESS: "HRMS API is running",

  USER_REGISTERED_SUCCESSFULLY: "User registered successfully",
  LOGIN_SUCCESSFUL: "Login successful",
  LOGOUT_SUCCESSFUL: "Logout successful",
  USER_FETCHED_SUCCESSFULLY: "User fetched successfully",
} as const;

export const ERROR_MESSAGES = {
  VALIDATION_ERROR: "Validation failed",

  UNAUTHORIZED: "Authentication is required",
  INVALID_CREDENTIALS: "Invalid email or password",
  INVALID_TOKEN: "Invalid authentication token",
  TOKEN_EXPIRED: "Authentication token has expired",
  TOKEN_NOT_FOUND: "Authentication token not found",

  FORBIDDEN: "You do not have permission to perform this action",

  RESOURCE_NOT_FOUND: "Resource not found",
  USER_NOT_FOUND: "User Not Found",

  DUPLICATE_RESOURCE: "Resource already exists",
  EMAIL_ALREADY_EXISTS: "An account with this email already exists",

  INVALID_OBJECT_ID: "Invalid resource ID",

  RATE_LIMIT_EXCEEDED: "Too many requests. Please try again later.",

  INTERNAL_SERVER_ERROR: "Something went wrong",
} as const;