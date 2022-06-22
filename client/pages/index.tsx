import Head from "next/head";
import styles from "../styles/Home.module.css";

const env = process.env.NODE_ENV;

export const serverAddress =
  env === "development"
    ? "http://localhost:4000"
    : "https://zzzzz.herokuapp.com";

const sendTextMessage = async () => {
  console.log("hi");
  const response = await fetch(`${serverAddress}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber: "test" }),
    credentials: "include",
  });

  const data = await response.json();
  return data;
};

const Home: any = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Notify</title>
        <meta name="description" content="Notify App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={() => sendTextMessage()}>hi</button>
    </div>
  );
};

export default Home;
