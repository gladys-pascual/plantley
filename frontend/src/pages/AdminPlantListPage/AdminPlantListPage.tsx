import * as React from 'react';
import { usePlants } from '../../hooks/usePlants';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Link } from 'react-router-dom';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import './AdminPlantListPage.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from 'react-modal';
import DeleteConfirmation from '../../components/DeleteConfirmation/DeleteConfirmation';
import { useDeletePlant } from '../../hooks/useDeletePlant';
import { useQueryClient } from 'react-query';
import Alert from '@mui/material/Alert';
import CreatePlantForm from '../../components/CreatePlantForm/CreatePlantForm';
import { useCreatePlant } from '../../hooks/useCreatePlant';
import { CreateOrEditPlantData } from '../../types';
import { AxiosError } from 'axios';
import EditPlantForm from '../../components/EditPlantForm/EditPlantForm';
import { useUpdatePlant } from '../../hooks/useUpdatePlant';

const AdminPlantList = () => {
  const [createPlantModalIsOpen, setCreatePlantModalIsOpen] =
    React.useState(false);
  const [editPlantModalIsOpen, setEditPlantModalIsOpen] = React.useState(false);
  const [plantIdToEdit, setPlantIdToEdit] = React.useState('');
  const [deleteModalIsOpen, setDeleteModalIsOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState('');
  const [isCreateSuccess, setIsCreateSuccess] = React.useState(false);
  const [isEditSuccess, setIsEditSuccess] = React.useState(false);
  const [createFailMessage, setCreateFailMessage] = React.useState('');
  const [editFailMessage, setEditFailMessage] = React.useState('');
  const [isDeleteSuccess, setIsDeleteSuccess] = React.useState(false);
  const [isDeleteFail, setIsDeleteFail] = React.useState(false);

  const { plants, plantsLoading, plantsError } = usePlants();

  const openCreatePlantModal = () => {
    setCreatePlantModalIsOpen(true);
    setIsCreateSuccess(false);
    setIsDeleteSuccess(false);
    setIsDeleteFail(false);
  };

  const closeCreatePlantModal = () => {
    setCreatePlantModalIsOpen(false);
  };

  const openEditPlantModal = (id: number) => {
    setEditPlantModalIsOpen(true);
    setPlantIdToEdit(id.toString());
    setIsCreateSuccess(false);
    setIsDeleteSuccess(false);
    setIsDeleteFail(false);
  };

  const closeEditPlantModal = () => {
    setEditPlantModalIsOpen(false);
  };

  const openDeleteModal = (id: number) => {
    setDeleteModalIsOpen(true);
    setDeleteId(id.toString());
    setIsCreateSuccess(false);
    setIsDeleteSuccess(false);
    setIsDeleteFail(false);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  const queryClient = useQueryClient();

  const createPlantSuccess = () => {
    setCreatePlantModalIsOpen(false);
    setIsCreateSuccess(true);
    queryClient.invalidateQueries(['getPlants'], { exact: true });
  };

  const createPlantFail = (error: AxiosError) => {
    if (error?.response?.status === 401) {
      setCreateFailMessage(error?.response?.data.detail);
    } else {
      setCreateFailMessage('Something went wrong, please try again.');
    }
  };

  const { createPlant } = useCreatePlant(createPlantSuccess, createPlantFail);

  const editPlantSuccess = () => {
    setEditPlantModalIsOpen(false);
    setIsEditSuccess(true);
    queryClient.invalidateQueries(['getPlants'], { exact: true });
    queryClient.invalidateQueries(['getPlant', plantIdToEdit], { exact: true });
  };

  const editPlantFail = (error: AxiosError) => {
    if (error?.response?.status === 401) {
      setEditFailMessage(error?.response?.data.detail);
    } else {
      setEditFailMessage('Something went wrong, please try again.');
    }
  };

  const { updatePlantItem } = useUpdatePlant(editPlantSuccess, editPlantFail);

  const deletePlantSuccess = () => {
    setIsDeleteSuccess(true);
    queryClient.invalidateQueries(['getPlants'], { exact: true });
  };

  const deletePlantFail = () => {
    setIsDeleteFail(true);
  };

  const { deletePlantItem } = useDeletePlant(
    deletePlantSuccess,
    deletePlantFail
  );

  const handleCreatePlant = (data: CreateOrEditPlantData) => {
    createPlant(data);
  };

  const handleEditPlant = (formData: CreateOrEditPlantData) => {
    updatePlantItem({ formData, id: plantIdToEdit });
  };

  const handleDeletePlant = (id: string) => {
    deletePlantItem(id);
    setDeleteModalIsOpen(false);
  };

  if (plantsLoading) {
    return <Loading />;
  }

  if (!plantsLoading && plantsError) {
    return <Error />;
  }

  if (!plants) {
    return null;
  }

  const rows = plants.map((plant) => {
    return {
      id: plant.id,
      name: plant.name,
      potSize: plant.potSize,
      price: `€${plant.price}`,
    };
  });

  return (
    <>
      <section className="admin-plant-list-page-wrapper">
        <div className="admin-plant-list-page">
          <Link to="/users/profile" className="go-back-link">
            <div>
              <KeyboardBackspaceOutlinedIcon fontSize="small" />
            </div>
            <p>go back</p>
          </Link>
          <div className="heading-and-create-button">
            <h1>Manage plants</h1>
            <Button
              variant="contained"
              endIcon={<AddOutlinedIcon />}
              onClick={() => openCreatePlantModal()}
            >
              <Typography variant="button">Create</Typography>
            </Button>
          </div>
          {isCreateSuccess && (
            <Alert
              sx={{ width: '50%' }}
              severity="success"
              className="status-alert"
              onClose={() => {
                setIsCreateSuccess(false);
              }}
            >
              Plant item was successfully added.
            </Alert>
          )}
          {isEditSuccess && (
            <Alert
              sx={{ width: '50%' }}
              severity="success"
              className="status-alert"
              onClose={() => {
                setIsEditSuccess(false);
              }}
            >
              Plant item was successfully updated.
            </Alert>
          )}

          {isDeleteSuccess && (
            <Alert
              sx={{ width: '50%' }}
              severity="success"
              className="status-alert"
              onClose={() => {
                setIsDeleteSuccess(false);
              }}
            >
              Plant item was successfully deleted.
            </Alert>
          )}
          {isDeleteFail && (
            <Alert
              sx={{ width: '50%' }}
              severity="error"
              className="status-alert"
              onClose={() => {
                setIsDeleteFail(false);
              }}
            >
              Something went wrong, please try again.
            </Alert>
          )}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Plant Name</TableCell>
                  <TableCell>Pot Size</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.potSize}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => openEditPlantModal(row.id)}>
                        <ModeEditOutlineIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => openDeleteModal(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </section>
      <Modal
        isOpen={createPlantModalIsOpen}
        onRequestClose={closeCreatePlantModal}
        contentLabel="Create a plant item"
        ariaHideApp={false}
        className="Modal-Create-Plant"
        overlayClassName="Overlay-Create-Plant"
      >
        <CreatePlantForm
          handleCreatePlant={handleCreatePlant}
          closeCreatePlantModal={closeCreatePlantModal}
          createFailMessage={createFailMessage}
        />
      </Modal>
      <Modal
        isOpen={editPlantModalIsOpen}
        onRequestClose={closeEditPlantModal}
        contentLabel="Edit a plant item"
        ariaHideApp={false}
        className="Modal-Edit-Plant"
        overlayClassName="Overlay-Edit-Plant"
      >
        <EditPlantForm
          handleEditPlant={handleEditPlant}
          closeEditPlantModal={closeEditPlantModal}
          plantIdToEdit={plantIdToEdit}
          editFailMessage={editFailMessage}
        />
      </Modal>
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Confirmation"
        ariaHideApp={false}
        className="Modal-Delete"
        overlayClassName="Overlay-Delete"
      >
        <DeleteConfirmation
          handleDeletePlant={handleDeletePlant}
          deleteId={deleteId}
          closeDeleteModal={closeDeleteModal}
        />
      </Modal>
    </>
  );
};

export default AdminPlantList;
