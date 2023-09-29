import { FC } from "react";
import { HeaderContainer, LogoLink, StyledHeaderLogo, StyledHeader, MenuWrapper, MenuMobileWrapper } from "./styles";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import HeaderMenuMobile from "./HeaderMenuMobile/HeaderMenuMobile";
import { useRouter } from "next/router";
import { routers } from "@/commons/constants/routers";
const Header: FC = () => {
  const router = useRouter();
  return (
    <StyledHeader>
      <HeaderContainer maxWidth="xl">
        <LogoLink
          href="/"
          onClick={() => {
            if (router.pathname === routers.HOME) {
              window.location.reload();
            }
          }}
        >
          <StyledHeaderLogo />
        </LogoLink>
        <MenuWrapper>
          <HeaderSearch />
          <HeaderMenu />
        </MenuWrapper>
        <MenuMobileWrapper>
          <HeaderMenuMobile />
        </MenuMobileWrapper>
      </HeaderContainer>
    </StyledHeader>
  );
};

export default Header;
