import Head from "next/head";
import Form from "../components/Form";
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
      </Head>
      <div>
        <h1>notify</h1>
        <Form />
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
