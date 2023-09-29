import { RightArrowIcon } from "@/assets/icons";
import {
  CustomRating,
  DateTime,
  ReviewDescription,
  ReviewItem,
  ReviewList,
  ReviewWrapper,
  Title,
  TitleWrapper,
  UserAvatar,
  UserContent,
  UserName,
  UserWrapper,
  ViewAll,
} from "./styles";
import moment from "moment";
import * as React from "react";
import { useEffect, useState } from "react";
import useFetchList from "@/commons/hooks/useFetchList";
import { URL_PRODUCT_RATINGS } from "@/commons/constants/apiUrl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PaginationCustom, PaginationWrapper } from "@/components/MerchantDetail/Review/styles";
import useAvatar from "@/commons/hooks/useAvatar";
import Icon from "@/components/commons/Icon/Icon";

interface ReviewItem {
  id: number;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  rating: number;
  description: string;
  createdAt: string;
}
interface ReviewProps {
  productId: number;
}
const Review = ({ productId }: ReviewProps) => {
  const [viewAllMode, setViewAllMode] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const [sortBy, setSortBy] = useState("rating");
  const { getAvatar } = useAvatar();
  const param = { page: page, perPage: perPage, sort_by: sortBy, order_by: "DESC" };
  const { data: ratings, totalPage } = useFetchList<ProductRating>(URL_PRODUCT_RATINGS(productId), param);

  const paramSecondRow = { page: 1, perPage: 3, sort_by: "create_time", order_by: "DESC" };
  const { data: ratingsSecondRow } = useFetchList<ProductRating>(URL_PRODUCT_RATINGS(productId), paramSecondRow);

  useEffect(() => {
    if (viewAllMode) {
      setPage(1);
      setPerPage(9);
      setSortBy("create_time");
    } else {
      setPage(1);
      setPerPage(3);
      setSortBy("rating");
    }
  }, [viewAllMode]);

  function handleChange(page: number) {
    setPage(page);
  }

  const theme = createTheme({
    palette: {
      mode: "light", // or 'dark'
      text: {
        primary: "#fff",
      },
      primary: {
        main: "#fff",
      },
    },
    mode: "light", // or 'dark'
    isDark: false, // or true
  });

  function compareProductRatings(a: ProductRating, b: ProductRating): number {
    // Sort by rating in descending order
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }

    // Sort by create_time in descending order
    const createTimeA = new Date(a.create_time).getTime();
    const createTimeB = new Date(b.create_time).getTime();
    return createTimeB - createTimeA;
  }

  let sortedRatings = ratings;
  if (!viewAllMode) {
    sortedRatings = ratings.slice().sort(compareProductRatings);
  }

  return (
    <ReviewWrapper>
      <TitleWrapper>
        <Title>Customer reviews</Title>
        <ViewAll onClick={() => setViewAllMode(!viewAllMode)}>
          {viewAllMode ? "View less" : "View all"} <Icon icon={RightArrowIcon} gradient isFill />
        </ViewAll>
      </TitleWrapper>
      <ReviewList>
        {sortedRatings.map((rating: ProductRating) => (
          <ReviewItem key={rating.id}>
            <UserWrapper>
              <UserAvatar src={getAvatar(rating.user?.avatar)} />
              <UserContent>
                <UserName>
                  {rating.user?.first_name} {rating.user?.last_name}
                </UserName>
                <CustomRating size="small" value={rating.rating} precision={0.5} />
                <DateTime>{rating.create_time ? moment(rating.create_time).format("DD/MM/yyyy") : ""}</DateTime>
              </UserContent>
            </UserWrapper>
            <ReviewDescription>{rating.description}</ReviewDescription>
          </ReviewItem>
        ))}
      </ReviewList>

      {viewAllMode && (
        <ThemeProvider theme={theme}>
          <PaginationWrapper>
            <PaginationCustom
              count={totalPage}
              variant="outlined"
              shape="rounded"
              color={"primary"}
              page={page}
              onChange={(event: React.ChangeEvent<unknown>, page: number) => handleChange(page)}
            />
          </PaginationWrapper>
        </ThemeProvider>
      )}
    </ReviewWrapper>
  );
};

export default Review;
