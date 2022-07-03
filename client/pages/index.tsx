import Head from "next/head";
import MainContainer from "../components/MainContainer";
import styles from "../styles/Home.module.css";

const env = process.env.NODE_ENV;
const PROD_API_URL = process.env.NEXT_PUBLIC_PROD_API_URL;
export const serverAddress =
  env === "production" ? PROD_API_URL : "http://localhost:4000";

console.log("server address: ", serverAddress);

const Home: any = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Notify</title>
        <meta name="description" content="Notify App" />
      </Head>
      <div>
        <h1>notify</h1>
        <MainContainer />
      </div>
    </div>
  );
};

export default Home;
