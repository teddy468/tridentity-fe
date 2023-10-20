import {
  HidePasswordIcon,
  PasswordLoginIcon,
  UsernameLoginIcon,
} from "@/assets/icons";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import {
  ContinueWithGGButton,
  ForgotPasswordText,
  GoogleGradientLogo,
  LoginButton,
  LoginDivider,
  LoginEmailWrapper,
  LoginHeaderTilte,
  LoginTextField,
  PasswordField,
  TextGradient,
} from "./styles";

interface IEmailSectionProps {
  email: string;
  password: string;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickLogin: () => void;
}

const EmailSection: React.FC<IEmailSectionProps> = (
  props: IEmailSectionProps
) => {
  const { email, password, onChangeEmail, onChangePassword, onClickLogin } =
    props;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((state) => !state);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <LoginEmailWrapper>
      <LoginHeaderTilte>Login</LoginHeaderTilte>
      <LoginTextField
        id="email-username"
        className="mb-38"
        placeholder="Email/Username"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <UsernameLoginIcon />
            </InputAdornment>
          ),
        }}
        value={email}
        onChange={onChangeEmail}
      />
      <PasswordField
        id="password"
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordLoginIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                <HidePasswordIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        value={password}
        onChange={onChangePassword}
      />
      <ForgotPasswordText>Forgot password?</ForgotPasswordText>
      <LoginButton onClick={onClickLogin}>Login</LoginButton>
      <LoginDivider>Or</LoginDivider>
      <ContinueWithGGButton>
        <GoogleGradientLogo />
        <TextGradient>Continue with Google</TextGradient>
      </ContinueWithGGButton>
    </LoginEmailWrapper>
  );
};

export default EmailSection;
