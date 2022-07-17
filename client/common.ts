import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";

export const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#8D8A90",
    },
  },
});

export const SubmitButton = styled(Button)({
  color: "#1F1F1F",
});

export const ModalButton = styled(Button)({
  color: "#03DAC5",
});
