import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/header.module.css";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Animated } from "react-animated-css";

export default function Header({ focus, setFocus }) {
  const [data, setData] = useState([]);
  const { data: session } = useSession();

  const [nav, setNav] = useState(false);
  const changeBgHandler = () => {
    if (window.scrollY >= 14.41) {
      setNav(true);
    } else {
      setNav(false);
    }
  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/products")
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", changeBgHandler);
  }, []);

  useEffect(() => {
    if (focus === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [focus]);

  const [filteredList, setFilteredList] = new useState();

  const inputSearchRef = useRef("");

  const filterBySearch = (e) => {
    const query = e.target.value;
    let updatedList = [...data];
    updatedList = updatedList.filter((item) => {
      return item.productName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(updatedList);
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
        />
      </Head>
      <div className={nav ? styles.navbarContentActive : styles.navbarContent}>
        <div className={styles.container}>
          <div className={styles.top_Nav}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Image alt="qwefwef" src={"/logo.png"} width={60} height={35} />
              <h1
                style={{
                  fontSize: 45,
                  lineHeight: 0,
                }}
              >
                MIXPro
              </h1>
            </div>
            <div className={styles.search_section}>
              <input
                style={
                  focus
                    ? {
                        outlineColor: "#14B8E4",
                      }
                    : null
                }
                onChange={filterBySearch}
                onFocus={() => {
                  setFocus(true);
                }}
                ref={inputSearchRef}
                onBlur={() => {
                  setFocus(false);
                }}
                type="text"
                placeholder="Search..."
              />
              <button
                onClick={() => {
                  setFocus(!focus);
                }}
                style={
                  focus
                    ? {
                        borderColor: "#14B8E4",
                        cursor: "pointer",
                      }
                    : {
                        cursor: "pointer",
                      }
                }
              >
                <Image width={19} height={19} src="/lupa.svg" alt="" />
              </button>
            </div>
            <div className={styles.images}>
              <button>
                <Image width={20} height={23} src="/notification.svg" alt="" />
              </button>
              <Link
                href={session && session.user ? "/profile" : "/auth/signup"}
                style={{
                  color: "#000",
                }}
              >
                <Image width={23} height={23} src="/notification1.svg" alt="" />
              </Link>
              <button>
                <Image width={26} height={20} src="/notification2.svg" alt="" />
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#f5f5f5",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className={styles.container}
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              // display: "flex"
            }}
          >
            <nav className={styles.navigation}>
              <ul className={styles.list}>
                <li>
                  <Link href="/">Telefonlar</Link>
                </li>
                <li>
                  <Link href="/">Kamera</Link>
                </li>
                <li>
                  <Link href="/">shliftlar</Link>
                </li>
                <li>
                  <Link href="/">Pastki platalar</Link>
                </li>
                <li>
                  <Link href="/">Batareykalar</Link>
                </li>
                <li>
                  <Link href="/">Aloqaga chiqish</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className={focus ? styles.inputFocused : styles.inputBlured}>
          <Animated
            animationOutDuration={100}
            animationIn="fadeInDown"
            animationOut="fadeInRight"
          >
            <div className={styles.inputCont}>
              {filteredList ? (
                filteredList.map((e, index) => {
                  return (
                    <Link
                      key={index}
                      href={`/product/${e.p_id}`}
                      className={styles.filteredItem}
                    >
                      <div className={styles.Left_section}>
                        <h1>{e.productName}</h1>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: 12,
                            gap: 10,
                          }}
                        >
                          <h4
                            style={{
                              textTransform: "uppercase",
                            }}
                          >
                            {e.title}
                          </h4>
                          <p
                            style={{
                              background: "#000",
                              borderRadius: 30,
                              color: "#fff",
                              paddingLeft: 10,
                              paddingRight: 10,
                              paddingTop: 3,
                              paddingBottom: 3,
                            }}
                          >
                            {e.price}so'm
                          </p>
                        </div>
                      </div>
                      <div className={styles.Right_section}>
                        <Image
                          alt="qwefwef"
                          src={e.image}
                          width={100}
                          height={100}
                        />
                      </div>
                    </Link>
                  );
                })
              ) : (
                <Link href={`#`} className={styles.filteredItem}>
                  <div className={styles.Left_section}>
                    <h2>
                      No Products Found - <i>404</i>
                    </h2>
                  </div>
                </Link>
              )}
            </div>
          </Animated>
        </div>
      </div>
    </>
  );
}
