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
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Store/Slices/AuthSlice";
import { useEffect, useState } from "react";
import fetchData from "../../Utils/fetchData";

export default function Navbar() {
  const cartLength = useSelector((state) => state.cart.items)?.length;
  const { jwt } = useSelector((state) => state.auth);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    window.addEventListener('click',(e)=>{
       if(!e.target.closest('search-inp')){
        setSearchResults(null)
        setSearchValue('')
       }
    })
  },[])
  const handleSearch = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchValue(value);
    if (e.target.value.length < 2) return;
    const response = await fetchData(
      `products?filters[name][$containsi]=${encodeURIComponent(
        value
      )}&populate[0]=img&populate[1]=categories&populate[2]=categories.img`
    );
    setSearchResults(response.data);
  };
  
  const categorySearchResult = searchResults?.map((cat) => (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      onClick={() =>
        navigate(`products/${cat?.id}/${cat?.name?.replaceAll(" ", "-")}`)
      }
      px={"3%"}
      key={cat?.categories?.id}
    >
      
      <Typography variant="body2">{cat?.categories?.name}</Typography>
      <img
        style={{
          width: "70px",
          height: "70px",
          objectFit: "cover",
          borderRadius: "5px",
        }}
        src={
          import.meta.env.VITE_BASE_FILE +
          cat?.categories?.img?.[0]?.formats?.thumbnail?.url
        }
        alt=""
      />
    </Stack>
  ));
  {console.log(categorySearchResult)}

  const productSearchResult = searchResults?.map((prod) => (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      onClick={() =>
        navigate(`product-details/${prod?.id}/${prod?.name?.replaceAll(" ", "-")}`)
      }
      px={"3%"}
      key={prod?.id}
    >
      <Typography variant="body2">{prod?.name}</Typography>
      <img
        style={{
          width: "70px",
          height: "70px",
          objectFit: "cover",
          borderRadius: "5px",
        }}
        src={
          import.meta.env.VITE_BASE_FILE +
          prod?.img?.[0]?.formats?.thumbnail?.url
        }
        alt=""
      />
    </Stack>
  ));
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
          {jwt ? (
            <>
              <Button
                component={Link}
                to="/profile"
                color="primary"
                variant="text"
              >
                Profile
              </Button>
              <Button
                variant="content"
                sx={{ backgroundColor: "red", color: "white" }}
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            </>
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
          position={"relative"}
          mt={{ xs: 2, sm: 0 }}
        >
          <TextField
            size="small"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearch}
            variant="outlined"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
            className="search-inp"
          />
          <Stack
            sx={{
              position: "absolute",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              borderRadius: "0 0 10px 10px",
              width: "100%",
              height: searchValue ? "500px" : "0",
              overflowY: "scroll",
              transition: "height 0.3s ease",
              backgroundColor: "white",
              top: "100%",
              zIndex: 1000,
            }}
          >
            {!searchResults && (
              <Typography textAlign={"center"} my={"20px"} px={"5%"}>
                Enter 3 character{" "}
              </Typography>
            )}

            {/* {categorySearchResult?.length > 0 && (
              <Box>
                <Typography>Categories</Typography>
                {categorySearchResult}
              </Box>
            )} */}
            {/* {console.log(categorySearchResult)} */}

            {productSearchResult?.length > 0 && (
              <Box>
                <Typography>Products</Typography>
                {productSearchResult}
              </Box>
            )}
          </Stack>

          <IconButton color="primary" component={Link} to="/cart">
            <Badge badgeContent={cartLength} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
