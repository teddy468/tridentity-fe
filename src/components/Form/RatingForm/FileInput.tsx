import * as React from "react";
import { useState } from "react";
import { BoxProps, TextFieldProps } from "@mui/material";
import Icon from "@/components/commons/Icon/Icon";
import { UploadIcon } from "@/assets/icons";
import { ErrorMessage, InputArea, PhotoWrapper, StyledInput } from "./styles";
import { isFileTypeValid } from "@/utils/fileHelper";

type Props = TextFieldProps & {
  errorMessage?: React.ReactNode;
  labelProps?: BoxProps;
  errorProps?: BoxProps;
  defaultValue?: string;
  imgPlaceholder?: React.ReactNode;
};

const FileInput = React.forwardRef((props: Props, ref) => {
  const { errorMessage, labelProps, errorProps, defaultValue, imgPlaceholder, onChange, ...inputProps } = props;
  const [thumbnail, setThumbnail] = useState<string>(defaultValue || "");

  const handleChange = (e: React.ChangeEvent<any>) => {
    setThumbnail("");
    const files = e.target.files;

    let fileName = "";
    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (!isFileTypeValid(files[i].name)) {
          e.target.value = null;
          return (fileName = "");
        }
        fileName = fileName + files[i].name + "; ";
      }
      if (fileName.endsWith("; ")) {
        fileName = fileName.substring(0, fileName.length - 2);
      }
      setThumbnail(fileName);
    } else {
      setThumbnail("");
    }
  };

  return (
    <PhotoWrapper>
      <InputArea>
        <Icon icon={UploadIcon} />
        {thumbnail ? thumbnail : "Drag & drop here or browse image..."}
      </InputArea>
      <StyledInput inputRef={ref} type="file" {...inputProps} onChange={handleChange} inputProps={{ multiple: true }} />
      {!!errorMessage && <ErrorMessage {...errorProps}>{errorMessage}</ErrorMessage>}
    </PhotoWrapper>
  );
});

export default FileInput;
