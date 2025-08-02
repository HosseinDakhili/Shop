import {
  Card,
  CardContent,
  CardActions,
  Skeleton,
  Box,
  Typography,
} from "@mui/material";
export default function ProductSkeleton() {
return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 3,
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      }}
    >
     
      <Skeleton variant="rectangular" height={180} animation="wave" />

      <CardContent>
        <Skeleton variant="text" height={30} width="80%" animation="wave" />
        <Skeleton variant="text" height={20} width="60%" animation="wave" />
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Skeleton
          variant="rounded"
          height={36}
          width={100}
          animation="wave"
        />
      </CardActions>
    </Card>
  );
}
