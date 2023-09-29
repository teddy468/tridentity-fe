import { Box, styled } from "@mui/material";

export const NotificationWrapper = styled("div")(({ theme }) => ({
  width: "100%",
}));

export const Title = styled("h1")(({ theme }) => ({
  fontSize: "32px",
  color: 'white',
  marginBottom: '30px',
  [theme.breakpoints.down('sm')] : {
    display : 'none'
  }
}));


export const Detail = styled("div")(({ theme }) => ({
  color: "white",
  lineHeight: "20px",
  height: 35,
  marginLeft: 12,
}));


export const PaginationWrapper = styled(Box)(({ theme }) => ({
  justifyContent: "left",
  display: "flex",
}));

export const SelectPage = styled('div')(({ theme }) => ({
  width: '140px',
  margin: "20px 30px 0",

}));

export const PaginationCover = styled('div')(({ theme }) => ({
  display: "flex",
  alignItems: 'center'
}));