import BottomNav from "./BottomNav.jsx";
import {Box, Stack} from "@mui/material";
import TopBar from "./TopBar.jsx";
import PropTypes from "prop-types";

const MainWrapper = ({children}) => {
    return (
        <Stack direction="column" sx={{height: "100vh", width: "100vw"}}>
            <TopBar header="View Name"/>
            <Box sx={{flexGrow: 1, width: "100%", overflowY: "auto"}}>
                {children}
            </Box>
            <BottomNav/>
        </Stack>
    );
}

MainWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainWrapper;

