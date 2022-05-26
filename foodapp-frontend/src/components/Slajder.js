import React from "react";
import { Carousel } from "react-bootstrap";

const Slajder = () => {
  return (
    <>
      <Carousel fade>
        <Carousel.Item interval={5000}>
          <div className="bg1 vh-100"></div>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <div className="bg3 vh-100"></div>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <div className="bg4 vh-100"></div>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <div className="bg5 vh-100"></div>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Slajder;
