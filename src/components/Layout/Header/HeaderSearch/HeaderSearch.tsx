import React, { FC, useEffect, useState } from "react";
import { SearchIcon, SearchInput, StyledButton, StyledCloseIcon } from "./styles";
import { useForm } from "react-hook-form";
import { Button, InputAdornment } from "@mui/material";
import { useRouter } from "next/router";
import useQuery from "@/commons/hooks/useQuery";
import { routers } from "@/commons/constants/routers";

interface SearchProps {
  onCloseIconClick?: () => void;
}
const HeaderSearch: FC<SearchProps> = ({ onCloseIconClick }: SearchProps) => {
  const router = useRouter();
  const query = useQuery<MerchantsQuery>();

  useEffect(() => {
    const { keyword } = query;
    setText(keyword ? keyword : "");
  }, [query]);

  const onSubmit = () => {
    const { address, lat, lng, ...newQuery } = query;
    newQuery.keyword = text;
    router.push({ pathname: routers.MARKETPLACE, query: newQuery });
    onCloseIconClick && onCloseIconClick();
  };
  const [text, setText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value);
  };

  const {
    handleSubmit,
    formState: {},
  } = useForm<SearchProduct>();
  return (
    <form id="app" onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <SearchInput
        style={{ width: "100%" }}
        value={text}
        onChange={handleChange}
        placeholder="Search for store, product, hashtag"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <StyledButton variant="text" type="submit">
                <SearchIcon />
              </StyledButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <StyledCloseIcon onClick={onCloseIconClick} />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default HeaderSearch;
