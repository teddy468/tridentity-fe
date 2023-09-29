import { HeaderSearchIcon } from "@/assets/icons";
import { ClearOutlined } from "@mui/icons-material";
import { InputAdornment, TextFieldProps } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonSearch, SearchTextField } from "./styles";

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
    onSearch(event.target.value);
  };

  const handleClick = (): void => {
    setText("");
    setShowClearIcon("none");
    onSearch("");
  };

  const {
    handleSubmit,
    formState: {},
  } = useForm<StoreItem>();

  const onSubmit = () => {
    onSearch(text ? text : "");
  };

  return (
    <form id="app" onSubmit={handleSubmit(onSubmit)}>
      <SearchTextField
        size={"medium"}
        variant="outlined"
        value={text}
        onChange={handleChange}
        placeholder={"Search for restaurant name"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ButtonSearch variant="text" type="submit">
                <HeaderSearchIcon />
              </ButtonSearch>
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
