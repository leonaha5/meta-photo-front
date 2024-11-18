import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Close, Delete, Upload } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

const AddPicturesModal = ({ modalOpen, handleCloseModal, boardId }) => {
  const theme = useTheme();
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length + images.length > 10) {
      alert("You can only upload a maximum of 10 images.");
      return;
    }

    setImages((prev) => {
      return [...prev, ...selectedFiles];
    });

    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const handleDeleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const upload = async () => {
    const formData = new FormData();
    // Ensure all selected files are added correctly
    images.forEach((image) => {
      formData.append("images", image); // Append each image individually
    });

    formData.append("uploadedBy", "67261b44afe3f93052c27a2e");
    formData.append("belongsTo", boardId);

    try {
      await axios.post("http://localhost:4000/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleSave = () => {
    upload();
    handleCloseModal();
  };

  return (
    <Modal open={modalOpen} onClose={handleCloseModal}>
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: 3,
          width: "90%",
          maxWidth: 500,
          borderRadius: 3,
          boxShadow: theme.shadows[5],
          maxHeight: "80vh",
          overflow: "hidden",
        }}
      >
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Add Pictures</Typography>
            <IconButton onClick={handleCloseModal}>
              <Close />
            </IconButton>
          </Stack>

          {/* Compact Upload Button */}
          <Button
            variant="outlined"
            component="label"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 1,
              borderStyle: "dashed",
              height: 50,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            <Upload sx={{ mr: 1 }} />
            {images.length < 10
              ? `Upload up to ${10 - images.length} more image(s)`
              : "Maximum limit reached"}
            <input
              type="file"
              multiple
              accept="image/*"
              hidden
              onChange={handleFileChange}
              disabled={images.length >= 10}
            />
          </Button>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              maxWidth: "100%",
              height: 250,
              overflowY: "scroll",
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: theme.shape.borderRadius,
              backgroundColor: theme.palette.background.default,
            }}
          >
            {previewUrls.map((url, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  minWidth: "250px",
                  minHeight: "250px",
                  maxWidth: "250px",
                  maxHeight: "250px",
                  overflow: "hidden",
                  borderRadius: theme.shape.borderRadius,
                }}
              >
                <img
                  src={url}
                  alt={`preview-${index}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: theme.shape.borderRadius,
                  }}
                />
                <Tooltip title="Delete image">
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteImage(index)}
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      backgroundColor: theme.palette.error.main,
                      color: theme.palette.common.white,
                      "&:hover": {
                        backgroundColor: theme.palette.error.dark,
                      },
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            ))}
          </Stack>

          <Stack direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{
                maxWidth: 120,
                fontWeight: "bold",
              }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  );
};

AddPicturesModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  boardId: PropTypes.string.isRequired,
};

export default AddPicturesModal;
