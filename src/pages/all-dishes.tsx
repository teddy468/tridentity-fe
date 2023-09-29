import { titles } from "@/commons/constants/routers";
import { AllDishes } from "@/components/AllDishes/AllDishes";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>{titles.ALL_DISHES}</title>
        <meta name="description" content="Featured Dishes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AllDishes />
    </>
  );
}
