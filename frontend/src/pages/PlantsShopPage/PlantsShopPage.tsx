import * as React from "react";
import Search from "../../components/Search/Search";
import { usePlants } from "../../hooks/usePlants";
import PlantCard from "../../components/PlantCard/PlantCard";
import { Plant } from "../../types";
import "./PlantsShop.css";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

const PlantsShopPage = () => {
  const { plants, plantsLoading, plantsError } = usePlants();

  return (
    <>
      {plantsLoading && <Loading />}
      {plantsError && <Error />}
      {plants && (
        <section data-testid="plant-shop-page">
          <h1>Plants</h1>
          <div>
            <Search />
          </div>
          <div className="plants-wrapper">
            <div className="plants">
              {plants.map((plant: Plant) => (
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
      )}
    </>
  );
};

export default PlantsShopPage;
