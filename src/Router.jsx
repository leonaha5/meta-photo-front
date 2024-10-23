import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./components/Home.jsx";
import {Boards} from "./components/Boards.jsx";
import {Box} from "@mui/material";
import {Board} from "./components/Board.jsx";

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
                </Routes>
            </BrowserRouter>
        </Box>

    )
}

export default Router
