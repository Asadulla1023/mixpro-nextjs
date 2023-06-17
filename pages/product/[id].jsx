import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";

import styles from "../../styles/detail.module.css";

import arrow from "../../public/arrow.svg";
import headphones from "../../public/headphone.png";
import star from "../../public/star.svg";
import Image from "next/image";
import { images } from "@/next.config";
import Header from "../components/Header";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [img, setImg] = useState();

  const [counter, setCounter] = useState(1);
  const [focus, setFocus] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
    axios
      .get("http://127.0.0.1:8000/api/v1/products")
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  

  const selected = data.find((dt) => dt.p_id === id);
  selected && console.log(selected);
  if (isLoaded && data && selected) {
    // console.log(img);
    return (
      <>
        <div className={styles.detail}>
          <Header focus={focus} setFocus={setFocus} />
          <div className={styles.container}>
            <div className={styles.small_Nav}>
              <ul className={styles.small_nav}>
                <li>
                  <a href="/">Home</a>
                </li>
                <div className={styles.arrow}>
                  <Image className={styles.arrow__img} src={arrow} alt="" />
                  <Image src={arrow} alt="" />
                </div>
                <li>
                  <a href="/">All products</a>
                </li>
                <div className={styles.arrow}>
                  <Image className={styles.arrow__img} src={arrow} alt="" />
                  <Image src={arrow} alt="" />
                </div>
                <li>
                  <a href="/">JBL TUNE 750 TNC</a>
                </li>
              </ul>
            </div>

            <div className={styles.Detail_section}>
              <div className={styles.right}>
                <Image
                  width={643}
                  height={643}
                  src={selected && selected.image}
                  alt=""
                />
              </div>
              <div className={styles.left}>
                <h1 className={styles.left_title} style={{
                  textTransform: "capitalize"
                }}>{selected && selected.productName}</h1>
                <p className={styles.main_p}>
                  Brand: <span style={{
                    textTransform: "capitalize"
                  }}>{selected && selected.title}</span>
                </p>
                <p className={styles.text}>
                  {selected && selected.desc}
                </p>
                <h3 className={styles.price}>{selected && selected.price * counter} so'm</h3>
                <div className={styles.count}>
                  <button
                    onClick={() => {
                      counter !== 1 && setCounter(counter - 1);
                    }}
                  >
                    -
                  </button>
                  <p>{counter}</p>
                  <button
                    onClick={() => {
                      counter !== 10 && setCounter(counter + 1);
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                style={{
                  cursor: "pointer"
                }}
                  className={styles.AddCard}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <Loader />;
  }
};

export default Detail;
