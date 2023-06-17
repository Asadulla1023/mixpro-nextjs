import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/home.module.css";
import Loader from "./components/Loader";
import ContactTop from "./components/ContactTop";

import { Animated } from "react-animated-css";
import Header from "./components/Header";
import Card from "./components/Card";
import Banner from "./components/Banner";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [focus, setFocus] = useState(false);
  const [counter, setCounter] = useState(1);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/v1/products`)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  const paginators = () => {
    const paginator = Math.floor(data.length / 5);
    for (let i = 1; i <= paginator; i++) {
      return (
        <button
          onClick={() => {
            setCounter(counter);
          }}
        >
          Load more
        </button>
      );
    }
  };
  return (
    <>
      <Head>
        <title>Mix pro</title>
        <link rel="icon" href="/mp.jpg" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
        />
      </Head>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.navbar}>
            <Header focus={focus} setFocus={setFocus} />
          </div>
          <div
            className={styles.home}
            onClick={() => {
              setFocus(false);
            }}
          >
            <div className={styles.container}>
              <Banner />
              <h1
                style={{
                  textAlign: "center",
                }}
              >
                Products
              </h1>
              <div className={styles.products}>
                {data.map((e) => {
                  return <Card key={e.id} e={e} />;
                })}
              </div>
              {paginators()}
            </div>
          </div>
          <ContactTop />
        </>
      )}
    </>
  );
}
