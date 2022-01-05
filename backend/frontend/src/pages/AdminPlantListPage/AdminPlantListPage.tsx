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
import CreatePlantForm from '../../components/CreatePlantForm/CreatePlantForm';
import { useCreatePlant } from '../../hooks/useCreatePlant';
import { CreateOrEditPlantData, Plant } from '../../types';
import { AxiosError } from 'axios';
import EditPlantForm from '../../components/EditPlantForm/EditPlantForm';
import { useUpdatePlant } from '../../hooks/useUpdatePlant';
import { Grid } from '@mui/material';
import usePlantImageUpload from '../../hooks/usePlantImageUpload';
import Snackbar from '@mui/material/Snackbar';
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar';

const AdminPlantList = () => {
  const [createPlantModalIsOpen, setCreatePlantModalIsOpen] =
    React.useState(false);
  const [editPlantModalIsOpen, setEditPlantModalIsOpen] = React.useState(false);
  const [plantIdToEdit, setPlantIdToEdit] = React.useState('');
  const [deleteModalIsOpen, setDeleteModalIsOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState('');
  const [createFailMessage, setCreateFailMessage] = React.useState('');
  const [editFailMessage, setEditFailMessage] = React.useState('');
  const [fileToUpload, setFileToUpload] = React.useState<FormData | null>(null);

  const [openCreatePlantSuccessSnackbar, setOpenCreatePlantSuccessSnackbar] =
    React.useState(false);
  const [openEditPlantSuccessSnackbar, setOpenEditPlantSuccessSnackbar] =
    React.useState(false);
  const [openDeletePlantSuccessSnackbar, setOpenDeletePlantSuccessSnackbar] =
    React.useState(false);
  const [openDeletePlantFailSnackbar, setOpenDeletePlantFailSnackbar] =
    React.useState(false);

  const handleCreatePlantCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenCreatePlantSuccessSnackbar(false);
  };

  const handleEditPlantCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenEditPlantSuccessSnackbar(false);
  };

  const handleDeletePlantCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenDeletePlantSuccessSnackbar(false);
  };

  const handleDeletePlantFailCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenDeletePlantFailSnackbar(false);
  };

  const { plants, plantsLoading, plantsError } = usePlants();

  const openCreatePlantModal = () => {
    setCreatePlantModalIsOpen(true);
  };

  const closeCreatePlantModal = () => {
    setCreatePlantModalIsOpen(false);
  };

  const openEditPlantModal = (id: number) => {
    setEditPlantModalIsOpen(true);
    setPlantIdToEdit(id.toString());
  };

  const closeEditPlantModal = () => {
    setEditPlantModalIsOpen(false);
  };

  const openDeleteModal = (id: number) => {
    setDeleteModalIsOpen(true);
    setDeleteId(id.toString());
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  const queryClient = useQueryClient();

  const onPlantImageUploadSuccess = (data: Plant) => {
    queryClient.invalidateQueries(['getPlant', data.id], { exact: true });
  };

  const { uploadPlantImage } = usePlantImageUpload({
    onSuccess: onPlantImageUploadSuccess,
  });

  const uploadFile = (plantId: string) => {
    if (fileToUpload) {
      fileToUpload.append('plant_id', plantId);
      uploadPlantImage(fileToUpload);
    }
  };

  const createPlantSuccess = (data: Plant) => {
    setCreatePlantModalIsOpen(false);
    setOpenCreatePlantSuccessSnackbar(true);
    queryClient.invalidateQueries(['getPlants'], { exact: true });
    uploadFile(data.id.toString());
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
    setOpenEditPlantSuccessSnackbar(true);
    queryClient.invalidateQueries(['getPlants'], { exact: true });
    queryClient.invalidateQueries(['getPlant', plantIdToEdit], { exact: true });
    uploadFile(plantIdToEdit);
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
    setOpenDeletePlantSuccessSnackbar(true);
    queryClient.invalidateQueries(['getPlants'], { exact: true });
  };

  const deletePlantFail = () => {
    setOpenDeletePlantFailSnackbar(true);
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
    <Grid container direction="column" sx={{ px: 8, py: 4 }}>
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
          <div>
            <Snackbar
              open={openCreatePlantSuccessSnackbar}
              autoHideDuration={6000}
              onClose={handleCreatePlantCloseSnackbar}
            >
              <CustomSnackbar
                onClose={handleCreatePlantCloseSnackbar}
                severity="success"
              >
                Plant item was successfully added.
              </CustomSnackbar>
            </Snackbar>
          </div>

          <div>
            <Snackbar
              open={openEditPlantSuccessSnackbar}
              autoHideDuration={6000}
              onClose={handleEditPlantCloseSnackbar}
            >
              <CustomSnackbar
                onClose={handleEditPlantCloseSnackbar}
                severity="success"
              >
                Plant item was successfully updated.
              </CustomSnackbar>
            </Snackbar>
          </div>

          <div>
            <Snackbar
              open={openDeletePlantSuccessSnackbar}
              autoHideDuration={6000}
              onClose={handleDeletePlantCloseSnackbar}
            >
              <CustomSnackbar
                onClose={handleDeletePlantCloseSnackbar}
                severity="success"
              >
                Plant item was successfully deleted.
              </CustomSnackbar>
            </Snackbar>
          </div>

          <div>
            <Snackbar
              open={openDeletePlantFailSnackbar}
              autoHideDuration={6000}
              onClose={handleDeletePlantFailCloseSnackbar}
            >
              <CustomSnackbar
                onClose={handleDeletePlantFailCloseSnackbar}
                severity="error"
              >
                Something went wrong, please try again.
              </CustomSnackbar>
            </Snackbar>
          </div>

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
                      <Link
                        to={`/plants/${row.id}`}
                        className="plant-name-link"
                      >
                        {' '}
                        {row.name}
                      </Link>
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
          onFileChange={setFileToUpload}
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
          onFileChange={setFileToUpload}
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
    </Grid>
  );
};

export default AdminPlantList;
