// import React from "react";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel />
      </div>
      <div>
        <Card />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
