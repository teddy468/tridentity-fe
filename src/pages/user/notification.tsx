import UserLayout from "@/components/Layout/UserLayout/UserLayout";
import NotificationComp from "@/components/Notification";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";

const NotificationPage: NextPageWithLayout = () => {
  return <NotificationComp />;
};

NotificationPage.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};
export default NotificationPage;
