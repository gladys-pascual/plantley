import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Error from '../../components/Error/Error';
import Loading from '../../components/Loading/Loading';
import useMyOrders from '../../hooks/useMyOrders';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

const MyOrdersPage = () => {
  const { myOrders, myOrdersError, myOrdersLoading } = useMyOrders();

  if (myOrdersLoading) {
    return <Loading />;
  }

  if (!myOrdersLoading && myOrdersError) {
    return <Error />;
  }

  return (
    <Grid container direction="column" sx={{ px: 8, py: 4 }}>
      <Link to="/users/profile" className="go-back-link">
        <div>
          <KeyboardBackspaceOutlinedIcon fontSize="small" />
        </div>
        <p>go back</p>
      </Link>
      <Grid item>
        <h1>My Orders</h1>
      </Grid>
      <Grid item>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order number</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Paid</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myOrders!.map((order) => (
                <TableRow
                  component={Link}
                  to={`/order/${order.id}`}
                  key={order.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    textDecoration: 'none',
                  }}
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell scope="row">
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      weekday: 'long',
                      hour: '2-digit',
                      hour12: false,
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </TableCell>
                  <TableCell>€ {order.totalPrice}</TableCell>
                  <TableCell>{order.isPaid ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default MyOrdersPage;
