import { Box, Fab, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BottomNav from "./BottomNav.jsx";
import TopBar from "./TopBar.jsx";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddBoardModal from "./AddBoardModal.jsx";
import { DeleteOutline } from "@mui/icons-material";
import PropTypes from "prop-types";

const DISPLAYED_BOARDS = 5;

const squareStyles = (grow, bgImg) => {
  return {
    backgroundImage: `url(${bgImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "gray",
    width: "calc(100% - 16px)",
    borderRadius: "10px",
    flexGrow: grow,
    minHeight: "60px",
    margin: 1,
    overflow: "hidden",
    color: "black",
    textDecoration: "none",
  };
};

const Board = ({ board, index, deleteBoard }) => {
  const navigate = useNavigate();

  return (
    <Box
      key={index}
      sx={squareStyles(
        DISPLAYED_BOARDS - index,
        `http://localhost:4000/images/files/${board.coverImage}`,
      )}
      onClick={() => {
        navigate(`/boards/${board._id}`);
        console.log("aha");
      }}
    >
      <Stack
        direction="row"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            margin: 2,
            marginRight: 0,
            fontWeight: "bold",
          }}
        >
          {board.name}
        </Typography>
        <IconButton
          sx={{ color: "black" }}
          onClick={() => {
            deleteBoard(board._id, index);
          }}
        >
          <DeleteOutline />
        </IconButton>
      </Stack>
    </Box>
  );
};

Board.propTypes = {
  board: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  deleteBoard: PropTypes.func.isRequired,
};

const Boards = () => {
  const theme = useTheme();

  const [modalOpen, setModalOpen] = React.useState(false);
  const [boards, setBoards] = useState([]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const deleteBoard = async (id, index) => {
    await axios.delete(`http://localhost:4000/boards/${id}`);
    setBoards((brds) => brds.filter((_, i) => i !== index));
  };

  const addBoard = async (name, userId, image) => {
    try {
      const boardResponse = await axios.post("http://localhost:4000/boards", {
        name,
        owner: userId,
      });

      if (image) {
        const formData = new FormData();
        formData.append("images", image);
        formData.append("uploadedBy", userId);
        formData.append("belongsTo", boardResponse.data._id);

        const imageResponse = await axios.post(
          "http://localhost:4000/images",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        const boardPatchResponse = await axios.patch(
          `http://localhost:4000/boards/${boardResponse.data._id}`,
          {
            coverImage: imageResponse.data[0].filename,
          },
        );

        setBoards((brd) => [...brd, boardPatchResponse.data]);
      }
    } catch (error) {
      console.error("Error creating board or uploading image:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/boards/user/67261b44afe3f93052c27a2e`)
      .then((response) => {
        setBoards(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <AddBoardModal
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        addBoard={addBoard}
      />
      <TopBar header="View Name" root />
      <Stack
        sx={{
          width: "100%",
          overflowY: "auto",
          minHeight: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`,
          height: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`,
        }}
      >
        {boards.length === 0 ? (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            no boards yet!
          </Box>
        ) : (
          <>
            <Stack
              sx={{
                overflowY: "auto",
                minHeight: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`,
                height: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`,
              }}
            >
              {boards.map(
                (board, index) =>
                  index < DISPLAYED_BOARDS && (
                    <Board
                      key={index}
                      board={board}
                      index={index}
                      deleteBoard={deleteBoard}
                    />
                  ),
              )}
            </Stack>
            <Stack>
              {boards.map((board, index) =>
                index >= DISPLAYED_BOARDS ? (
                  <Box
                    key={index}
                    sx={squareStyles(
                      Math.min(boards.length, DISPLAYED_BOARDS) - index,
                      `http://localhost:4000/images/files/${board.coverImage}`,
                    )}
                    component={Link}
                    to={"/board"}
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        margin: 2,
                        fontWeight: "bold",
                      }}
                    >
                      {board.name}
                    </Typography>
                  </Box>
                ) : null,
              )}
            </Stack>
          </>
        )}
      </Stack>
      <Fab
        onClick={handleOpenModal}
        variant="extended"
        color="primary"
        sx={{ position: "fixed", bottom: "60px", right: 0 }}
      >
        <AddIcon />
        <b>Add a Board</b>
      </Fab>

      <BottomNav />
    </>
  );
};

export default Boards;
