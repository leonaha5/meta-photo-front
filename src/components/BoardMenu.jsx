import { Box, Fab, Stack } from "@mui/material";
import BottomNav from "./BottomNav.jsx";
import TopBar from "./TopBar.jsx";
import { useTheme } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import AddPicturesModal from "./AddPicturesModal.jsx";
import { Upload } from "@mui/icons-material";

const BoardMenu = () => {
  const theme = useTheme();
  const { boardId } = useParams();
  const squareStyles = {
    backgroundColor: "gray",
    width: "calc(100% - 16px)",
    borderRadius: "10px",
    minHeight: "60px",
    margin: 1,
  };

  const [addPhotosModalOpen, setAddPhotosModalOpen] = useState(false);

  const handleCloseModal = () => {
    setAddPhotosModalOpen(false);
  };

  return (
    <>
      <AddPicturesModal
        modalOpen={addPhotosModalOpen}
        handleCloseModal={handleCloseModal}
        boardId={boardId}
      />
      <TopBar header="View Name" />
      <Stack
        sx={{
          width: "100%",
          overflowY: "auto",
          minHeight: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`,
          height: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`,
        }}
      >
        {/*<Box sx={{...squareStyles, flexGrow: 2}} component={Link} to={"/photosbyusers"}>PHOTOS BY USERS</Box>*/}
        <Box
          sx={{ ...squareStyles, flexGrow: 3 }}
          component={Link}
          to={`/boards/${boardId}/allphotos`}
        >
          ALL PHOTOS
        </Box>
        <Stack direction="row" flexGrow={2}>
          <Box sx={{ ...squareStyles, flexGrow: 1 }}>MAP</Box>
          <Box sx={{ ...squareStyles, flexGrow: 1 }}>TIMELINE</Box>
        </Stack>
      </Stack>

      <Fab
        onClick={() => setAddPhotosModalOpen(true)}
        variant="extended"
        color="primary"
        sx={{ position: "fixed", bottom: "60px", right: 0 }}
      >
        <Upload />
        <b>Upload Images</b>
      </Fab>

      <BottomNav />
    </>
  );
};
export default BoardMenu;
