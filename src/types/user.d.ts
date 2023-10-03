declare type MODES = import("../commons/constants/user").MODES;
declare type MODE_NAMES = import("../commons/constants/user").MODE_NAMES;
declare type GENDERS = import("../commons/constants/user").GENDERS;

declare interface Role {
  id: number;
  name: MODE_NAMES;
  status: MODES;
  description: string;
  create_time: string;
  update_time: string;
}

declare interface UserInfo {
  address: string;
  avatar: string;
  email: string;
  first_name: string;
  full_name: string;
  id: string;
  last_name: string;
  phone: string;
  status: number;
  user_oauth_id: string;
  login_for_first_time: boolean;
  username: string;
  date_of_birth: string;
  gender: number;
  preferences: Preferences[];
}

declare interface UserPersonalInformation {
  full_name?: string;
  phone?: string;
  date_of_birth?: string;
  gender?: number;
  otp?: string;
}

interface Preferences {
  id: number;
  name: string;
}

declare interface PaymentCard {
  id: number;
  user_id: string;
  card_no: string;
  exp_date: string;
  payer_name: string;
  card_type: string;
  create_time: string;
  update_time: string;
}

declare interface AddCardBody {
  card_no: string;
  exp_date: string;
  cvv2: string;
  payer_name: string;
}

declare interface AddressItem {
  id: number;
  user_id: number;
  country: string;
  landmark: string;
  address: string;
  postal_code: string;
  is_default: boolean;
  status: number;
  address_type: string;
  coordinate: {
    lat: string;
    lng: string;
  };
}

declare interface AddressDefaultBody {
  id?: number;
  user_id?: number;
  country: string;
  landmark: string;
  address: string;
  postal_code: string;
  is_default: boolean;
  status: number;
  address_type: string;
  coordinate?: {
    lat: string;
    lng: string;
  };
}

declare interface AddressValues extends AddressDefaultBody {
  prefix: string;
}

declare interface CreateUpdateAddressResponse extends AddressItem {
  create_date: string;
  update_date: string;
}

declare interface UserDecode {
  exp: number;
  username: string;
}

declare interface GetUserInfoResponse extends UserInfo {}

declare interface GetUserInfoError {}

declare interface UpdatePasswordResponse {}

declare interface LoyaltyPoint {
  id: number;
  point: number;
  total_point: number;
}

declare interface GetLoyaltyPointResponse extends LoyaltyPoint {}

declare interface GetLoyaltyPointError {}

declare interface LoyaltyPointHistory {
  id: number;
  point: number;
  description: string;
  create_time: string;
  update_time: string;
  user_loyalty_point_id: number;
  balance: number;
  type: TripAppLpHistoryType;
  order_id: string;
  amount: string;
  currency: string;
  order: {
    id: string;
    status: number;
    create_time: string;
    description: string;
    payment: {
      amount: number;
      delivery_fee: number;
      discount_amount: number;
      loyalty_discount_amount: number;
    };
  };
}

declare type LPHistoryType = "EARN" | "SPEND" | "UPGRADE_MEMBERSHIP";

declare type TripAppLpHistoryType =
  | "deposit"
  | "withdrawal"
  | "payment"
  | "capture"
  | "refund"
  | "payment_lp"
  | "refund_lp"
  | "reward_user_lp"
  | "upgrade_lp";

declare interface UserLoyaltyPoint {
  id: number;
  point: number;
  pending_point: number;
  total_point: number;
  create_time: string;
  update_time: string;
}

declare interface UserMembership {
  create_time: string;
  update_time: string;
  id: number;
  status: number;
  level: number;
  active_date: string;
  token_id: string;
}
declare interface UserMembershipResponse extends UserMembership {}
declare interface UserMembershipError {}

declare interface UserMembershipConfig {
  level: {
    [key: string]: LevelMembership;
  };
  perks: {
    [key: string]: PerkMembership;
  };
}

declare interface LevelMembership {
  create_time: string;
  update_time: string;
  key: LevelMembership;
  value: number;
  description: string;
  status: number;
  level: number;
}
declare interface PerkMembership {
  create_time: string;
  update_time: string;
  key: string;
  value: string[];
  description: string;
  status: number;
  level: number;
}

declare type MembershipLevel = "bronze" | "silver" | "gold" | "diamond";

declare interface UpgradeMembershipBody {
  id: number;
  level: number;
  user_id: string;
  active_date: string;
  create_time: string;
  update_time: string;
  status: number;
}

declare interface UpgradeMembershipResponse extends UserMembership {}

declare interface MembershipAvatar {
  data: string;
  tier: number;
}

declare type MembershipAvatarResponse = MembershipAvatar[];
declare interface MembershipAvatarError {}

declare interface ConfigExchange {
  lp_rate: number;
  sgd_rate: number;
}

declare interface UserAccount {
  address: string;
  balance: number | string;
}
