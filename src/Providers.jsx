import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme.jsx'
import PropTypes from "prop-types";

function Providers({children}) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    );
}

Providers.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Providers;
