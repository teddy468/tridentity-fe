import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { URL_USER_BADGE } from "@/commons/constants/apiUrl";
import {
  BadgeContent,
  BadgeIcon,
  BadgeItemView,
  RepeatButton,
  ShowMoreButton,
} from "@/components/Profile/PersonalInformation/UserBadge/styles";
import { GoldStar } from "@/assets/images";
import { RepeatIcon } from "@/assets/icons";
import useFetch from "@/commons/hooks/useFetch";
import AllBadgeModal from "@/components/Profile/PersonalInformation/UserBadge/AllBadgeModal";
import ChooseBadgeModal from "@/components/Profile/PersonalInformation/UserBadge/ChooseBadgeModal";
import { useDispatch } from "react-redux";
import { wearBadgeMultiSync, wearBadgeSync } from "@/redux/saga/cartSagas";
import useToast from "@/commons/hooks/useToast";
import { Tooltip } from "@mui/material";

interface Props {

}

function compareArr(arr1: number[], arr2: number[]){
  arr1.sort()
  arr2.sort()
  return arr1 + "" == arr2 + ""
}

const UserBadges: React.FC<Props> = ({ }) => {

  const { data: allBadges, refresh } = useFetch<BadgeItem[]>(URL_USER_BADGE);
  const dispatch = useDispatch();
  const toast = useToast();

  const [showBadgeCollection, setShowBadgeCollection] = useState(false);
  const [showChooseBadge, setShowChooseBadge] = useState(false);


  const { equipBadges, showMore } = useMemo<{ equipBadges: BadgeItem[], showMore: number }>(() => {
    if (allBadges) {
      const equips = allBadges.filter(value => value.is_equipped);
      const more = allBadges.length - equips.length;
      return { equipBadges: equips, showMore: (more > 0 ? more : 0) };
    }
    return { equipBadges: [], showMore: 0 };
  }, [allBadges]);


  const onCloseBadgeCollection = () => {
    setShowBadgeCollection(false);
  };

  const onCloseChooseBadge = () => {
    setShowChooseBadge(false);
  };

  function confirmWear(wearIds: number[]) {
    console.log("Confirm WearIds: ", wearIds);
    if (compareArr(equipBadges.filter(value => value.is_equipped).map(value => value.id), wearIds)) {
      console.log("NotChange Return")
      setShowChooseBadge(false);
      return
    }
    dispatch(
      wearBadgeMultiSync({
        payload: { badge_ids: wearIds },
        onSuccess: data => {
          toast.success("Wear badge success");
          setShowChooseBadge(false);
          refresh();
        },

        onError: error => {
          const message =
            typeof error?.error.message === "string"
              ? error?.error.message
              : typeof error?.error.message?.[0] === "string"
                ? error.error.message[0]
                : "Complete Order Fail";
          toast.error(message);
          setShowChooseBadge(false);
        },
      }),
    );

  }

  return <>
    <BadgeContent>
      {equipBadges?.map((value, index) => {
        return <BadgeItemView key={index}>
          <Tooltip title={value.name}>
            <BadgeIcon src={value.image ? value.image : GoldStar.src} alt={"Image"} />
          </Tooltip>
        </BadgeItemView>;
      })}
      {(showMore > 0) && <BadgeItemView>
        <ShowMoreButton
          onClick={() => setShowBadgeCollection(true)}>+ {showMore}</ShowMoreButton>
      </BadgeItemView>}
      {allBadges && allBadges.length > 0 &&
        <BadgeItemView>
          <RepeatButton onClick={() => setShowChooseBadge(true)}><RepeatIcon /></RepeatButton>
        </BadgeItemView>}
    </BadgeContent>

    <AllBadgeModal isOpen={showBadgeCollection} onCloseBadgeCollection={onCloseBadgeCollection}
      badgeItems={allBadges ? allBadges : []} />

    <ChooseBadgeModal isOpen={showChooseBadge} onCloseBadgeCollection={onCloseChooseBadge}
      badgeItems={allBadges ? allBadges : []}
      confirmWear={(wearIds) => confirmWear(wearIds)} />
  </>;
};

export default UserBadges;