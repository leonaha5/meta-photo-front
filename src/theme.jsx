import {createTheme} from '@mui/material/styles';

// Create a dark theme
const Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#9d9dcc',
            dark: '#575799',
            light: '#d3d3ff',
        },
        background: {
            default: '#070811',
            paper: '#070811', // Optional, if you want the paper component to have the same background
        },
    },
});

export default Theme;
