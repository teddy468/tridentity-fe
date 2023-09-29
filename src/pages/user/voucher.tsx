import UserLayout from "@/components/Layout/UserLayout/UserLayout";
import VoucherComp from "@/components/Voucher/VoucherComp";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";

export const LoyaltyPointsPage: NextPageWithLayout = () => {
    return <VoucherComp />;
  };
  
  LoyaltyPointsPage.getLayout = function getLayout(page: ReactElement) {
    return <UserLayout>{page}</UserLayout>;
  };
  export default LoyaltyPointsPage;