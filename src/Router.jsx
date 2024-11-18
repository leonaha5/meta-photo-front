import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Home from "./components/Home.jsx";
import Boards from "./components/Boards.jsx";
import BoardMenu from "./components/BoardMenu.jsx";
import PhotosByUsers from "./components/PhotosByUsers.jsx";
import AllPhotos from "./components/AllPhotos.jsx";

function Router() {
  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/boards/:boardId" element={<BoardMenu />} />
          <Route path="/boards/:boardId/allphotos" element={<AllPhotos />} />
          <Route path="/photosbyusers" element={<PhotosByUsers />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default Router;
