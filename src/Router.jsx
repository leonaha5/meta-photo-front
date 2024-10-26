import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./components/Home.jsx";
import {Boards} from "./components/Boards.jsx";
import {Box} from "@mui/material";
import {Board} from "./components/Board.jsx";
import {PhotosByUsers} from "./components/PhotosByUsers.jsx";
import AllPhotos from "./components/AllPhotos.jsx";

function Router() {
    return (
        <Box sx={{width: "100vw", height: "100vh"}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/"
                           element={<Home/>}/>
                    <Route path="/boards"
                           element={<Boards/>}/>
                    <Route path="/board"
                           element={<Board/>}/>
                    <Route path="/photosbyusers"
                           element={<PhotosByUsers/>}/>
                    <Route path={"allphotos"}
                           element={<AllPhotos/>}/>
                </Routes>
            </BrowserRouter>
        </Box>

    )
}

export default Router
