import { titles } from "@/commons/constants/routers";
import { MerchantStoreProducts } from "@/components/MerchantProducts/MerchantProduct";
import Head from "next/head";

export default function AllDishesMerchantStorePage() {
  return (
    <>
      <Head>
        <title>{titles.ALL_DISHES}</title>
        <meta name="description" content="Featured Dishes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MerchantStoreProducts />
    </>
  );
}
