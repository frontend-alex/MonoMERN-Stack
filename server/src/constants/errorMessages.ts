export const AUTH_ERRORS = {
  UNAUTHORIZED: {
    errorCode: "AUTH_001",
    statusCode: 401,
    message: "Unauthorized access.",
    userFriendlyMessage: "You must be logged in to perform this action.",
  },
  FORBIDDEN_ACCESS: {
    errorCode: "AUTH_002",
    statusCode: 403,
    message: "Forbidden access.",
    userFriendlyMessage: "You do not have permission to access this resource.",
  },
  INVALID_CREDENTIALS: {
    errorCode: "AUTH_003",
    statusCode: 401,
    message: "Invalid email or password.",
    userFriendlyMessage: "The login information you provided is incorrect.",
  },
  INVALID_CURRENT_PASSWORD: {
    errorCode: "AUTH_004",
    statusCode: 400,
    message: "Current password is incorrect.",
    userFriendlyMessage: "The current password you entered is incorrect.",
  },
  SAME_PASSWORD: {
    errorCode: "AUTH_005",
    statusCode: 400,
    message: "New password cannot be the same as the current password.",
    userFriendlyMessage: "Please choose a different password.",
  },
  EMAIL_ALREADY_TAKEN: {
    errorCode: "AUTH_016",
    statusCode: 400,
    message: "Email is already in use.",
    userFriendlyMessage: "This email is already taken. Please use another.",
  },
  EMAIL_NOT_VERIFIED: {
    errorCode: "AUTH_006",
    statusCode: 403,
    message: "Email has not been verified.",
    userFriendlyMessage: "Please verify your email before continuing.",
  },
  EMAIL_NOT_PROVIDED: {
    errorCode: "AUTH_007",
    statusCode: 400,
    message: "Email is required.",
    userFriendlyMessage: "Please provide your email address.",
  },
  PASSWORD_MISSING: {
    errorCode: "AUTH_008",
    statusCode: 400,
    message: "Password is required.",
    userFriendlyMessage: "Please enter your password.",
  },
  EMAIL_ALREADY_VERIFIED: {
    errorCode: "AUTH_009",
    statusCode: 400,
    message: "Email is already verified.",
    userFriendlyMessage: "Your email is already verified.",
  },

  // New auth errors for registration/login flows:
  REGISTRATION_FAILED: {
    errorCode: "AUTH_010",
    statusCode: 500,
    message: "Failed to register user.",
    userFriendlyMessage: "We couldn’t complete your registration. Please try again.",
  },
  LOGIN_FAILED: {
    errorCode: "AUTH_011",
    statusCode: 401,
    message: "Login failed due to invalid credentials or other issues.",
    userFriendlyMessage: "Login failed. Please check your email and password and try again.",
  },
  USER_ALREADY_EXISTS: {
    errorCode: "AUTH_012",
    statusCode: 400,
    message: "User with this email or username already exists.",
    userFriendlyMessage: "An account with this email or username already exists.",
  },
  USERNAME_ALREADY_TAKEN: {
    errorCode: "AUTH_013", // Changed from USER_002 to AUTH_013 to keep the namespace consistent
    statusCode: 400,
    message: "Username is already in use.",
    userFriendlyMessage: "This username is already taken. Please choose another.",
  },
  PASSWORD_RESET_FAILED: {
    errorCode: "AUTH_014",
    statusCode: 500,
    message: "Failed to reset password.",
    userFriendlyMessage: "We couldn’t reset your password. Please try again later.",
  },
  ACCOUNT_LOCKED: {
    errorCode: "AUTH_015",
    statusCode: 403,
    message: "Account is locked due to multiple failed login attempts.",
    userFriendlyMessage: "Your account has been locked. Please try again later or contact support.",
  },
  EMAIL_NOT_REGISTERED: {
    errorCode: "AUTH_017",
    statusCode: 404,
    message: "Email is not registered.",
    userFriendlyMessage: "We couldn’t find an account with this email address.",
  },
};


