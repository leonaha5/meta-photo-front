import { Box } from "@mui/material";
import TopBar from "./TopBar.jsx";
import BottomNav from "./BottomNav.jsx";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ImagePreviewModal from "./ImagePreviewModal.jsx";

const Home = () => {
  // Common styles for the squares
  const theme = useTheme();
  const { boardId } = useParams();
  const [images, setImages] = useState([]);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/images/board/${boardId}`)
      .then((response) => {
        console.log(response.data);
        setImages(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [boardId]);

  const handleCloseModal = () => {
    setPreviewModalOpen(false);
  };
  const handleOpenModal = (imgUrl) => {
    setImageUrl(imgUrl);
    setPreviewModalOpen(true);
  };

  return (
    <>
      <TopBar header="View Name" />

      <ImagePreviewModal
        open={previewModalOpen}
        onClose={handleCloseModal}
        imgSrc={imageUrl}
      />

      <Box
        sx={{
          width: "100%",
          height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 56px)`,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)", // 4 columns
            gridAutoRows: "auto", // Allow rows to take up only the space needed
            gap: 1, // Spacing between squares
            width: "calc(100% - 32px)",
            margin: "16px", // Center the grid
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: "10px",
                position: "relative",
                aspectRatio: "1 / 1",
                overflow: "hidden",
              }}
            >
              <img
                src={`http://localhost:4000/images/files/${image.filename}`}
                alt={image.filename}
                onClick={() =>
                  handleOpenModal(
                    `http://localhost:4000/images/files/${image.filename}`,
                  )
                }
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <BottomNav />
    </>
  );
};

export default Home;
