import Head from "next/head";
import { titles } from "@/commons/constants/routers";
import Banner from "@/components/Dashboard/Banner/Banner";
import Menu from "@/components/Dashboard/Menu/Menu";
import { TopSellingDishes } from "@/components/Dashboard/TopSellingDishes/TopSellingDishes";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import useFetchList from "@/commons/hooks/useFetchInfinity";
import { URL_MERCHANT_FAVORITE } from "@/commons/constants/apiUrl";

const FavouriteRestaurants = dynamic(() => import("@/components/Dashboard/FavouriteRestaurants/FavouriteRestaurants"), {
  ssr: false,
  loading: () => null,
});

const FeaturedRestaurants = dynamic(() => import("@/components/Dashboard/FeaturedRestaurants/FeaturedRestaurants"), {
  ssr: false,
  loading: () => null,
});

const perPage = 5;

export default function Home() {
  const { userInfo } = useSelector(({ user }: RootState) => user);
  const { data, loading } = useFetchList<StoreItem>(URL_MERCHANT_FAVORITE, {
    perPage,
    sort_by: "likes",
    order_by: "DESC",
  });

  const renderFavoriteRestaurant = () => {
    if (!userInfo) return;
    if (loading) {
      return <FavouriteRestaurants data={data} loading={loading} />;
    }
    return <>{data && data.length > 0 && <FavouriteRestaurants data={data} loading={loading} />}</>;
  };
  return (
    <>
      <Head>
        <title>{titles.HOME}</title>
        <meta name="description" content="Home page" />
      </Head>
      <Banner />
      <FeaturedRestaurants />
      {renderFavoriteRestaurant()}
      <Menu />
      <TopSellingDishes />
    </>
  );
}

export { getStaticProps } from "@/commons/fetchings/getStaticPropsDefault";
