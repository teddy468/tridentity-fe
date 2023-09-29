import { titles } from "@/commons/constants/routers";
import NotFoundPage from "@/components/commons/NotFoundPage/NotFoundPage";
import ProductDescription from "@/components/ProductDetail/ProductDescription/ProductDescription";
import ProductDetailHeader from "@/components/ProductDetail/ProductDetailHeader/ProductDetailHeader";
import Review from "@/components/ProductDetail/Review/Review";
import { getProductDetailV2 } from "@/redux/requests/productRequest";
import { Container, styled } from "@mui/material";
import { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";

const ProductDescriptionWrapper = styled(Container)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down(theme.breakpoints.values.sm - 1)]: {
    display: "block",
    marginTop: "32px",
  },
}));

interface ProductDetailProps {
  product: ProductV2;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  if (!product)
    return (
      <>
        <Head>
          <title>{titles.NOT_FOUND}</title>
          <meta name="description" content="Product on sales" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NotFoundPage />
      </>
    );

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content="Product on sales" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductDetailHeader product={product} />
      <ProductDescriptionWrapper>
        <ProductDescription
          description={product.description}
          sub_tag={product.sub_tags}
          merchant_store_id={product.merchant_store_id}
        />
      </ProductDescriptionWrapper>
      <Review productId={product.id} />
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async context => {
  const slug = context.params?.slug;
  try {
    const response: AxiosResponse<GetProductV2Response> = await getProductDetailV2(Number(slug));

    return {
      props: {
        product: response.data,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};
