import { Container, Footer, SearchTextField, StyledModal, Title } from "./styles";
import { CancelButton, CancelText } from "@/components/Membership/UpgradeModals/styles";
import {
  BadgeListContent,
  BadgeListImg,
  BadgeListItem,
  BadgeListName,
  Content,
} from "./styles";
import { InputAdornment } from "@mui/material";
import { SearchIcon } from "@/components/AllDishes/styles";
import { GoldStar } from "@/assets/images";
import { useEffect, useState } from "react";

interface NewBadgeModalProps {
  isOpen: boolean;
  onCloseBadgeCollection: () => void;
  badgeItems: BadgeItem[];
}

const AllBadgeModal = ({ badgeItems, isOpen, onCloseBadgeCollection }: NewBadgeModalProps) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");

  const updateFilter = (query: string) => {
    setFilter(query)
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => updateFilter(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  return (
    <StyledModal open={isOpen} onClose={onCloseBadgeCollection}>
      <Container>
        <Title>Badges Collection</Title>
        <Content>
          <SearchTextField
            placeholder="Search for badge, brand"
            onChange={event => {setQuery(event.target.value)}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }} />

          <BadgeListContent>
            {badgeItems.filter(value => !filter || (value.name && value.name.toUpperCase().includes(filter.toUpperCase()))).map((value, index) => {
              return <BadgeListItem key={index}>
                <BadgeListImg src={value.image ? value.image : GoldStar.src} alt={"image"}/>
                <BadgeListName>{value.name}</BadgeListName>
              </BadgeListItem>;
            })}

          </BadgeListContent>


        </Content>
        <Footer>
          <CancelButton onClick={onCloseBadgeCollection}>
            <CancelText>OK</CancelText>
          </CancelButton>
        </Footer>
      </Container>
    </StyledModal>
  );
};

export default AllBadgeModal;
