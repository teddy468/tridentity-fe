import * as React from "react";
import { Box, BoxProps, TextField, styled } from "@mui/material";
import { TextFieldProps } from "@mui/material";
import { UserCircleAddIcon } from "@/assets/icons";
import { useState } from "react";

const FormLabel = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 180,
  height: 180,
  backgroundClip: "padding-box",
  border: "1px solid transparent",
  backgroundColor: theme.palette.common.black,
  borderRadius: 20,
  cursor: "pointer",
  "&:before": {
    content: `""`,
    position: "absolute",
    inset: 0,
    zIndex: -1,
    margin: "-1px",
    background: "linear-gradient(to right bottom, #FDCD9D, #F7EF82)",
    borderRadius: "inherit",
  },
}));

const StyledInput = styled(TextField)(() => ({
  display: "none",
}));

const ErrorMessage = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  width: "100%",
  color: theme.palette.error.light,
  textAlign: "left",
  marginTop: 8,
  fontSize: 12,
}));

const Image = styled("img")(() => ({
  width: "100%",
  height: "100%",
  borderRadius: 20,
}));

const PlaceHolder = styled(UserCircleAddIcon)(() => ({}));

type Props = TextFieldProps & {
  errorMessage?: React.ReactNode;
  labelProps?: BoxProps;
  errorProps?: BoxProps;
  defaultValue?: string;
  imgPlaceholder?: React.ReactNode;
};

const ImageInput = React.forwardRef((props: Props, ref) => {
  const { errorMessage, labelProps, errorProps, defaultValue, imgPlaceholder, onChange, ...inputProps } = props;
  const [thumbnail, setThumbnail] = useState<string>(defaultValue || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else setThumbnail("");
  };

  return (
    <FormLabel {...labelProps} component="label">
      {thumbnail ? <Image src={thumbnail} /> : imgPlaceholder || <PlaceHolder />}
      <StyledInput
        inputRef={ref}
        size="small"
        placeholder="Email/Username"
        {...inputProps}
        inputProps={{ accept: "image/*" }}
        type="file"
        onChange={handleChange}
      />
      {!!errorMessage && <ErrorMessage {...errorProps}>{errorMessage}</ErrorMessage>}
    </FormLabel>
  );
});

export default ImageInput;
