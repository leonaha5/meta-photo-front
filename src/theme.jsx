import {createTheme} from '@mui/material/styles';

// Create a dark theme
const Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#d3d3ff',
            main: '#9d9dcc',
            dark: '#575799',
            darker: "#0D0D33",
        },
        background: {
            default: '#070811',
            paper: '#070811', // Optional, if you want the paper component to have the same background
        },
    },
});

export default Theme;