export const JWT_ERRORS = {
  INVALID_TOKEN: {
    errorCode: "JWT_001",
    statusCode: 401,
    message: "Invalid or expired token.",
    userFriendlyMessage: "Your session has expired. Please log in again.",
  },
  REFRESH_FAILED: {
    errorCode: "JWT_002",
    statusCode: 403,
    message: "Token refresh failed.",
    userFriendlyMessage: "We couldn't refresh your session. Please log in again.",
  },
  INVALID_ENCRYPTED_TOKEN: {
    errorCode: "JWT_003",
    statusCode: 400,
    message: "Invalid encrypted token.",
    userFriendlyMessage: "Authentication failed. Please try logging in again.",
  },
};

export const OTP_ERRORS = {
  OTP_EXPIRED: {
    errorCode: "OTP_001",
    statusCode: 400,
    message: "OTP has expired.",
    userFriendlyMessage: "Your OTP has expired. Please request a new one.",
  },
  INVALID_OTP: {
    errorCode: "OTP_002",
    statusCode: 400,
    message: "Invalid OTP code.",
    userFriendlyMessage: "The OTP code you entered is invalid.",
  },
};

export const STRIPE_ERRORS = {
  PAYMENT_FAILED: {
    errorCode: "STRIPE_001",
    statusCode: 402,
    message: "Payment processing failed.",
    userFriendlyMessage: "Your payment could not be processed. Please try again.",
  },
  INVOICE_CREATION_FAILED: {
    errorCode: "STRIPE_002",
    statusCode: 500,
    message: "Invoice creation failed.",
    userFriendlyMessage: "We couldn't create your invoice. Please try again.",
  },
  SUBSCRIPTION_CREATION_FAILED: {
    errorCode: "STRIPE_003",
    statusCode: 500,
    message: "Subscription creation failed.",
    userFriendlyMessage: "Failed to create your subscription. Please try again.",
  },
  INVALID_PLAN_ID: {
    errorCode: "STRIPE_004",
    statusCode: 400,
    message: "Invalid Stripe plan ID.",
    userFriendlyMessage: "The selected plan is not valid. Please choose another.",
  },
  CUSTOMER_CREATION_FAILED: {
    errorCode: "STRIPE_005",
    statusCode: 500,
    message: "Stripe customer creation failed.",
    userFriendlyMessage: "We couldn’t create your customer profile. Please try again.",
  },
  SUBSCRIPTION_UPGRADE_REQUIRED: {
    errorCode: "STRIPE_006",
    statusCode: 403,
    message: "Upgrade required for this feature.",
    userFriendlyMessage: "Please upgrade your plan to access this feature.",
  },
};

export const GOOGLE_ERRORS = {
  GOOGLE_AUTH_FAILED: {
    errorCode: "GOOGLE_001",
    statusCode: 401,
    message: "Google authentication failed.",
    userFriendlyMessage:
      "We couldn’t sign you in with Google. Try again or use another method.",
  },
};

export const USER_ERRORS = {
  USER_NOT_FOUND: {
    errorCode: "USER_001",
    statusCode: 404,
    message: "User not found.",
    userFriendlyMessage: "We couldn’t find a user with that information.",
  },
};

export const EMAIL_ERRORS = {
  EMAIL_SENDING_FAILED: {
    errorCode: "EMAIL_001",
    statusCode: 500,
    message: "Failed to send email.",
    userFriendlyMessage: "We couldn’t send the email. Please try again later.",
  },
};

export const DATABASE_ERRORS = {
  DATABASE_ERROR: {
    errorCode: "DB_001",
    statusCode: 500,
    message: "A database error occurred.",
    userFriendlyMessage: "There was a problem accessing the database. Try again later.",
  },
};

export const NOTIFICATION_ERRORS = {
  NOTIFICATION_CREATION_FAILED: {
    errorCode: "NOTIF_001",
    statusCode: 500,
    message: "Failed to create notification.",
    userFriendlyMessage: "We couldn’t create the notification. Please try again.",
  },
};

// Merge everything into one master object
export const ERROR_MESSAGES = {
  ...AUTH_ERRORS,
  ...JWT_ERRORS,
  ...OTP_ERRORS,
  ...STRIPE_ERRORS,
  ...GOOGLE_ERRORS,
  ...USER_ERRORS,
  ...EMAIL_ERRORS,
  ...DATABASE_ERRORS,
  ...NOTIFICATION_ERRORS,
};
