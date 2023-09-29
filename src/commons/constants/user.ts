export enum MODES {
  ADMIN = 1,
  MERCHANT = 2,
  USER = 3,
}

export enum MODE_NAMES {
  ADMIN = "ADMIN",
  MERCHANT = "MERCHANT",
  USER = "USER",
}

export enum GENDERS {
  NOT_SET = 0,
  MALE = 1,
  FEMALE = 2,
  OTHER = 3,
}

export const GENDER_OPTIONS = [
  { value: GENDERS.NOT_SET, label: "-" },
  { value: GENDERS.MALE, label: "Male" },
  { value: GENDERS.FEMALE, label: "Female" },
  { value: GENDERS.OTHER, label: "Other" },
];

export enum MembershipTypes {
  BRONZE = "Bronze",
  SILVER = "Silver",
  GOLD = "Gold",
  DIAMOND = "Diamond",
}

export const POSTAL_CODE_PATTERN = /^\d{0,8}$/;

export const USER_INFO = {
  NAME: "name",
  AVATAR: "avatar",
};
