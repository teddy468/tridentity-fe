import {
  EmailSignupIcon,
  HidePasswordIcon,
  PasswordLoginIcon,
  UsernameLoginIcon,
} from "@/assets/icons";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import {
  CheckboxAgreeLogo,
  LoginButton,
  LoginHeaderTilte,
  LoginTextField,
  PasswordField,
  SignupWrapper,
  TextAgree,
  TextGradient,
  UncheckboxAgreeLogo,
} from "./styles";

interface ISignupSectionProps {
  email: string;
  username: string;
  password: string;
  reEnterPassword: string;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassord: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeReEnterPassord: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSignup: () => void;
  onClickChangeWallet: () => void;
}

const SignupSection: React.FC<ISignupSectionProps> = (
  props: ISignupSectionProps
) => {
  const {
    email,
    username,
    password,
    reEnterPassword,
    onChangeEmail,
    onChangeUsername,
    onChangePassord,
    onChangeReEnterPassord,
    onClickSignup,
    onClickChangeWallet,
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordReEnter, setShowPasswordReEnter] =
    useState<boolean>(false);
  const [isAgree, setIsAgree] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((state) => !state);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowPasswordReEnter = () =>
    setShowPasswordReEnter((state) => !state);

  const handleMouseDownPasswordReEnter = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <SignupWrapper>
      <LoginHeaderTilte>Sign up</LoginHeaderTilte>
      <LoginTextField
        id="email"
        className="mb-30"
        placeholder="Email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailSignupIcon />
            </InputAdornment>
          ),
        }}
        value={email}
        onChange={onChangeEmail}
      />
      <LoginTextField
        id="username"
        className="mb-30"
        placeholder="Username"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <UsernameLoginIcon />
            </InputAdornment>
          ),
        }}
        value={username}
        onChange={onChangeUsername}
      />
      <PasswordField
        id="password"
        className="mb-30"
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
        onChange={onChangePassord}
      />
      <PasswordField
        id="password"
        className="mb-16"
        placeholder="Re-enter Password"
        type={showPasswordReEnter ? "text" : "password"}
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
                onClick={handleClickShowPasswordReEnter}
                onMouseDown={handleMouseDownPasswordReEnter}
              >
                <HidePasswordIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        value={reEnterPassword}
        onChange={onChangeReEnterPassord}
      />
      <TextAgree>
        {isAgree ? (
          <CheckboxAgreeLogo onClick={() => setIsAgree(false)} />
        ) : (
          <UncheckboxAgreeLogo onClick={() => setIsAgree(true)} />
        )}
        I agree to the&nbsp;<b>Terms and Conditions of Tridentity</b>
      </TextAgree>
      <LoginButton onClick={onClickSignup}>Sign up</LoginButton>
      <TextGradient
        className="text-change-wallet"
        onClick={onClickChangeWallet}
      >
        Or Change Wallet
      </TextGradient>
    </SignupWrapper>
  );
};

export default SignupSection;
