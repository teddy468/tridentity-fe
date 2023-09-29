import { useSelector } from "react-redux";
import { NoAvatar } from "@/assets/images";
import { MEMBERSHIP_AVATAR_PREFIX } from "../constants";

interface FetchReturnType {
  avatar: string;
  getAvatar: (avatar?: string) => string;
  getMembershipAvatar: (tier: number) => string;
}

const useAvatar = (): FetchReturnType => {
  const { membershipAvatars, userInfo } = useSelector(({ user }: RootState) => user);

  const getAvatar = (avatar?: string) => {
    if (!avatar) return NoAvatar.src;
    const membershipAvatarItem = membershipAvatars?.find(item => MEMBERSHIP_AVATAR_PREFIX + item.tier === avatar);
    if (membershipAvatarItem) return membershipAvatarItem.data;
    if (avatar.startsWith("http")) return avatar;
    return "http://" + avatar;
  };

  const getMembershipAvatar = (tier: number) => MEMBERSHIP_AVATAR_PREFIX + tier;

  return {
    avatar: getAvatar(userInfo?.avatar),
    getAvatar,
    getMembershipAvatar,
  };
};

export default useAvatar;
