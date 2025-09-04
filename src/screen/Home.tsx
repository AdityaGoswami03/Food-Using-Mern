// import React from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
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
