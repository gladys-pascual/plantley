import * as React from "react";
import { usePlant } from "../../hooks/usePlant";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import PlantDetails from "../../components/PlantDetails/PlantDetails";

type PlantDetailPageProp = {
  handleAddToCart: (
    quantity: number,
    plantId: number,
    plantUnitPrice: number
  ) => void;
};

const PlantDetailPage = ({ handleAddToCart }: PlantDetailPageProp) => {
  const { id } = useParams();

  const { plantDetails, plantDetailsLoading, plantDetailsError } = usePlant(id);
  return (
    <section>
      {plantDetailsLoading && <Loading />}
      {!plantDetailsLoading && plantDetailsError && <Error />}
      {plantDetails && (
        <PlantDetails
          plantDetails={plantDetails}
          handleAddToCart={handleAddToCart}
        />
      )}
    </section>
  );
};

export default PlantDetailPage;
