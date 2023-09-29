import { PLATFORM_MIN_ORDER } from "@/commons/constants/apiUrl";
import { titles } from "@/commons/constants/routers";
import useFetch from "@/commons/hooks/useFetch";
import ShoppingCart from "@/components/Payment/Cart/ShoppingCart";
import { getPlatformMinOrderSync } from "@/redux/saga/cartSagas";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function CartPage() {
  const dispatch = useDispatch();

  dispatch(getPlatformMinOrderSync({ payload: null }));

  return (
    <>
      <Head>
        <title>{titles.CART}</title>
        <meta name="description" content="Product on sales" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ShoppingCart />
    </>
  );
}
