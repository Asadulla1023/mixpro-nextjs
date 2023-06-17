import React, { useEffect, useState } from "react";
import styles from "../../styles/card.module.css";
import axios from "axios";
import Link from "next/link";
import Loader from "./Loader";
import Image from "next/image";

const Card = ({ e }) => {
  const last = 450
  return (
    <Link className={styles.cardLink} href={`/product/${e.p_id}`}>
      <div className={styles.card}>
        <h1
          style={{
            textTransform: "capitalize",
          }}
        >
          {e.productName}
        </h1>
        <div
          className={styles.img}
          style={{
            backgroundImage: `url(${e.image})`,
          }}
        ></div>
        <div className={styles.card__tag}>
          <h2>{`${e.desc.substring(0, last)}`}...</h2>
          <p className={styles.price}>{e.price} so'm</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
