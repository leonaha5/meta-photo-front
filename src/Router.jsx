import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./components/Home.jsx";
import {Boards} from "./components/Boards.jsx";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home"
                       element={<Home/>}/>
                <Route path="/boards"
                       element={<Boards/>}/>
            </Routes>
        </BrowserRouter>

    )
}

export default Router
