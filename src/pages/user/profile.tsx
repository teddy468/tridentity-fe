import { titles } from "@/commons/constants/routers";
import Head from "next/head";
import Profile from "@/components/Profile/profile";
import { NextPageWithLayout } from "../_app";
import UserLayout from "@/components/Layout/UserLayout/UserLayout";
import { ReactElement } from "react";

const ProfilePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{titles.PROFILE}</title>
        <meta name="description" content="Product on sales" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Profile />
    </>
  );
};
ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default ProfilePage;
