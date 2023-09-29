import { titles } from "@/commons/constants/routers";
import Categories from "@/components/Categories/Categories";
import Head from "next/head";

export default function CategoriesPage() {
  return (
    <>
      <Head>
        <title>{titles.CATEGORIES}</title>
        <meta name="description" content="Product on sales" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Categories />
    </>
  );
}

export { getStaticProps } from "@/commons/fetchings/getStaticPropsDefault";
