import React from "react";
import { Box, Typography, Stack, IconButton, Link as MuiLink } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        py: 4,
        px: 2,
        mt: 6,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Shop Inc. All rights reserved.
        </Typography>

        <Stack direction="row" spacing={2}>
          <MuiLink href="#" underline="none" color="text.secondary">
            Terms
          </MuiLink>
          <MuiLink href="#" underline="none" color="text.secondary">
            Privacy
          </MuiLink>
          <MuiLink href="#" underline="none" color="text.secondary">
            Contact
          </MuiLink>
        </Stack>

        <Stack direction="row" spacing={1}>
          <IconButton aria-label="Facebook" color="primary">
            <FacebookIcon />
          </IconButton>
          <IconButton aria-label="Twitter" color="primary">
            <TwitterIcon />
          </IconButton>
          <IconButton aria-label="Instagram" color="primary">
            <InstagramIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}

