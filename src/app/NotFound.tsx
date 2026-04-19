// Filename: src/app/not-found.tsx
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Compass, Home } from "lucide-react";
import { alpha } from "@mui/material/styles";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
      }}
    >
      <Stack
        spacing={3}
        alignItems="center"
        sx={{
          maxWidth: 560,
          textAlign: "center",
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          bgcolor: "rgba(15,23,42,0.6)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: alpha("#38bdf8", 0.1),
            color: "primary.light",
          }}
        >
          <Compass size={28} />
        </Box>

        <Stack spacing={1} alignItems="center">
          <Typography
            variant="overline"
            sx={{
              color: "primary.light",
              letterSpacing: "0.15em",
              fontWeight: 700,
            }}
          >
            404 · Not Found
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            Page not found
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              maxWidth: 420,
              lineHeight: 1.6,
            }}
          >
            The page you&rsquo;re looking for doesn&rsquo;t exist or has been
            moved. Let&rsquo;s get you back on track.
          </Typography>
        </Stack>

        <Button
          component={Link}
          href="/"
          variant="contained"
          startIcon={<Home size={16} />}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Back to home
        </Button>
      </Stack>
    </Box>
  );
}
