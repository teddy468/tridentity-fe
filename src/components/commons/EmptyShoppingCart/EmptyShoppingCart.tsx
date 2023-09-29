import { routers } from "@/commons/constants/routers";
import { useRouter } from "next/router";
import { EmptyCartWrapper, Content, PageTitle, Description, ReturnHomeButton } from "./styles";

const EmptyShoppingCart = () => {
  const router = useRouter();
  return (
    <EmptyCartWrapper>
      <Content>
        <img src="/blank-states/empty-box.svg" alt="404" />
        <PageTitle>Your cart is empty</PageTitle>
        <Description>Time to start purchasing!</Description>
        <ReturnHomeButton onClick={() => router.push(routers.MARKETPLACE)}>Explore our marketplace</ReturnHomeButton>
      </Content>
    </EmptyCartWrapper>
  );
};

export default EmptyShoppingCart;
