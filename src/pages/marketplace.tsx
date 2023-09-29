import Head from "next/head";
import { titles } from "@/commons/constants/routers";
import { Box, styled } from "@mui/material";
import MarketplaceMerchants from "@/components/Marketplace/MarketplaceMerchants/MarketplaceMerchants";
import MarketplaceFilter from "@/components/Marketplace/MarketplaceFilter/MarketplaceFilter";
import { Container } from "@mui/system";
import Grid from "@mui/material/Unstable_Grid2";
import useQuery from "@/commons/hooks/useQuery";
import MarketplaceNearMerchants from "@/components/MarketplaceNear/MarketplaceNearMerchants/MarketplaceNearMerchants";

const MarketplaceWrapper = styled(Box)(() => ({
  background: "linear-gradient(324deg, #0B0B0B 38.44%, #161A18 85.8%)",
}));
const MarketPlaceContainer = styled(Container)(({ theme }) => ({
  padding: "64px 0",
  [theme.breakpoints.down(theme.breakpoints.values.md - 1)]: {
    flexDirection: "column",
    padding: "20px 0",
  },
}));

const FilterContainer = styled(Grid)(({ theme }) => ({
  width: "fit-content",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    margin: "0 1rem",
  },
}));

export default function MarketplacePage() {
  const { address, lat, lng } = useQuery<Partial<MerchantsQuery>>();

  return (
    <>
      <Head>
        <title>{titles.MARKET_PLACE}</title>
        <meta name="description" content="Product on sales" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MarketplaceWrapper>
        <MarketPlaceContainer>
          {address && lat && lng ? (
            <MarketplaceNearMerchants />
          ) : (
            <Grid container columnSpacing={"24px"}>
              <FilterContainer xs={12} md={3}>
                <MarketplaceFilter />
              </FilterContainer>
              <Grid xs={12} md={9}>
                <MarketplaceMerchants />
              </Grid>
            </Grid>
          )}
        </MarketPlaceContainer>
      </MarketplaceWrapper>
    </>
  );
}

export { getStaticProps } from "@/commons/fetchings/getStaticPropsDefault";
