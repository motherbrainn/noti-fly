import { createTheme, ThemeProvider } from "@mui/material";
import Head from "next/head";
import Instructions from "../components/Instructions";
import MainContainer from "../components/MainContainer";
import styles from "../styles/Home.module.css";

const env = process.env.NODE_ENV;
const PROD_API_URL = process.env.NEXT_PUBLIC_PROD_API_URL;
export const serverAddress =
  env === "production" ? PROD_API_URL : "http://localhost:4000";

const Home: any = () => {
  return (
    <div className="container">
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
  );
};

export default Home;
