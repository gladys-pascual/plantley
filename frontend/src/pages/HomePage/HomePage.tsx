import * as React from "react";
import HomePageBackground from "../../lib/homepage-background.jpg";
import "./HomePage.css";

const HomePage = () => {
  return (
    <section className="homepage">
      <div className="homepage-background">
        <div className="homepage-background-image">
          <img
            src={HomePageBackground}
            alt="homepage background image, monstera plant"
            className="homepage-background-image"
          />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
