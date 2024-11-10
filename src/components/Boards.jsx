import {Box, Fab, IconButton, Stack, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import BottomNav from "./BottomNav.jsx";
import TopBar from "./TopBar.jsx";
import {useTheme} from "@mui/material/styles";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import AddBoardModal from "./AddBoardModal.jsx";
import {DeleteOutline} from "@mui/icons-material";


const DISPLAYED_BOARDS = 5
const squareStyles = (grow, bgImg) => {
    return {
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: "center",
        backgroundColor: "gray",
        width: "calc(100% - 16px)",
        borderRadius: "10px",
        flexGrow: grow,
        minHeight: "60px",
        margin: 1,
        overflow: 'hidden',
        color: "black",
        textDecoration: 'none',
    };

};


export const Boards = () => {
    const theme = useTheme();

    const [modalOpen, setModalOpen] = React.useState(false);
    const [boards, setBoards] = useState([]);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const deleteBoard = async (id) => {
        await axios.delete(`http://localhost:4000/boards/${id}`)
        window.location.reload();
    }

    useEffect(() => {

        axios.get(`http://localhost:4000/boards/user/67261b44afe3f93052c27a2e`)
            .then(response => {
                console.log(response.data)
                setBoards(response.data);

            })
            .catch(error => {
                console.error(error);
            });


    }, [])


    return (
        <>
            <AddBoardModal modalOpen={modalOpen} handleCloseModal={handleCloseModal}/>
            <TopBar header="View Name" root/>
            <Stack width="100%"
                   sx={{
                       overflowY: "auto",
                       minHeight: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`,
                       height: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`
                   }}
            >
                {(boards.length === 0 ?
                        <Box sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>no boards
                            yet!</Box> :
                        <>
                            <Stack
                                sx={{
                                    overflowY: "auto",
                                    minHeight: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`,
                                    height: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`
                                }}>

                                {boards.map((board, index) => (
                                    index < DISPLAYED_BOARDS &&
                                    <Box key={index}
                                         sx={
                                             squareStyles(Math.min(boards.length, DISPLAYED_BOARDS) - index,
                                                 `http://localhost:4000/images/files/${board.coverImage}`)}
                                         component={Link}
                                         to={`/boards/${board._id}`}
                                    >
                                        <Stack direction="row">
                                            <Typography
                                                sx={{
                                                    fontSize: "20px",
                                                    margin: 2,
                                                    marginRight: 0,
                                                    fontWeight: "bold",
                                                }}>
                                                {board.name}
                                                {board.coverImage}
                                            </Typography>
                                            <IconButton sx={{color: 'black'}} onClick={(event) => {
                                                event.stopPropagation();
                                                deleteBoard(board._id);
                                            }}>
                                                <DeleteOutline/>
                                            </IconButton>
                                        </Stack>
                                    </Box>
                                ))}
                            </Stack>
                            <Stack>
                                {boards.map((board, index) => (
                                    index >= DISPLAYED_BOARDS ?
                                        (
                                            <Box
                                                key={index}
                                                sx={
                                                    squareStyles(Math.min(boards.length, DISPLAYED_BOARDS) - index,
                                                        `http://localhost:4000/images/files/${board.coverImage}`)}
                                                component={Link}
                                                to={"/board"}>
                                                <Typography
                                                    sx={{
                                                        fontSize: "20px",
                                                        margin: 2,
                                                        fontWeight: "bold",
                                                    }}>
                                                    {board.name}
                                                </Typography>
                                            </Box>
                                        ) : null
                                ))}
                            </Stack>
                        </>
                )}
            </Stack>
            <Fab onClick={handleOpenModal} variant="extended" color="primary"
                 sx={{position: "fixed", bottom: "60px", right: 0}}>
                <AddIcon/>
                <b>
                    Add a Board
                </b>
            </Fab>

            <BottomNav/>
        </>
    );
};
