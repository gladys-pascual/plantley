import * as React from "react";
import { usePlant } from "../../hooks/usePlant";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import PlantDetails from "../../components/PlantDetails/PlantDetails";

const PlantDetailPage = () => {
  const { id } = useParams();

  const { plantDetails, plantDetailsLoading, plantDetailsError } = usePlant(id);
  return (
    <section>
      {plantDetailsLoading && <Loading />}
      {plantDetailsError && <Error />}
      {plantDetails && <PlantDetails plantDetails={plantDetails} />}
    </section>
  );
};

export default PlantDetailPage;
