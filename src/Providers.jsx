import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme.jsx'
import PropTypes from "prop-types";
import {useState} from "react";
import {BottomNavContext} from "./contexts/BottomNavContext.js";

function Providers({children}) {
    const [bottomNavTab, setBottomNavTab] = useState(0);

    return (
        <ThemeProvider theme={theme}>
            <BottomNavContext.Provider value={[bottomNavTab, setBottomNavTab]}>
                <CssBaseline/>
                {children}
            </BottomNavContext.Provider>
        </ThemeProvider>
    );
}

Providers.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Providers;
