import { RightArrowIcon } from "@/assets/icons";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CustomRating,
  DateTime,
  PaginationCustom,
  PaginationWrapper,
  ReviewDescription,
  ReviewImage,
  ReviewImageWrapper,
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
import moment from "moment/moment";
import useFetchList from "@/commons/hooks/useFetchList";
import * as React from "react";
import { useEffect, useState } from "react";
import { URL_MERCHANT_STORE_RATING_LIST, URL_PRODUCT_RATINGS } from "@/commons/constants/apiUrl";
import useAvatar from "@/commons/hooks/useAvatar";
import Icon from "@/components/commons/Icon/Icon";
import { isMobile } from "react-device-detect";

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
  storeId: number;
}

const Review = ({ storeId }: ReviewProps) => {
  const [viewAllMode, setViewAllMode] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const [sortBy, setSortBy] = useState("rating");
  const { getAvatar } = useAvatar();
  const param = { page: page, perPage: perPage, sort_by: sortBy, order_by: "DESC" };

  const { data: ratings, totalPage } = useFetchList<StoreRating>(URL_MERCHANT_STORE_RATING_LIST(storeId), param);

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

  function handleChange(page: number) {
    setPage(page);
  }

  function compareProductRatings(a: StoreRating, b: StoreRating): number {
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
    if (isMobile) {
      sortedRatings = sortedRatings.slice(0, 4).sort(compareProductRatings);
    } else {
      sortedRatings = sortedRatings.slice(0, 6).sort(compareProductRatings);
    }
  }

  return (
    <>
      {sortedRatings.length > 0 && (
        <ReviewWrapper>
          <TitleWrapper>
            <Title>Customer reviews</Title>
            <ViewAll onClick={() => setViewAllMode(!viewAllMode)}>
              {viewAllMode ? "View less" : "View all"} <Icon icon={RightArrowIcon} gradient isFill />
            </ViewAll>
          </TitleWrapper>
          <ReviewList>
            {sortedRatings.map((rating: StoreRating, index) => (
              <ReviewItem key={index}>
                <UserWrapper>
                  <UserAvatar src={getAvatar(rating.order?.user?.avatar)} />
                  <UserContent>
                    <UserName>
                      {rating.order?.user?.first_name} {rating.order?.user?.last_name}
                    </UserName>
                    <CustomRating size="small" value={rating.rating} precision={0.5} />
                    <DateTime>{rating.create_time ? moment(rating.create_time).format("DD/MM/yyyy") : ""}</DateTime>
                  </UserContent>
                </UserWrapper>
                <ReviewDescription>{rating.description}</ReviewDescription>

                <ReviewImageWrapper>
                  {rating.data.attachments.map((value, index) => value && <ReviewImage key={index} src={value} />)}
                </ReviewImageWrapper>
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
      )}
    </>
  );
};

export default Review;
