import * as React from "react";
import { usePlants } from "../../hooks/usePlants";

const PlantsShopPage = () => {
  const { plants, plantsLoading, plantsError } = usePlants();
  console.log(`plants`, plants);
  console.log(`plantsLoading`, plantsLoading);
  console.log(`plantsError`, plantsError);
  return (
    <section>
      <h1>PlantsShopPage</h1>
    </section>
  );
};

export default PlantsShopPage;
