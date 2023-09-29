export const UNKNOWN = "Something is wrong. Please try again later!";

export enum EMAIL {
  REQUIRED = "Email address is required",
  EXISTS = "Email address is exists",
  NOT_EXISTS = "Email address is not exists",
  FORMAT = "Email address is incorrect format",
}

export enum USERNAME {
  REQUIRED = "Username is required",
  EXISTS = "Username is exists",
  NOT_EXISTS = "Username is not exists",
  FORMAT = "Username must be between 6 to 20 characters",
}

export enum FULL_NAME {
  REQUIRED = "Full name is required",
}
export enum PHONE {
  REQUIRED = "Phone number is required",
  INCORRECT = "Phone number is incorrect",
  FORMAT = "Phone number must be 8 digits",
  SUCCESS = "Update phone number successfully",
}

export enum PASSWORD {
  REQUIRED = "Password is required",
  INCORRECT = "Password is incorrect",
  FORMAT = "Password must be between 6 to 20 characters",
  SUCCESS = "Update password successfully",
}

export enum CONFIRM_PASSWORD {
  REQUIRED = "Re-enter password is required",
  INCORRECT = "Re-enter password is incorrect",
  FORMAT = "Re-enter password must be between 6 to 20 characters",
  SUCCESS = "Update password successfully",
  DUPLICATE = "New password must be different from old!",
}

export enum FIRST_NAME {
  REQUIRED = "First name is required",
  EXISTS = "First name is exists",
  FORMAT = "First name is incorrect format",
}

export enum LAST_NAME {
  REQUIRED = "Last name is required",
  EXISTS = "Last name is exists",
  FORMAT = "Last name is incorrect format",
}

export enum LOGIN {
  SUCCESS = "Login success",
  FAILED = "Email or password is incorrect",
  DEACTIVE = "Your account is not active",
}

export enum REGISTER {
  SUCCESS = "Sign up success",
  FAILED = "Sign up failed",
}

export enum TERMS {
  REQUIRED = "Please accept terms and conditions",
}

export enum MOBILE {
  REQUIRED = "Mobile number is required",
  EXISTS = "Mobile number is exists",
  NOT_EXISTS = "Mobile number is not exists",
  FORMAT = "Mobile number is incorrect format",
}

export enum ADDRESS {
  REQUIRED = "Address is required",
  EXISTS = "Address is exists",
  NOT_EXISTS = "Address is not exists",
  FORMAT = "Address is incorrect format",
  INVALID = "Address is invalid",
}

export enum ADDRESS_NAME {
  REQUIRED = "Address name is required",
}

export enum LANDMARK {
  REQUIRED = "Address details is required",
}

export enum DISTRICT {
  REQUIRED = "District is required",
}

export enum PROVINCE {
  REQUIRED = "Province is required",
}

export enum POSTAL_CODE {
  REQUIRED = "Postal code is required",
  FORMAT = "Postal code format not valid",
}

export enum WARD {
  REQUIRED = "Ward code is required",
}

export enum COUNTRY {
  REQUIRED = "Country is required",
}

export enum CARD_NUMBER {
  REQUIRED = "Card number is required",
}

export enum EXPIRE_DATE {
  REQUIRED = "Expire date is required",
  ERROR_FORMAT = "Format not valid (must use MM/YYYY)",
  MUST_AFTER_NOW = "Expiry must be after the present",
}

export enum HOLDER_NAME {
  REQUIRED = "Card holder is required",
}

export enum CVV {
  REQUIRED = "CVV/CVC is required",
  ERROR_FORMAT = "Format not valid (must use 3 digits)",
}

export enum CURRENT_PASSWORD {
  REQUIRED = "Current password is required",
}

export enum IMAGE {
  NOT_EXCEED_2MB = "Image cannot exceed 2MB",
  NOT_ALLOW_TYPE_FILE = "Users can not upload the type file other than svg, png, jpg",
}
