import {BrowserRouter, useRoutes} from 'react-router-dom';
import {Box} from '@mui/material';

import Home from './components/Home.jsx';
import Boards from './components/Boards.jsx';
import Board from './components/Board.jsx';
import PhotosByUsers from './components/PhotosByUsers.jsx';
import AllPhotos from './components/AllPhotos.jsx';

function Router() {
    const routes = useRoutes([
        {
            path: '/',
            element: <Home/>,
        },
        {
            path: '/boards',
            element: <Boards/>,
            children: [
                {
                    path: ':id',
                    element: <Board/>,
                    children: [
                        {
                            path: 'allphotos',
                            element: <AllPhotos/>,
                        },
                    ],
                },
            ],
        },
        {
            path: '/photosbyusers',
            element: <PhotosByUsers/>,
        },
    ]);

    return (
        <Box sx={{width: '100vw', height: '100vh'}}>
            <BrowserRouter>
                {routes}
            </BrowserRouter>
        </Box>
    );
}

export default Router;