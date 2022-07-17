import { createTheme, ThemeProvider } from "@mui/material";
import Head from "next/head";
import Instructions from "../components/Instructions";
import MainContainer from "../components/MainContainer";
import styles from "../styles/Home.module.css";

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

const env = process.env.NODE_ENV;
const PROD_API_URL = process.env.NEXT_PUBLIC_PROD_API_URL;
export const serverAddress =
  env === "production" ? PROD_API_URL : "http://localhost:4000";

const Home: any = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <Head>
          <title>NOTI-FLY</title>
          <meta name="description" content="Tipster App" />
        </Head>
        <div>
          <h1>NOTI-FLY</h1>
          <Instructions />
          <MainContainer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
