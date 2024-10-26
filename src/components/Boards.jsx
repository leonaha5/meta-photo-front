import {Box, Button, Fab, IconButton, Modal, Paper, Stack, TextField, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import BottomNav from "./BottomNav.jsx";
import TopBar from "./TopBar.jsx";
import {useTheme} from "@mui/material/styles";
import React from "react";
import {Close, Upload} from "@mui/icons-material";
import {Link} from "react-router-dom";

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
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);


    // TODO: DESKTOP LAYOUT AND RESPONSIVENESS
    const images = Array.from({length: 10});
    return (
        <>
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
            >
                <Paper sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: 2,
                    minWidth: 350,
                    width: "90%",
                    borderRadius: 5,
                }}>
                    <Stack spacing={1}>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                            <IconButton onClick={handleCloseModal}>
                                <Close/>
                            </IconButton>
                            <Typography>
                                Create a Board
                            </Typography>
                            <Box width={'56px'}/>
                        </Stack>
                        <Button variant={'outlined'} sx={{height: 150}}>
                            <Stack alignItems={'center'} justifyContent={'center'}>
                                <Upload sx={{fontSize: 60}}/>
                                <Typography>
                                    Upload a cover image
                                </Typography>
                            </Stack>
                        </Button>
                        <TextField fullWidth label={"Name"}/>
                        <TextField fullWidth label={"Description"}/>
                        <Stack width={'100%'} directon={'row'} alignItems={'flex-end'}>
                            <Button variant={"contained"} sx={{maxWidth: 100}}>
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Modal>
            <TopBar header="View Name" root/>
            <Stack width="100%" // height={"100%"}
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
                    {images.map((_, i) => (
                        i < DISPLAYED_BOARDS ?
                            (<Box key={i} sx={squareStyles(Math.min(images.length, DISPLAYED_BOARDS) - i)}
                                  component={Link} to={"/board"}>
                                <img src="../assets/image.jpg" alt="image"/>
                                {i}
                            </Box>) : null
                    ))}
                </Stack>
                <Stack>
                    {images.map((_, i) => (
                        i >= DISPLAYED_BOARDS ?
                            (<Box key={i} sx={squareStyles(1)} component={Link} to={"/board"}>
                                <img src="../assets/image.jpg" alt="image"/>
                                {i}
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
