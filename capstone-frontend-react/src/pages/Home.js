import React from "react";
import HeroIMG from "../assets/heroimg.svg";
import { useGlobalContext } from "../context";

const Home = () => {
  const { isLoggedIn } = useGlobalContext();
  return (
    <section className="section-center hero-center hero">
      <article className="hero-info">
        <div>
          <div className="underline"></div>
          <h1>Welcome to Table Saver</h1>
          <h4>We make reservations easy.</h4>
          {isLoggedIn ? (
            <a href="/restaurant" className="btn">
              Get Started
            </a>
          ) : (
            <a href="/login" className="btn">
              Get Started
            </a>
          )}
        </div>
      </article>
      <img
        src={HeroIMG}
        alt="portfolio image"
        className="hero-img"
        placeholder="blurred"
      ></img>
    </section>
  );
};
export default Home;
