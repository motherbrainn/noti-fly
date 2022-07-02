import Head from "next/head";
import MainContainer from "../components/MainContainer";
import styles from "../styles/Home.module.css";

const env = process.env.NODE_ENV;

export const serverAddress =
  env === "development"
    ? "http://localhost:4000"
    : "https://zzzzz.herokuapp.com";

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
