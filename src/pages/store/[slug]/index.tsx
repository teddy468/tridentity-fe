import { titles } from "@/commons/constants/routers";
import NotFoundPage from "@/components/commons/NotFoundPage/NotFoundPage";
import MerchantStoreDetail from "@/components/MerchantDetail/MerchantDetail";
import { getMerchantDetail } from "@/redux/requests/merchantRequests";
import { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface ProductStoreProps {
  merchantStore: Store | null;
}

export default function ProductStore({ merchantStore }: ProductStoreProps) {
  if (!merchantStore)
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
        <title>{merchantStore.name}</title>
        <meta name="description" content="Product on sales" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MerchantStoreDetail merchantStore={merchantStore} />
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context): Promise<{ props: ProductStoreProps }> => {
  const slug = context.params?.slug;
  try {
    const detail: AxiosResponse<GetMerchantResponse> = await getMerchantDetail(Number(slug));

    return {
      props: {
        merchantStore: detail.data,
      },
    };
  } catch {
    return {
      props: { merchantStore: null },
    };
  }
};
