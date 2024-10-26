import {Box, Stack} from "@mui/material";
import BottomNav from "./BottomNav.jsx";
import TopBar from "./TopBar.jsx";
import {useTheme} from "@mui/material/styles";
import {Link} from "react-router-dom";

export const Board = () => {
    const theme = useTheme();

    const squareStyles = {
        backgroundColor: "gray",
        width: "calc(100% - 16px)",
        borderRadius: "10px",
        minHeight: "60px",
        margin: 1,
    };
    return (
        <>
            <TopBar header="View Name"/>
            <Stack
                sx={{
                    width: "100%",
                    overflowY: "auto",
                    minHeight: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`,
                    height: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`
                }}
            >
                <Box sx={{...squareStyles, flexGrow: 2}} component={Link} to={"/photosbyusers"}>PHOTOS BY USERS</Box>
                <Box sx={{...squareStyles, flexGrow: 3}} component={Link} to={"/allphotos"}>ALL PHOTOS</Box>
                <Stack direction='row' flexGrow={2}>
                    <Box sx={{...squareStyles, flexGrow: 1}}>MAP</Box>
                    <Box sx={{...squareStyles, flexGrow: 1}}>TIMELINE</Box>
                </Stack>
                <Box sx={{...squareStyles, flexGrow: 1}}>ADD</Box>


            </Stack>

            <BottomNav/>
        </>
    );
};
