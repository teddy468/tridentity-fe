import { BadgeListContent, Container, Footer, SearchTextField, StyledModal, Title, Content, SubmitButton  } from "./styles";
import { CancelButton, CancelText } from "@/components/Membership/UpgradeModals/styles";
import { InputAdornment } from "@mui/material";
import { SearchIcon } from "@/components/AllDishes/styles";
import { useEffect, useState } from "react";
import BadgeChooseItem from "@/components/Profile/PersonalInformation/UserBadge/BadgetChooseItem";

interface ChooseBadgeModalProps {
  isOpen: boolean;
  onCloseBadgeCollection: () => void;
  badgeItems: BadgeItem[];
  confirmWear: (wearIds: number[]) => void;
}

const ChooseBadgeModal = ({ badgeItems, isOpen, onCloseBadgeCollection, confirmWear }: ChooseBadgeModalProps) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [wearIds, setWearIds] = useState<number[]>([]);

  useEffect(() => {
    if (badgeItems) {
      setWearIds(badgeItems.filter(value => value.is_equipped).map(value => value.id));
    }
  }, [badgeItems]);

  const updateFilter = (query: string) => {
    setFilter(query);
  };

  const onClose = ( ) => {
    setWearIds(badgeItems.filter(value => value.is_equipped).map(value => value.id));
    onCloseBadgeCollection();
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => updateFilter(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);


  const clickWear = (wearId: number) => {
    console.log("Click: ", wearId);
    const index = wearIds.indexOf(wearId);
    if (index !== -1) {
      wearIds.splice(index, 1);
    } else {
      wearIds.push(wearId);
    }
    console.log("Wear: ", wearIds);
  };

  const confirmWearBadge = () => {
    confirmWear(wearIds);
  };

  return (
    <StyledModal open={isOpen} onClose={onCloseBadgeCollection}>
      <Container>
        <Title>Choose Badges</Title>
        <Content>
          <SearchTextField
            placeholder="Search for badge, brand"
            onChange={event => {
              setQuery(event.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }} />

          <BadgeListContent>
            {badgeItems.filter(value => !filter || (value.name && value.name.toUpperCase().includes(filter.toUpperCase()))).map((value, index) => {
              return <BadgeChooseItem
                wearIds={wearIds}
                badgeItem={value}
                choose={wearIds.includes(value.id)}
                onClick={(itemId: number) => clickWear(itemId)}
                key={index} />;
            })}
          </BadgeListContent>

        </Content>
        <Footer>
          <CancelButton onClick={onClose}>
            <CancelText>Cancel</CancelText>
          </CancelButton>
          <SubmitButton onClick={confirmWearBadge}>Confirm</SubmitButton>
        </Footer>
      </Container>
    </StyledModal>
  );
};

export default ChooseBadgeModal;
