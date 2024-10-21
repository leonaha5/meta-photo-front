import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./components/Home.jsx";
import {Boards} from "./components/Boards.jsx";
import {Box} from "@mui/material";

function Router() {
    return (
        <Box sx={{width: "100vw", height: "100vh"}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/home"
                           element={<Home/>}/>
                    <Route path="/boards"
                           element={<Boards/>}/>
                </Routes>
            </BrowserRouter>
        </Box>

    )
}

export default Router
