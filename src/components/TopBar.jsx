import {AppBar, Avatar, Box, IconButton, Menu, MenuItem, Modal, Paper, Stack, Toolbar, Typography} from "@mui/material";
import {deepOrange} from "@mui/material/colors";
import {ArrowBack, Close, MoreVert} from "@mui/icons-material";
import PropTypes from "prop-types";
import {useTheme} from "@mui/material/styles";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function TopBar({header, root}) {
    const theme = useTheme(); // Accessing theme to dynamically handle spacing
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const [modalOpen, setModalOpen] = React.useState(false);
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    // TODO: PROFILE MODAL
    return (
        <>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleCloseMenu}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleCloseMenu}>Option 1</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Option 2</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Option 3</MenuItem>
            </Menu>
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
                    borderRadius: 5,
                    bgcolor: "primary.darker"
                }}>
                    <Stack direction={"rows"} justifyContent={"space-between"}>
                        <IconButton>
                            <Close/>
                        </IconButton>
                        <Typography>
                            Profile
                        </Typography>
                        <Box
                            width={"56px"}/>
                    </Stack>

                    <Paper sx={{padding: 2}}>
                        <Stack direction={"row"}>
                            <Avatar sx={{bgcolor: deepOrange[500]}}>
                                N
                            </Avatar>
                            <Typography>
                                Name
                            </Typography>
                        </Stack>
                    </Paper>
                </Paper>
            </Modal>
            <AppBar elevation={0} position="fixed">
                <Toolbar>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                        {root ?
                            <IconButton size="large" edge="start" sx={{mr: 2}} onClick={handleClickMenu}>
                                <MoreVert/>
                            </IconButton> :
                            <IconButton size="large" edge="start" sx={{mr: 2}} onClick={() => {
                                navigate(-1)
                            }}>
                                <ArrowBack/>
                            </IconButton>}

                        <Typography variant="h6" component="div">
                            {header}
                        </Typography>
                        <Avatar sx={{bgcolor: deepOrange[500]}} onClick={handleOpenModal}>N</Avatar>
                    </Stack>
                </Toolbar>
            </AppBar>

            <div style={{height: theme.mixins.toolbar.minHeight}}/>
        </>
    );
}

TopBar.propTypes = {
    header: PropTypes.string.isRequired,
    root: PropTypes.bool,
};
