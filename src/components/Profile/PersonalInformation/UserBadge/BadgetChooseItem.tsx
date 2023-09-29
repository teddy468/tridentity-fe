import { BadgeListImg, BadgeListItem, BadgeListName } from "./styles";
import { GoldStar } from "@/assets/images";
import { useState } from "react";
import { TickCircleGreenIcon } from "@/assets/icons";
import useToast from "@/commons/hooks/useToast";

interface ChooseBadgeModalProps {
  badgeItem: BadgeItem;
  choose: boolean;
  wearIds: number[];
  onClick: (itemId: number) => void;
}

const BadgeChooseItem = ({ badgeItem, choose, onClick, wearIds }: ChooseBadgeModalProps) => {

  const toast = useToast();
  const [choosed, setChoosed] = useState(choose);

  function clickWear(id: number) {

    if (!choosed && wearIds.length >= 5) {
      toast.error("You can only equip max 5 badge");
      return;
    }

    onClick(id);
    setChoosed(!choosed);
  }

  return <BadgeListItem onClick={() => clickWear(badgeItem.id)}>
    <BadgeListImg src={badgeItem.image ? badgeItem.image : GoldStar.src} alt={"image"} />
    <BadgeListName>{badgeItem.name}</BadgeListName>
    <div style={{
      marginLeft: "auto",
      marginRight: "20px",
    }}>
      <TickCircleGreenIcon style={{ display: choosed ? "flex" : "none" }} />
    </div>
  </BadgeListItem>;
};

export default BadgeChooseItem;