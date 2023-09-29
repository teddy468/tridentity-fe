import { titles } from "@/commons/constants/routers";
import Head from "next/head";
import UserLayout from "@/components/Layout/UserLayout/UserLayout";
import { ReactElement } from "react";
import MyOrderComp from "@/components/MyOrders";

const MyOrderPage = () => {
  return (
    <>
      <Head>
        <title>{titles.MY_ORDERS}</title>
        <meta name="description" content="My orders" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyOrderComp />
    </>
  );
};

export default MyOrderPage;

MyOrderPage.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};
