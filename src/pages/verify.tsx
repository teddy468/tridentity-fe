import Head from "next/head";
import { titles } from "@/commons/constants/routers";
import { Box, useTheme } from "@mui/material";
import VerifySuccess from "@/components/Form/VerifySuccess/VerifySuccess";
import { useEffect, useState } from "react";
import useQuery from "@/commons/hooks/useQuery";
import { useDispatch } from "react-redux";
import { getVerifyEmailAsync } from "@/redux/saga/userSagas";

export default function Verify() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<VerifyEmailResponse | null>(null);
  const theme = useTheme();
  const query = useQuery<{ token: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (query.token) {
      dispatch(
        getVerifyEmailAsync({
          payload: query.token,
          onSuccess: data => {
            setData(data);
            setOpen(true);
            setLoading(false);
          },
          onError: () => {
            setLoading(false);
          },
        })
      );
    } else {
      setOpen(false);
      setLoading(false);
    }
  }, [query.token]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleColor = () => {
    if (loading) {
      return theme.palette.warning.light;
    }
    if (query.token) {
      return data ? theme.palette.success.light : theme.palette.error.light;
    }
    return theme.palette.error.light;
  };

  const renderStatus = () => {
    if (loading) {
      return "Please wait for our checking...";
    }
    if (query.token) {
      return data ? "Your account verified" : "Verify token is incorrect!";
    }
    return "Verify token is required";
  };

  return (
    <>
      <Head>
        <title>{titles.VERIFY}</title>
        <meta name="description" content="Home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box m="300px 0px" display="block" textAlign="center">
        <Box component="h1" color={handleColor()}>
          {renderStatus()}
        </Box>
      </Box>
      <VerifySuccess data={data} onOpen={open} onClose={handleClose} />
    </>
  );
}

export { getStaticProps } from "@/commons/fetchings/getStaticPropsDefault";
