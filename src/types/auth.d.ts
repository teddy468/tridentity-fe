type CodeResponse = import("@react-oauth/google").CodeResponse;
declare interface RegisterBody {
  username: string;
  email: string;
  password: string;
  terms: boolean;
}

declare interface RegisterResponse {
  user: UserInfo;
}

declare interface RegisterError extends ResponseError {}

declare interface LoginBody {
  username: string;
  password: string;
}

declare interface RegisterValues extends RegisterBody {
  confirmPassword: string;
}

declare interface ProfileBody {
  fullName: string;
  avatar: string;
}
declare interface LoginResponse {
  email: string;
  access_token: string;
  refresh_token: string;
  user: UserInfo;
}

declare interface UseLoginGoogleResponse extends Omit<CodeResponse, "error" | "error_description" | "error_uri"> {}

declare interface LoginGoogleResponse {
  access_token: string;
  refresh_token: string;
  user: UserInfo;
}
declare interface LoginError extends ResponseError {
  error: { error: string; message: string; user?: UserInfo };
}

declare interface LoginGoogleError extends LoginError {
  message: string;
}

declare interface LogoutBody {
  refresh_token: string;
}

declare interface LogoutResponse {}

declare interface LogoutError {}

declare interface RefreshTokenBody {
  refresh_token: string;
}

declare interface RefreshTokenResponse {
  success: boolean;
  access_token: string;
}

declare interface RefreshTokenError {}

declare interface VerifyEmailResponse extends UserInfo {
  roles: Role[];
}

declare interface VerifyEmailError extends ResponseError {}

declare interface UpdateUserBasicBody {
  full_name: string;
  avatar: string;
  password: string;
}

declare interface UpdatePasswordValues {
  currentPassword: string;
  confirmPassword: string;
  newPassword: string;
}

declare interface UpdatePasswordBody {
  newPassword: string;
}
declare interface UpdatePasswordError extends ResponseError {}

declare interface UpdateUserBasicValues extends Omit<UpdateUserBasicBody, "avatar"> {
  avatar: FileList;
}

declare interface UpdateUserBasicResponse extends UserInfo {}

declare interface UpdateUserBasicError extends ResponseError {}

declare interface UpdatePasswordError extends ResponseError {}

declare interface putUpdatePreferencesError extends ResponseError {}

declare interface ResetPasswordBody {
  token: string;
  newPassword: string;
}
