import { routers } from "@/commons/constants/routers";
import { useRouter } from "next/router";
import { Content, Description, NotFoundPageWrapper, PageTitle, ReturnHomeButton } from "./styles";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <NotFoundPageWrapper>
      <Content>
        <img src="/blank-states/404-not-found.svg" alt="404" />
        <PageTitle>Page Not Found</PageTitle>
        <Description>
          We’re sorry! The page you requested could not be found. Please return to the homepage.
        </Description>
        <ReturnHomeButton onClick={() => router.push(routers.HOME)}>Return to homepage</ReturnHomeButton>
      </Content>
    </NotFoundPageWrapper>
  );
};
export default NotFoundPage;
