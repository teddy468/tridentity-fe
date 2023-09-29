import { URL_MERCHANT_PRODUCTS } from "@/commons/constants/apiUrl";
import useFetchList from "@/commons/hooks/useFetchList";
import { Box } from "@mui/material";
import {
  DishGridItem,
  DishGridList,
  FlexBox,
  SectionContainer,
  SectionContent,
  Title,
  TitleComingSoon,
  ViewAll,
  ViewAllText,
} from "./styles";
import { RightArrowIcon } from "@/assets/icons";
import { details } from "@/commons/constants/routers";
import Icon from "@/components/commons/Icon/Icon";
import ProductCard, { SkeletonProductCard } from "@/components/commons/ProductCard/ProductCard";
import moment from "moment";
import { isMobile } from "react-device-detect";

const perPage = 4;

export const CampaignProducts = ({ merchantId, campaign }: { merchantId: Store["id"]; campaign: Campaign }) => {
  const { data, loading } = useFetchList<Product>(URL_MERCHANT_PRODUCTS(merchantId), {
    perPage,
    is_featured: true,
    campaignId: campaign.id,
    sort_by: "create_time",
    order_by: "DESC",
  });

  const comingSoon = moment(campaign.start_date).isAfter(moment());

  return (
    <>
      {loading ||
        (!loading && data.length > 0 && (
          <SectionContainer>
            <SectionContent maxWidth="lg">
              <FlexBox>
                <Title>
                  {campaign.name} {comingSoon && <TitleComingSoon>Coming soon</TitleComingSoon>}
                </Title>
                <ViewAll href={`${details.storeProducts(merchantId)}?campaign_id=${campaign.id}`} color="gradient">
                  <ViewAllText>
                    {" "}
                    <span style={{ marginRight: "30px" }}>
                      {moment(campaign.start_date).format("DD/MM/yyyy")} -{" "}
                      {moment(campaign.end_date).format("DD/MM/yyyy")}
                    </span>{" "}
                    {isMobile ? "View all" : "View all dishes"}
                  </ViewAllText>
                  <Icon icon={RightArrowIcon} gradient isFill />
                </ViewAll>
              </FlexBox>

              <Box mt={{ xs: "26px", lg: "32px" }}>
                <DishGridList container rowSpacing={{ xs: 2, lg: 3 }} columnSpacing={{ xs: 2, lg: 3 }}>
                  {loading
                    ? new Array(4).fill(0).map((_, index) => (
                        <DishGridItem item key={index} xs={6} sm={3}>
                          <SkeletonProductCard />
                        </DishGridItem>
                      ))
                    : data.map(product => {
                        return (
                          <DishGridItem item key={product.id} xs={6} sm={6} md={3}>
                            <ProductCard product={product} fixOnCampaign={true} />
                          </DishGridItem>
                        );
                      })}
                </DishGridList>
              </Box>
            </SectionContent>
          </SectionContainer>
        ))}
    </>
  );
};
