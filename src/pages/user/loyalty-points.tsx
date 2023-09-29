import UserLayout from "@/components/Layout/UserLayout/UserLayout";
import LoyaltyPointsComp from "@/components/LoyaltyPoints";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";

export const LoyaltyPointsPage: NextPageWithLayout = () => {
  return <LoyaltyPointsComp />;
};

LoyaltyPointsPage.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};
export default LoyaltyPointsPage;
