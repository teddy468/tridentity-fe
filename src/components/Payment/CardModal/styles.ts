import { FormLabel, styled, TextField } from "@mui/material";

export const StyledForm = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
  minWidth: 300,
}));

export const StyledInput = styled(TextField)(() => ({
  marginBottom: 5,

  input: {
    height: 36,
    background: "white",
    border: "none",
    padding: "10px 20px 10px 10px",
    boxSizing: "border-box",
    borderRadius: "5px",
    width: "100%",
    color: "#444444",
  },
}));
export const StyledLabel = styled(FormLabel)(() => ({
  marginTop: 15,
  marginBottom: 5,
}));
