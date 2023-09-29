import { MembershipTypes } from "../constants/user";

export const getMembershipType = (level: number) => {
  switch (level) {
    case 0:
      return MembershipTypes.BRONZE;
    case 1:
      return MembershipTypes.SILVER;
    case 2:
      return MembershipTypes.GOLD;
    case 3:
      return MembershipTypes.DIAMOND;
    default:
      return MembershipTypes.BRONZE;
  }
};
export const getMembershipColor = (level: number) => {
  switch (level) {
    case 0:
      return "linear-gradient(101.4deg, #AE5F25 0%, #F7BE8A 40.14%, #D28A47 76.9%, #EDA767 100.35%)";
    case 1:
      return "linear-gradient(101.4deg, #AEAEAE 0%, #F5F5F5 40.14%, #D0D0D0 76.9%, #E9E9E9 100.35%)";
    case 2:
      return "linear-gradient(101.4deg, #AE8625 0%, #F7EF8A 40.14%, #D2AC47 76.9%, #EDC967 100.35%)";
    case 3:
      return "linear-gradient(101.4deg, #B6DAEE 0%, #F3F8FB 40.14%, #9CC3E7 76.9%, #70A7D9 100.35%)";
    default:
      return "linear-gradient(101.4deg, #AE8625 0%, #F7EF8A 40.14%, #D2AC47 76.9%, #EDC967 100.35%)";
  }
}
