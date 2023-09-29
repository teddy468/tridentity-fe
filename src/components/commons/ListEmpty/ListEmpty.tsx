import styled from "@emotion/styled";
import { Box, Theme } from "@mui/material";
import { SystemProps } from "@mui/system";
import { NoDataFoundIcon } from "@/assets/icons";

const EmptyContainer = styled(Box)(() => ({
  width: "100%",
  textAlign: "center",
}));

const StyledNoDataFoundIcon = styled(NoDataFoundIcon)(() => ({
  margin: "70px auto 100px",
}));

interface Props extends SystemProps<Theme> {}

const ListEmpty = (props: Props) => {
  return (
    <EmptyContainer {...props}>
      <StyledNoDataFoundIcon />
    </EmptyContainer>
  );
};

export default ListEmpty;
