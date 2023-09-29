import { styled } from "@mui/material";

export const MembershipCardWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  img: {
    width: "100%",
    height: "272px",
    objectFit: "contain",
  },
}));
export const Info = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "170px",
  left: "24px",
  width: "100%",
  height: "100%",
  [theme.breakpoints.down("md")]: {
    top: 180,
    left: 0,
  },
}));

export const UserFullName = styled("div")(({ theme }) => ({
  fontWeight: 600,
  fontSize: 24,
  lineHeight: "32px",
  color: theme.palette.common.white,
}));

export const Detail = styled("div")(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  color: theme.palette.common.white,
}));
