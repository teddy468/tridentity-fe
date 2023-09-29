import { titles } from "@/commons/constants/routers";
import FavoritesComp from "@/components/Favourites";
import UserLayout from "@/components/Layout/UserLayout/UserLayout";
import Head from "next/head";
import { ReactElement } from "react";

const FavouritePage = () => {
  return (
    <>
      <Head>
        <title>{titles.FAVOURITES}</title>
        <meta name="description" content="Favorites" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FavoritesComp />
    </>
  );
};

export default FavouritePage;

FavouritePage.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};
