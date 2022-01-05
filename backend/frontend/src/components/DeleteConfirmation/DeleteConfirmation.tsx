import * as React from "react";
import Button from "@mui/material/Button";
import "./DeleteConfirmation.css";

type DeleteConfirmaionProps = {
  handleDeletePlant: (id: string) => void;
  deleteId: string;
  closeDeleteModal: () => void;
};

const DeleteConfirmation = ({
  handleDeletePlant,
  deleteId,
  closeDeleteModal,
}: DeleteConfirmaionProps) => {
  return (
    <div className="delete-confirmation">
      <h1> Are you sure?</h1>
      <div className="delete-options">
        <Button
          className="yes"
          variant="contained"
          color="error"
          onClick={() => handleDeletePlant(deleteId)}
        >
          Yes, delete this plant.
        </Button>
        <Button variant="contained" color="inherit" onClick={closeDeleteModal}>
          No, don't delete.
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
