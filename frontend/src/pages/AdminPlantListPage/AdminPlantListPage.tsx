import * as React from "react";
import { usePlants } from "../../hooks/usePlants";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import "./AdminPlantListPage.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminPlantList = () => {
  const { plants, plantsLoading, plantsError } = usePlants();

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
      price: `€ ${plant.price}`,
    };
  });

  return (
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
            // onClick={() => handleLogOut()}
            variant="contained"
            endIcon={<AddOutlinedIcon />}
          >
            <Typography variant="button"> Create </Typography>
          </Button>
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
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.potSize}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    <IconButton>
                      <ModeEditOutlineIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton>
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
  );
};

export default AdminPlantList;
