import * as React from "react";
import Search from "../../components/Search/Search";
import { usePlants } from "../../hooks/usePlants";
import PlantCard from "../../components/PlantCard/PlantCard";
import { Plant } from "../../types";
import "./PlantsShop.css";

const PlantsShopPage = () => {
  const { plants, plantsLoading, plantsError } = usePlants();

  if (plantsLoading) {
    return <div>loading...</div>;
  }

  if (plantsError) {
    return <div>error...</div>;
  }
  return (
    <section>
      <h1>Plants</h1>
      <div>
        <Search />
      </div>
      <div className="plants-wrapper">
        <div className="plants">
          {plants &&
            plants.map((plant: Plant) => (
              <PlantCard
                key={plant.id}
                image={plant.image}
                name={plant.name}
                price={plant.price}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default PlantsShopPage;
