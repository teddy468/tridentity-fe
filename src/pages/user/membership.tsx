import UserLayout from "@/components/Layout/UserLayout/UserLayout";
import Membership from "@/components/Membership/Membership";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";

const MembershipPage: NextPageWithLayout = () => {
  return <Membership />;
};

MembershipPage.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};
export default MembershipPage;
