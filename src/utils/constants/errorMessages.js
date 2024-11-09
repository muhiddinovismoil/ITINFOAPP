// utils/constants/errorMessages.js

export const errorMessages = {
  // General error messages
  INTERNAL_SERVER_ERROR: "An internal server error occurred",
  NOT_FOUND: "Resource not found",
  UNAUTHORIZED: "Authentication is required",
  FORBIDDEN: "You do not have permission to perform this action",

  // User-related errors
  USER_NOT_FOUND: "User not found",
  INVALID_USER_DATA: "Invalid user data provided",
  EMAIL_ALREADY_EXISTS: "This email is already registered",

  // Authentication errors
  INVALID_CREDENTIALS: "Invalid email or password",
  TOKEN_EXPIRED: "Token has expired",
  TOKEN_INVALID: "Invalid token",

  // Article-related errors
  ARTICLE_NOT_FOUND: "Article not found",
  INVALID_ARTICLE_DATA: "Invalid article data provided",

  // Category-related errors
  CATEGORY_NOT_FOUND: "Category not found",
  INVALID_CATEGORY_DATA: "Invalid category data provided",

  // Author-related errors
  AUTHOR_NOT_FOUND: "Author not found",
  INVALID_AUTHOR_DATA: "Invalid author data provided",

  // Permission errors
  ACCESS_DENIED: "Access denied",

  // Validation errors
  VALIDATION_ERROR: "Validation error occurred",
};
