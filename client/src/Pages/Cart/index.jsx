import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Stack, TableFooter, Typography } from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { add, clear, remove } from "../../Store/Slices/CartSlice";
export default function Cart() {
  const { totalPrice, items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  if (items.length == 0)
    return <Typography variant="h3">Your Cart is Empty</Typography>;
  const tableItems = items?.map((pr, index) => (
    <TableRow key={pr?.id}>
      <TableCell>{index + 1}</TableCell>
      <TableCell align="center">{pr?.name}</TableCell>
      <TableCell align="center">
        <img
          src={
            import.meta.env.VITE_BASE_FILE +
            pr?.img?.[0]?.formats?.thumbnail?.url
          }
        />
      </TableCell>
      <TableCell align="center">{pr?.price}</TableCell>
      <TableCell align="center">{pr?.cartQuantity}</TableCell>
      <TableCell align="center">{pr?.cartQuantity * pr?.price}</TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          onClick={() => dispatch(remove(pr?.id))}
          color="error"
        >
          -
        </Button>
        <Button
          variant="contained"
          disabled={pr?.cartQuantity>=pr?.quantity}
          onClick={() => dispatch(add(pr))}
          color="success"
        >
          +
        </Button>
      </TableCell>
    </TableRow>
  ));
  return (
    <Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Total Price</TableCell>
              <TableCell align="center">Total Price</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableItems}</TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} align="right">
                Total Price
              </TableCell>
              <TableCell align="center">${totalPrice}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Button onClick={() => dispatch(clear())}>Clear Cart</Button>
    </Stack>
  );
}
