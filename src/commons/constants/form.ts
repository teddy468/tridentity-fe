export enum SIGNUP_STEPS {
  REGISTER,
  CUSTOM_PROFILE,
  VERIFY,
  SUCCESS,
}

export const isSubmitButtonReady = (isValid: boolean) => {
  return !isValid
}