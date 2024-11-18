import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import BottomNav from "./BottomNav.jsx";
import TopBar from "./TopBar.jsx";
import { useTheme } from "@mui/material/styles";
import { deepPurple } from "@mui/material/colors";
import { MoreVert } from "@mui/icons-material";

const PhotosByUsers = () => {
  const theme = useTheme();

  const squareStyles = {
    backgroundColor: "gray",
    borderRadius: "10px",
    minHeight: "130px",
    marginY: 1,
    height: "100%",
  };

  const users = Array.from({ length: 3 });

  return (
    <>
      <TopBar header="View Name" />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${users.length > 4 ? 2 : 1}, 1fr)`, // 2 columns
          gap: 1, // Spacing between squares
          width: "100%",
          overflowY: "auto",
          minHeight: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`,
          height: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`,
          padding: "16px", // Center the grid
        }}
      >
        {users.map((i) => {
          return (
            <Stack key={i}>
              <Stack direction="row" justifyContent="space-between">
                <Avatar sx={{ bgcolor: deepPurple[500] }}>P</Avatar>
                <Typography
                  sx={{ textOverflow: "ellipsis", alignContent: "center" }}
                >
                  Username
                </Typography>
                <IconButton>
                  <MoreVert />
                </IconButton>
              </Stack>
              <Box sx={squareStyles} />
            </Stack>
          );
        })}
      </Box>
      <BottomNav />
    </>
  );
};
export default PhotosByUsers;
