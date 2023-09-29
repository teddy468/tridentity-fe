import { RightArrowIcon } from "@/assets/icons";
import { details, routers } from "@/commons/constants/routers";
import Icon from "@/components/commons/Icon/Icon";
import Grid from "@mui/material/Unstable_Grid2";
import {
  ContentContainer,
  Description,
  Header,
  InfoWrapper,
  MenuItem,
  MenuItemName,
  MenuWrapper,
  Overlay,
  Title,
  ViewAll,
} from "./styles";

const OurMenu = ({ merchantCategory }: { merchantCategory: Store['categoriesLevel1'] }) => {

  return (
    <>
      {merchantCategory && merchantCategory.length > 0 && (
        <MenuWrapper>
          <ContentContainer>
            <Header>
              <Title>Our Menu</Title>
              <ViewAll href={routers.CATEGORIES}>
                View all menus <Icon icon={RightArrowIcon} gradient isFill />
              </ViewAll>
            </Header>
            <Grid container columnSpacing={2} rowSpacing={2}>
              {merchantCategory?.slice(0, 6).map((item: Category, index: number) => {
                return (
                  <Grid key={item.id} md={4} xs={12}>
                    <MenuItem href={details.marketplace([], item.id)}>
                      <img style={{ height: "250px" }} src={item.image} alt={item.name} />
                      <Overlay>
                        <InfoWrapper>
                          <MenuItemName>{item.name}</MenuItemName>
                          <Description>{item.description}</Description>
                        </InfoWrapper>
                      </Overlay>
                    </MenuItem>
                  </Grid>
                );
              })}
            </Grid>
          </ContentContainer>
        </MenuWrapper>
      )}
    </>
  );
};

export default OurMenu;
