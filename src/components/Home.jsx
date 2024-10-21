import {Box, IconButton, Stack, Tab, Tabs} from "@mui/material";
import {useState} from "react";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import DownloadIcon from '@mui/icons-material/Download';
import TopBar from "./TopBar.jsx";
import BottomNav from "./BottomNav.jsx";


const Home = () => {
    // Common styles for the squares
    const squareStyles = {
        backgroundColor: "gray",
        paddingBottom: "100%", // Ensures the square aspect ratio
        width: "100%", // Full width to fill the grid cell
        borderRadius: "10px"
    };

    const [value, setValue] = useState(1);


    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <TopBar header="View Name"/>                <>
            <Box sx={{position: "fixed", width: "100%", backgroundColor: "background.default"}}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Following" sx={{width: "40%"}}/>
                    <Tab label="Your Photos" sx={{width: "40%"}}/>
                </Tabs>
            </Box>
            <div style={{height: "48px"}}/>
        </>

            <Box sx={{width: "100%", height: "calc(100% - 48px)", overflow: "auto"}}>
                {value === 0 &&
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)", // 2 columns
                            gap: 1, // Spacing between squares
                            width: "calc(100% - 32px)",
                            height: "calc(100% - 32px)",
                            margin: "16px", // Center the grid
                        }}
                    >
                        {Array.from({length: 100}).map((i) => {
                            return (
                                <Stack key={i}>
                                    <Box sx={squareStyles}/>
                                    <Stack direction="row">
                                        <IconButton sx={{flexGrow: 1, justifyContent: "flex-start"}}>
                                            <DownloadIcon/>
                                        </IconButton>
                                        <IconButton>
                                            <CommentIcon/>
                                        </IconButton>
                                        <IconButton>
                                            <FavoriteBorderIcon/>
                                        </IconButton>
                                    </Stack>
                                </Stack>)
                        })}

                    </Box>}
                {value === 1 &&
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)", // 2 columns
                            gap: 1, // Spacing between squares
                            width: "calc(100% - 32px)",
                            height: "calc(100% - 32px)",
                            margin: "16px", // Center the grid
                        }}
                    >
                        {Array.from({length: 100}).map((i) => <Box key={i} sx={squareStyles}/>)}

                    </Box>}
            </Box>
            <BottomNav/>
        </>
    );
};

export default Home;

