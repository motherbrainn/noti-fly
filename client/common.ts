import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#8D8A90",
    },
  },
});
