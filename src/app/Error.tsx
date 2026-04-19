// Filename: src/app/error.tsx
"use client";

import { useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { alpha } from "@mui/material/styles";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[RootError]", error);
  }, [error]);

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
          border: `1px solid ${alpha("#f87171", 0.2)}`,
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
            bgcolor: alpha("#f87171", 0.12),
            color: "#f87171",
          }}
        >
          <AlertTriangle size={28} />
        </Box>

        <Stack spacing={1} alignItems="center">
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            Something went wrong
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              maxWidth: 420,
              lineHeight: 1.6,
            }}
          >
            An unexpected error interrupted rendering. You can retry, or head
            back to the home page.
          </Typography>
          {error.digest && (
            <Typography
              variant="caption"
              sx={{
                mt: 1,
                fontFamily: "var(--font-geist-mono), monospace",
                color: "text.disabled",
                fontSize: "0.7rem",
                px: 1.25,
                py: 0.5,
                borderRadius: 1,
                bgcolor: "rgba(255,255,255,0.03)",
              }}
            >
              ref: {error.digest}
            </Typography>
          )}
        </Stack>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="contained"
            startIcon={<RotateCcw size={16} />}
            onClick={reset}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Try again
          </Button>
          <Button
            component="a"
            href="/"
            variant="outlined"
            startIcon={<Home size={16} />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderColor: "rgba(255,255,255,0.1)",
              color: "text.secondary",
              "&:hover": {
                borderColor: "primary.main",
                color: "primary.light",
              },
            }}
          >
            Home
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
