import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  id,
  name,
  price,
  discount,
  img,
  quantity,
}) {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: "100%",
        height: 420,
        borderRadius: 3,
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 16px 32px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardMedia
        sx={{
          height: 210,
          width: "100%",
          objectFit: "cover",
          transition: "filter 0.3s ease",
          "&:hover": {
            filter: "brightness(0.9)",
          },
        }}
        image={import.meta.env.VITE_BASE_FILE + img}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" fontWeight={700}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {`Price: ${price * (1 - discount / 100)} `}
          &nbsp;|&nbsp;
          {`Quantity: ${quantity}`}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          onClick={() =>
            navigate(`product=details/${id}/${name.replaceAll(" ", "-")}`)
          }
          size="small"
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
