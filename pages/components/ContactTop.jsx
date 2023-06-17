import Link from "next/link";
import React from "react";

import styles from "../../styles/topnavbar.module.css"

const ContactTop = () => {
  return (
    <div className={styles.topNavbar}>
      <div className={styles.container}>
        <div className={styles.leftBar}>
          <Link href={"tel: +998772501023"}>+998 77 258 1023</Link>
          <div className={styles.column}/>
          <Link href={"mailto: fayzullox512mi@gmail.com"}>
            fayzulox512mi@gmail.com
          </Link>
        </div>
        <div className={styles.rightBar}>
            <select>
                <option value={"English"}>English</option>
                <option value={"Russian"}>Russian</option>
                <option value={"Uzbek"}>Uzbek</option>
            </select>
            <div className={styles.column}/>
            <h3>Order trackink</h3>
        </div>
      </div>
    </div>
  );
};

export default ContactTop;
