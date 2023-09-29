import { ArrowDownIcon } from "@/assets/icons";
import { ArrowWrapper, Wrapper } from "./styles";
import { Box } from "@mui/material";

const SeeMoreButton = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Wrapper>
      <Box>{isOpen ? "See less" : "See more"}</Box>
      <ArrowWrapper isOpen={isOpen}>
        <ArrowDownIcon />
      </ArrowWrapper>
    </Wrapper>
  );
};

export default SeeMoreButton;
