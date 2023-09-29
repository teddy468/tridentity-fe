export const getPhoneFromPrefix = (prefix: string, phoneNumber: string) => {
  if (phoneNumber.startsWith("0")) {
    phoneNumber = phoneNumber.substr(1);
  }
  return prefix + phoneNumber;
};
