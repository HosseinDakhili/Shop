import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Stack,
  Badge,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../Store/Slices/AuthSlice";

export default function Navbar() {
  const cartLength = useSelector((state) => state.cart.items)?.length;
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <AppBar position="static" color="default" elevation={3}>
      <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
          Shop
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button component={Link} to="/" color="primary" variant="text">
            Home
          </Button>
          <Button
            component={Link}
            to="/products/all/all-categories"
            color="primary"
            variant="text"
          >
            Products
          </Button>
          {token ? (
            <Button
              component={Link}
              to="/profile"
              color="primary"
              variant="text"
            >
              Profile
            </Button>
          ) : (
            <Button component={Link} to="/auth" color="primary" variant="text">
              Login/Register
            </Button>
          )}
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          mt={{ xs: 2, sm: 0 }}
        >
          <TextField
            size="small"
            placeholder="Search..."
            variant="outlined"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
          <IconButton color="primary" component={Link} to="/cart">
            <Badge badgeContent={cartLength} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Button variant="content" sx={{backgroundColor:'red',color:'white'}} onClick={()=>dispatch(logout())}>Logout</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
