import { Box, Modal } from "@mui/material";
import PropTypes from "prop-types";

const ImagePreviewModal = ({ imgSrc, open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <img
          src={imgSrc}
          style={{ width: "100%", height: "auto" }}
          alt="photo"
        />
      </Box>
    </Modal>
  );
};

ImagePreviewModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default ImagePreviewModal;
