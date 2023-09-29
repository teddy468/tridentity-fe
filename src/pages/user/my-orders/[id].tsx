import { titles } from "@/commons/constants/routers";
import UserLayout from "@/components/Layout/UserLayout/UserLayout";
import OrderDetailComp from "@/components/OrderDetail";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";
interface Props {
  id: OrderV2["id"];
}
const OrderDetailPage = ({ id }: Props) => {
  return (
    <>
      <Head>
        <title>{titles.ORDER_DETAIL}</title>
        <meta name="description" content={`Order${id}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OrderDetailComp id={id} />
    </>
  );
};

export default OrderDetailPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.params?.id;

  return {
    props: { id },
  };
};

OrderDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};
