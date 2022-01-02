import * as React from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import "./CreatePlantForm.css";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CreateOrEditPlantData } from "../../types";

type CreatePlantFormProps = {
  handleCreatePlant: (data: CreateOrEditPlantData) => void;
  closeCreatePlantModal: () => void;
  createFailMessage: string;
};

const CreatePlantForm = ({
  handleCreatePlant,
  closeCreatePlantModal,
  createFailMessage,
}: CreatePlantFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data: CreateOrEditPlantData) => {
    handleCreatePlant(data);
  };

  return (
    <div>
      <div className="create-plant-form-wrapper">
        <form className="create-plant-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="heading-and-close">
            <h1>Create a plant item</h1>
            <IconButton onClick={closeCreatePlantModal}>
              <CloseIcon />
            </IconButton>
          </div>
          <section>
            <div className="plant-label-and-input">
              <label htmlFor="name" className="label">
                Plant Name
              </label>
              <input
                id="name"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("name", {
                  required: "This is required.",
                  maxLength: 20,
                })}
                type="text"
                placeholder="Plant Name"
              />
            </div>
            <div className="error-message-container plant">
              <p
                className={
                  errors.name
                    ? "error-message plant-form-error"
                    : "error-message-hidden error-message plant-form-error"
                }
                role="alert"
              >
                {errors.name && errors.name.message}
              </p>
            </div>

            <div className="plant-label-and-input">
              <label htmlFor="price" className="label">
                Price
              </label>
              <input
                id="price"
                aria-invalid={errors.passward ? "true" : "false"}
                {...register("price", {
                  required: "This is required.",
                })}
                type="text"
                placeholder="Price"
              />
            </div>
            <div className="error-message-container">
              <p
                className={
                  errors.price
                    ? "error-message plant-form-error"
                    : "error-message-hidden error-message plant-form-error"
                }
                role="alert"
              >
                {errors.price && errors.price.message}
              </p>
            </div>

            <div className="plant-label-and-input">
              <label htmlFor="countInStock" className="label">
                Count
              </label>
              <input
                id="countInStock"
                {...register("countInStock", {
                  required: "This is required.",
                })}
                type="number"
                placeholder="Count in stock"
              />
            </div>
            <div className="error-message-container">
              <p
                className={
                  errors.price
                    ? "error-message plant-form-error"
                    : "error-message-hidden error-message plant-form-error"
                }
                role="alert"
              >
                {errors.countInStock && errors.countInStock.message}
              </p>
            </div>

            <div className="plant-label-and-image-input">
              <label htmlFor="image" className="label">
                Plant Image
              </label>
              <input
                id="image"
                {...register("image")}
                type="file"
                placeholder="image"
                className="image"
              />
            </div>

            <div className="plant-label-and-input pot-size-wrapper">
              <label htmlFor="potSize" className="label">
                Pot Size
              </label>
              <input
                id="potSize"
                {...register("potSize")}
                type="text"
                placeholder="Pot Size"
              />
            </div>

            <div className="plant-label-and-input input-margin-top">
              <label htmlFor="description" className="label">
                Description
              </label>
              <textarea
                id="description"
                {...register("description")}
                placeholder="Description"
                className="textarea"
              />
            </div>

            <div className="plant-label-and-input input-margin-top">
              <label htmlFor="potSize" className="label">
                Plant Size
              </label>
              <input
                id="filterByPlantSize"
                {...register("filterByPlantSize")}
                type="text"
                placeholder="Plant size"
              />
            </div>

            <div className="plant-label-and-input input-margin-top">
              <label htmlFor="ligtReq" className="label">
                Light
              </label>
              <input
                id="filterByLightRequirements"
                {...register("filterByLightRequirements")}
                type="text"
                placeholder="Light requirements"
              />
            </div>

            <div className="plant-label-and-input input-margin-top">
              <label htmlFor="light" className="label">
                Light
              </label>
              <textarea
                id="light"
                {...register("light")}
                placeholder="Light description"
                className="textarea"
              />
            </div>

            <div className="plant-label-and-input input-margin-top">
              <label htmlFor="water" className="label">
                Water
              </label>
              <textarea
                id="water"
                {...register("water")}
                placeholder="Water description"
                className="textarea"
              />
            </div>

            <div className="plant-label-and-input input-margin-top">
              <label htmlFor="tips" className="label">
                Tips
              </label>
              <textarea
                id="tips"
                {...register("tips")}
                placeholder="Tips description"
                className="textarea"
              />
            </div>
            <div className="plant-label-and-input input-margin-top">
              <label htmlFor="toxicity" className="label">
                Toxicity
              </label>
              <textarea
                id="toxicity"
                {...register("toxicity")}
                placeholder="Toxicity description"
                className="textarea"
              />
            </div>
          </section>

          <div className="create-plant-butttons-wrapper">
            <div className="create-plant-buttons">
              {createFailMessage && (
                <p className="incorrect-details">{createFailMessage}</p>
              )}
              <Button
                onClick={closeCreatePlantModal}
                variant="contained"
                color="inherit"
              >
                <Typography variant="button"> Cancel</Typography>
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="create-plant-submit-button"
                type="submit"
              >
                <Typography variant="button"> Create</Typography>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlantForm;
