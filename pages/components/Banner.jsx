import React, { useState } from "react";
import styles from "../../styles/banner.module.css";
import Image from "next/image";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import axios from "axios";
import "pure-react-carousel/dist/react-carousel.es.css";

const Banner = () => {
  const [data, setData] = useState([]);
  React.useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/products")
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const latest = data.slice(0, -5);
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={5}
      currentSlide={0}
      interval={2000}
      // isPlaying={true}
      infinite={true}
      
      className={styles.carousel}
    >
      <Slider>
        {latest.map((e, index) => {
          return (
            <Slide index={index} key={index}>
              <div className={styles.cartItem}>
                <div className={styles.cartItemLeft}>
                  <h3
                    style={{
                      textTransform: "uppercase",
                    }}
                  >
                    {e.title}
                  </h3>
                  <h2
                    style={{
                      textTransform: "uppercase",
                    }}
                  >
                    {e.productName}
                  </h2>
                  <p>
                    {e.desc}
                  </p>
                  <button type="button">Shop now</button>
                </div>
                <Image src={e.image} width={643} height={643} alt="" />
              </div>
            </Slide>
          );
        })}
      </Slider>
      <div className={styles.controller}>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </div>
    </CarouselProvider>
  );
};

export default Banner;
