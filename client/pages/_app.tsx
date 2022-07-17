import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Press Start 2P cursive",
  },
  palette: {
    //focused cell color
    primary: {
      main: "#AC6AFB",
    },
    text: {
      //input text color
      primary: "#AC6AFB",
      //input placeholder color
      secondary: "#8D8A90",
    },
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          // disable hover behavior for divider
          pointerEvents: "none",
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
