import {useState} from "react";
import axios from "axios";
import {Box, Button, IconButton, Modal, Paper, Stack, TextField, Typography} from "@mui/material";
import {Close, Upload} from "@mui/icons-material";
import PropTypes from "prop-types";

const AddBoardModal = ({modalOpen, handleCloseModal}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');


    const addBoard = (name, userId) => {
        axios.post("http://localhost:4000/boards", {
            name: name,
            owner: userId
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleSave = () => {
        addBoard(name, "67261b44afe3f93052c27a2e")
        handleCloseModal()
        window.location.reload();
    }

    return (
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
                    <TextField
                        fullWidth
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <Stack width={'100%'}
                           directon={'row'} alignItems={'flex-end'}>
                        <Button variant={"contained"} sx={{maxWidth: 100}} onClick={handleSave}>
                            Save
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Modal>
    )
}

AddBoardModal.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
};

export default AddBoardModal