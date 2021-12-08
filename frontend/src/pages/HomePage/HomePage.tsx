import * as React from "react";
import HomePageBackground from "../../lib/homepage-background.jpg";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="homepage">
      <div className="homepage-background">
        <div className="homepage-background-image">
          <img
            src={HomePageBackground}
            alt="homepage background, monstera plant"
            className="homepage-background-image"
          />
        </div>
        <div className="banner-text">
          <Link to="/plants" className="shop-now-link">
            Shop now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
