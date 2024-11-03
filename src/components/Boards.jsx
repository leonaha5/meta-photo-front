import {Box, Fab, Stack} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import BottomNav from "./BottomNav.jsx";
import TopBar from "./TopBar.jsx";
import {useTheme} from "@mui/material/styles";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import AddBoardModal from "./AddBoardModal.jsx";


const DISPLAYED_BOARDS = 5
const squareStyles = (grow) => {
    return {
        backgroundColor: "gray",
        width: "calc(100% - 16px)",
        borderRadius: "10px",
        flexGrow: grow,
        minHeight: "60px",
        margin: 1,
    };

};


export const Boards = () => {
    const theme = useTheme();

    const [modalOpen, setModalOpen] = React.useState(false);

    const [images, setImages] = useState([]);
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    useEffect(() => {

        axios.get(`http://localhost:4000/boards/user/67261b44afe3f93052c27a2e`)
            .then(response => {
                console.log(response.data);
                setImages(response.data);
            })
            .catch(error => {
                console.error(error);
            });


    }, [])


    // TODO: DESKTOP LAYOUT AND RESPONSIVENESS
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
                <Stack sx={{
                    overflowY: "auto",
                    minHeight: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`,
                    height: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`
                }}>
                    {images.map((image, index) => (
                        index < DISPLAYED_BOARDS ?
                            (<Box key={index} sx={squareStyles(Math.min(images.length, DISPLAYED_BOARDS) - index)}
                                  component={Link} to={"/board"}>
                                <img src="../assets/image.jpg" alt=""/>
                                {image.name}
                            </Box>) : null
                    ))}
                </Stack>
                <Stack>
                    {images.map((image, index) => (
                        index >= DISPLAYED_BOARDS ?
                            (<Box key={index} sx={squareStyles(1)} component={Link} to={"/board"}>
                                <img src="../assets/image.jpg" alt="image"/>
                                {image.name}
                            </Box>) : null
                    ))}
                </Stack>
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
