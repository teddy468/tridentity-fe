import React, { useState } from "react";
import { Button, InputAdornment, TextFieldProps } from "@mui/material";
import { HeaderSearchIcon } from "@/assets/icons";
import { ClearOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { SearchTextField } from "@/components/MerchantDetail/SearchProduct/styles";

type Props = TextFieldProps & {
  onSearch: (value: string) => void;
};

const TypeSearch = (props: Props) => {
  const { onSearch } = props;
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [text, setText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    setText(event.target.value);
  };

  const handleClick = (): void => {
    setText("");
    setShowClearIcon("none");
    onSearch("");
  };

  const {
    handleSubmit,
    formState: {},
  } = useForm<SearchProduct>();

  const onSubmit = (value: SearchProduct) => {
    onSearch(text ? text : "");
  };

  return (
    <form id="app" onSubmit={handleSubmit(onSubmit)}>
      <SearchTextField
        size={"medium"}
        variant="outlined"
        value={text}
        onChange={handleChange}
        placeholder={"Search for items"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Button variant="text" type="submit">
                <HeaderSearchIcon />
              </Button>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end" style={{ display: showClearIcon }} onClick={handleClick}>
              <ClearOutlined stroke={"white"} />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default TypeSearch;
