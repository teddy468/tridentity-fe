import { RightArrowIcon } from "@/assets/icons";
import { CATEGORIES_DASHBOARD_SETTING } from "@/commons/constants/apiUrl";
import { routers } from "@/commons/constants/routers";
import useFetch from "@/commons/hooks/useFetch";
import Icon from "@/components/commons/Icon/Icon";
import Grid from "@mui/material/Unstable_Grid2";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  ContentContainer,
  Description,
  Header,
  ImageWrapper,
  ImageWrapperVertical,
  InfoWrapper,
  MenuItem,
  MenuItemName,
  MenuWrapper,
  Overlay,
  SectionMobile,
  SectionPC,
  Title,
  ViewAll,
} from "./styles";

const Menu = () => {
  const { data: categoriesConfig } = useFetch<CategoryConfig[]>(CATEGORIES_DASHBOARD_SETTING);
  const data = useMemo(() => categoriesConfig?.map(category => category.category), [categoriesConfig]);

  const { categories } = useSelector(({ system }: RootState) => system);

  const handleClick = (id: number) => {
    const matchingCategory = categories.find(item => item.id === id);
    const listIdChild = matchingCategory?.children.map(item => item.id);
    const queryString = `/marketplace?category_ids=${matchingCategory?.id}`;
    if (listIdChild && listIdChild?.length > 0) {
      const queryChild = listIdChild?.join("%2C");
      return `${queryString}%2C${queryChild}`;
    }
    return queryString;
  };
  return (
    <>
      {data && data.filter(category => !!category).length > 0 && (
        <MenuWrapper>
          <ContentContainer>
            <Header>
              <Title>What’s on the menu?</Title>
              <ViewAll href={routers.CATEGORIES} color="gradient">
                <Icon icon={RightArrowIcon} gradient isFill />
              </ViewAll>
            </Header>
            <SectionPC>
              <Grid container columnSpacing={2} rowSpacing={2}>
                <Grid container columnSpacing={2} xs={9}>
                  {data[0] && (
                    <Grid xs={8}>
                      <MenuItem href={handleClick(data[0]?.id)}>
                        <ImageWrapper>
                          <img width={"100%"} src={data[0]?.image} alt={data[0]?.name} />
                        </ImageWrapper>
                        <Overlay>
                          <InfoWrapper>
                            <MenuItemName>{data[0]?.name}</MenuItemName>
                            <Description>{data[0]?.description}</Description>
                          </InfoWrapper>
                        </Overlay>
                      </MenuItem>
                    </Grid>
                  )}
                  {data[1] && (
                    <Grid xs={4}>
                      <MenuItem href={handleClick(data[1]?.id)}>
                        <ImageWrapper>
                          <img height={"100%"} src={data[1]?.image} alt={data[1]?.name} />
                        </ImageWrapper>
                        <Overlay>
                          <InfoWrapper>
                            <MenuItemName>{data[1]?.name}</MenuItemName>
                            <Description>{data[1]?.description}</Description>
                          </InfoWrapper>
                        </Overlay>
                      </MenuItem>
                    </Grid>
                  )}
                  {data[3] && (
                    <Grid xs={4}>
                      <MenuItem href={handleClick(data[3]?.id)}>
                        <ImageWrapper>
                          <img style={{ height: "100%" }} src={data[3]?.image} alt={data[3]?.name} />
                        </ImageWrapper>
                        <Overlay>
                          <InfoWrapper>
                            <MenuItemName>{data[3]?.name}</MenuItemName>
                            <Description>{data[3]?.description}</Description>
                          </InfoWrapper>
                        </Overlay>
                      </MenuItem>
                    </Grid>
                  )}
                  {data[4] && (
                    <Grid xs={8}>
                      <MenuItem href={handleClick(data[4]?.id)}>
                        <ImageWrapper>
                          <img style={{ width: "100%" }} src={data[4]?.image} alt={data[4]?.name} />
                        </ImageWrapper>
                        <Overlay>
                          <InfoWrapper>
                            <MenuItemName>{data[4]?.name}</MenuItemName>
                            <Description>{data[4]?.description}</Description>
                          </InfoWrapper>
                        </Overlay>
                      </MenuItem>
                    </Grid>
                  )}
                </Grid>
                {data[2] && (
                  <Grid xs={3}>
                    <MenuItem href={handleClick(data[2]?.id)}>
                      <ImageWrapperVertical>
                        <img style={{ height: "100%" }} src={data[2].image} alt={data[2].name} />
                      </ImageWrapperVertical>
                      <Overlay>
                        <InfoWrapper>
                          <MenuItemName>{data[2].name}</MenuItemName>
                          <Description>{data[2].description}</Description>
                        </InfoWrapper>
                      </Overlay>
                    </MenuItem>
                  </Grid>
                )}
                {data[5] && (
                  <Grid xs={4}>
                    <MenuItem href={handleClick(data[5]?.id)}>
                      <img style={{ height: "250px" }} src={data[5]?.image} alt={data[5]?.name} />
                      <Overlay>
                        <InfoWrapper>
                          <MenuItemName>{data[5]?.name}</MenuItemName>
                          <Description>{data[5]?.description}</Description>
                        </InfoWrapper>
                      </Overlay>
                    </MenuItem>
                  </Grid>
                )}
                {data[6] && (
                  <Grid xs={4}>
                    <MenuItem href={handleClick(data[6]?.id)}>
                      <img style={{ height: "250px" }} src={data[6]?.image} alt={data[6]?.name} />
                      <Overlay>
                        <InfoWrapper>
                          <MenuItemName>{data[6]?.name}</MenuItemName>
                          <Description>{data[6]?.description}</Description>
                        </InfoWrapper>
                      </Overlay>
                    </MenuItem>
                  </Grid>
                )}
                {data[7] && (
                  <Grid xs={4}>
                    <MenuItem href={handleClick(data[7]?.id)}>
                      <img style={{ height: "250px" }} src={data[7]?.image} alt={data[7]?.name} />
                      <Overlay>
                        <InfoWrapper>
                          <MenuItemName>{data[7]?.name}</MenuItemName>
                          <Description>{data[7]?.description}</Description>
                        </InfoWrapper>
                      </Overlay>
                    </MenuItem>
                  </Grid>
                )}
              </Grid>
            </SectionPC>

            <SectionMobile>
              <Grid container spacing={2}>
                <Grid xs={6}>
                  <MenuItem href={handleClick(data[0]?.id)}>
                    <ImageWrapper>
                      <img style={{ height: "100%" }} src={data[0]?.image} alt={data[0]?.name} />
                    </ImageWrapper>
                    <Overlay>
                      <InfoWrapper>
                        <MenuItemName>{data[0]?.name}</MenuItemName>
                        <Description>{data[0]?.description}</Description>
                      </InfoWrapper>
                    </Overlay>
                  </MenuItem>
                </Grid>
                <Grid xs={6}>
                  <MenuItem href={handleClick(data[1]?.id)}>
                    <ImageWrapper>
                      <img style={{ height: "100%" }} src={data[1]?.image} alt={data[1]?.name} />
                    </ImageWrapper>
                    <Overlay>
                      <InfoWrapper>
                        <MenuItemName>{data[1]?.name}</MenuItemName>
                        <Description>{data[1]?.description}</Description>
                      </InfoWrapper>
                    </Overlay>
                  </MenuItem>
                </Grid>
                <Grid xs={12}>
                  <MenuItem href={handleClick(data[2]?.id)}>
                    <ImageWrapper>
                      <img style={{ width: "100%" }} src={data[2]?.image} alt={data[2]?.name} />
                    </ImageWrapper>
                    <Overlay>
                      <InfoWrapper>
                        <MenuItemName>{data[2]?.name}</MenuItemName>
                        <Description>{data[2]?.description}</Description>
                      </InfoWrapper>
                    </Overlay>
                  </MenuItem>
                </Grid>
                <Grid xs={6}>
                  <MenuItem href={handleClick(data[3]?.id)}>
                    <ImageWrapper>
                      <img style={{ height: "100%" }} src={data[3]?.image} alt={data[3]?.name} />
                    </ImageWrapper>
                    <Overlay>
                      <InfoWrapper>
                        <MenuItemName>{data[3]?.name}</MenuItemName>
                        <Description>{data[3]?.description}</Description>
                      </InfoWrapper>
                    </Overlay>
                  </MenuItem>
                </Grid>
                <Grid xs={6}>
                  <MenuItem href={handleClick(data[4]?.id)}>
                    <ImageWrapper>
                      <img style={{ height: "100%" }} src={data[4]?.image} alt={data[4]?.name} />
                    </ImageWrapper>
                    <Overlay>
                      <InfoWrapper>
                        <MenuItemName>{data[4]?.name}</MenuItemName>
                        <Description>{data[4]?.description}</Description>
                      </InfoWrapper>
                    </Overlay>
                  </MenuItem>
                </Grid>
                <Grid xs={12}>
                  <MenuItem href={handleClick(data[5]?.id)}>
                    <ImageWrapper>
                      <img style={{ width: "100%" }} src={data[5]?.image} alt={data[5]?.name} />
                    </ImageWrapper>
                    <Overlay>
                      <InfoWrapper>
                        <MenuItemName>{data[5]?.name}</MenuItemName>
                        <Description>{data[5]?.description}</Description>
                      </InfoWrapper>
                    </Overlay>
                  </MenuItem>
                </Grid>
                <Grid xs={6}>
                  <MenuItem href={handleClick(data[6]?.id)}>
                    <ImageWrapper>
                      <img style={{ height: "100%" }} src={data[6]?.image} alt={data[6]?.name} />
                    </ImageWrapper>
                    <Overlay>
                      <InfoWrapper>
                        <MenuItemName>{data[6]?.name}</MenuItemName>
                        <Description>{data[6]?.description}</Description>
                      </InfoWrapper>
                    </Overlay>
                  </MenuItem>
                </Grid>
                <Grid xs={6}>
                  <MenuItem href={handleClick(data[7]?.id)}>
                    <ImageWrapper>
                      <img style={{ height: "100%" }} src={data[7]?.image} alt={data[7]?.name} />
                    </ImageWrapper>
                    <Overlay>
                      <InfoWrapper>
                        <MenuItemName>{data[7]?.name}</MenuItemName>
                        <Description>{data[7]?.description}</Description>
                      </InfoWrapper>
                    </Overlay>
                  </MenuItem>
                </Grid>
              </Grid>
            </SectionMobile>
          </ContentContainer>
        </MenuWrapper>
      )}
    </>
  );
};

export default Menu;
