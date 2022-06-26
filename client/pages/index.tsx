import Head from "next/head";
import PhoneNumberInput from "../components/PhoneNumberInput";
import QrCode from "../components/QrCode";
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>notify</h1>
        <PhoneNumberInput />
        <div>QR code name</div>
        <div>
          QR code prompt ie: Are you sure you want to notify the admin this
          machine is broken?
        </div>
      </div>
      <QrCode />
    </div>
  );
};

export default Home;
