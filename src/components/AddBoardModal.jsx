import {useState} from "react";
import axios from "axios";
import {Box, Button, Divider, Fab, IconButton, Modal, Paper, Stack, TextField, Typography} from "@mui/material";
import {Close, Delete, Edit, Upload} from "@mui/icons-material";
import PropTypes from "prop-types";
import {useTheme} from "@mui/material/styles";

const AddBoardModal = ({modalOpen, handleCloseModal}) => {
    const theme = useTheme();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const addBoard = async (name, userId) => {
        try {
            const boardResponse = await axios.post("http://localhost:4000/boards", {
                name,
                owner: userId,
            });

            console.log("boardResponse")
            console.log(boardResponse.data);

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
                    }
                );

                console.log("imageResponse")
                console.log(imageResponse.data);


                if (!boardResponse.data._id) {
                    console.log("no board id")
                }
                if (!imageResponse.data[0].filename) {
                    console.log("no image filename")
                }
                const boardPatchResponse = await axios.patch(`http://localhost:4000/boards/${boardResponse.data._id}`, {
                    coverImage: imageResponse.data[0].filename,
                });

                console.log("boardPatchResponse")
                console.log(boardPatchResponse.data);


            }
        } catch (error) {
            console.error("Error creating board or uploading image:", error);
        }
    }

    const handleSave = () => {
        addBoard(name, "67261b44afe3f93052c27a2e")
        handleCloseModal()
        
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setImage(selectedFile);
        if (selectedFile) {
            setPreviewUrl(URL.createObjectURL(selectedFile)); // Generate preview URL
        }
    };

    const handleDeleteCoverImage = () => {
        setPreviewUrl(null);
        setImage(null)
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
                    <Stack direction='row' justifyContent={'space-between'}>
                        <IconButton onClick={handleCloseModal}>
                            <Close/>
                        </IconButton>
                        <Typography>
                            Create a Board
                        </Typography>
                        <Box width={'56px'}/>
                    </Stack>

                    <Button variant='outlined' sx={{height: 150, padding: 0}} fullWidth disableRipple component="span">
                        {previewUrl ?
                            <>
                                <img src={previewUrl} alt="cover image"
                                     style={{
                                         width: "100%",
                                         height: "100%",
                                         objectFit: "cover", objectPosition: "center"
                                     }}/>

                                <Fab color="primary" variant="extended" disableRipple
                                     style={{position: "absolute", bottom: 10, right: 10}}
                                >
                                    <Stack direction='row'>
                                        <label htmlFor="file-input">
                                            <IconButton sx={{pointerEvents: "none"}}>
                                                <Edit
                                                    sx={{pointerEvents: "none", color: theme.palette.primary.darker}}/>
                                            </IconButton>
                                        </label>
                                        <Divider orientation="vertical" flexItem
                                                 sx={{marginX: 1, marginY: 0.5, bgcolor: theme.palette.primary.darker}}
                                        />
                                        <IconButton onClick={handleDeleteCoverImage}>
                                            <Delete sx={{color: theme.palette.primary.darker}}/>
                                        </IconButton>
                                    </Stack>

                                </Fab>

                            </>
                            : <label htmlFor="file-input" style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Stack alignItems={'center'} justifyContent={'center'} sx={{padding: 1}}>
                                    <Upload sx={{fontSize: 60}}/>
                                    <Typography>
                                        Upload a cover image
                                    </Typography>
                                    {image && <p>Selected file: {image.name}</p>}
                                </Stack>
                            </label>}
                    </Button>


                    {/* File input outside of Button to avoid styling conflicts */}
                    <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        style={{display: 'none'}} // Hide the input visually
                        onChange={handleFileChange}
                    />
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
                        <Button variant="contained" sx={{maxWidth: 100}} onClick={handleSave}>
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