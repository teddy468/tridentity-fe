import { titles } from "@/commons/constants/routers";
import Head from "next/head";
import NotFound from "../404";

export default function NewsPage() {
  return (
    <>
      <Head>
        <title>{titles.NEWS}</title>
        <meta name="description" content="Product on sales" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NotFound />
    </>
  );
}

export { getStaticProps } from "@/commons/fetchings/getStaticPropsDefault";
