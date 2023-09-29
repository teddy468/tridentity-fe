import { TriAppIcon } from "@/assets/icons";
import { TOKEN_KEY } from "@/commons/constants";
import { details } from "@/commons/constants/routers";
import useLoading from "@/commons/hooks/useLoading";
import { postTriAppLoginAsync } from "@/redux/saga/userSagas";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/navigation";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const LogoWrapper = styled(Box)(() => ({
  width: 80,
  height: 80,
  svg: {
    animation: `rotation 1.5s infinite`,
    animationDelay: "0.2s",
    animationDirection: "reverse",
    animationFillMode: "forwards",

    "@keyframes rotation": {
      "0%": {
        transform: "scale(4) rotate(360deg)",
        opacity: 1,
      },
      "50%": {
        transform: "scale(4) rotate(180deg)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(4) rotate(0deg)",
        opacity: 1,
      },
    },
  },
}));

declare interface OauthQuery {
  token: string;
  order: string;
}

export default function Oauth({ token, order }: OauthQuery) {
  const dispatch = useDispatch();
  const loadSC = useLoading();
  const router = useRouter();

  const checkLogin = (token: string) => {
    const existToken = localStorage.getItem(TOKEN_KEY);
    return existToken === token ? true : false;
  };

  useEffect(() => {
    const isLogin = checkLogin(token);
    if (!isLogin) {
      dispatch(
        postTriAppLoginAsync({
          payload: { authToken: token },
          onSuccess: () => {
            loadSC.hide();
            if (order) {
              router.replace(details.order(order));
            } else {
              router.replace("/");
            }
          },
          onError: (error: any) => {
            loadSC.hide();
            console.log("error");
          },
        })
      );
    }
  }, []);

  return (
    <Box
      height={"calc(100vh - 325px)"}
      color={"white"}
      textAlign={"center"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <LogoWrapper>
        <TriAppIcon />
      </LogoWrapper>
      <Typography variant="h6" fontSize={24}>
        Authentication with Tridentity
      </Typography>
      <Typography fontSize={16}>Your login is in progress, please wait a bit</Typography>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { token, order }: ParsedUrlQuery = ctx.query;

  if (!token) return { notFound: true };

  if (order) {
    return {
      props: {
        token,
        order,
      },
    };
  }

  return { props: { token } };
};
