import { MY_VOUCHER } from "@/commons/constants/apiUrl";
import useFetchList from "@/commons/hooks/useFetchList";
import { SkeletonProductCard } from "@/components/commons/ProductCard/ProductCard";
import { Box } from "@mui/material";
import { DishGridItem, DishGridList, FlexBox, SectionContainer, SectionContent, Title } from "./styles";
import { VoucherCard } from "./VoucherCard";
const perPage = 100;

export const Voucher = () => {
  const { data, loading, refresh } = useFetchList<any>(MY_VOUCHER, {
    perPage,
    sort_by: "create_time",
    order_by: "DESC",
  });

  return (
    <>
      {loading ||
        (!loading && data.length > 0 && (
          <SectionContainer>
            <SectionContent maxWidth="lg">
              <FlexBox>
                <Title>Vouchers</Title>
              </FlexBox>

              <Box mt={{ xs: "26px", lg: "32px" }}>
                <DishGridList container rowSpacing={{ xs: 2, lg: 3 }} columnSpacing={{ xs: 2, lg: 3 }}>
                  {loading
                    ? new Array(4).fill(0).map((_, index) => (
                        <DishGridItem item key={index} xs={6} sm={3}>
                          <SkeletonProductCard />
                        </DishGridItem>
                      ))
                    : data.map(voucher => {
                        return (
                          <DishGridItem item key={voucher.id} xs={6} sm={6} md={6}>
                            <VoucherCard item={voucher} onRefesh={() => refresh()} />
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
