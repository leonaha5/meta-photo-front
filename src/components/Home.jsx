import {Box, IconButton, Stack, Tab, Tabs} from "@mui/material";
import {useEffect, useState} from "react";
import TopBar from "./TopBar.jsx";
import BottomNav from "./BottomNav.jsx";
import {useTheme} from "@mui/material/styles";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import DownloadIcon from '@mui/icons-material/Download';
import axios from "axios";

const Home = () => {
    // Common styles for the squares
    const theme = useTheme();
    const squareStyles = {
        backgroundColor: "gray",
        paddingBottom: "100%", // Ensures the square aspect ratio
        width: "100%", // Full width to fill the grid cell
        borderRadius: "10px"
    };

    const [value, setValue] = useState(1);
    const [feedImages, setFeedImages] = useState([]);
    const [userImages, setUserImages] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4000/images/user/67261b44afe3f93052c27a2e`)
            .then(response => {
                console.log(response.data);
                setUserImages(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };
    // TODO: DESKTOP LAYOUT AND RESPONSIVENESS
    return (
        <>
            <TopBar header="View Name" root/>                <>
            <Box sx={{position: "fixed", width: "100%", backgroundColor: "background.default"}}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Following" sx={{width: "40%"}}/>
                    <Tab label="Your Photos" sx={{width: "40%"}}/>
                </Tabs>
            </Box>
            <div style={{height: "48px"}}/>
        </>

            <Box sx={{
                width: "100%",
                height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 48px - 56px)`,
                overflow: "auto"
            }}>
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
                        {Array.from({length: 20}).map((i) => {
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
                            gridTemplateColumns: "repeat(4, 1fr)", // 4 columns
                            gridAutoRows: "auto", // Allow rows to take up only the space needed
                            gap: 1, // Spacing between squares
                            width: "calc(100% - 32px)",
                            margin: "16px", // Center the grid
                        }}
                    >
                        {userImages.map((image, index) =>
                            <Box key={index} sx={{
                                borderRadius: "10px",
                                position: 'relative',
                                aspectRatio: '1 / 1', // Ensures the aspect ratio is square
                                overflow: 'hidden', // Ensures no overflow of the image
                            }}>
                                <img
                                    src={`http://localhost:4000/images/files/${image.filename}`}
                                    alt={image.filename} // Add an alt attribute for accessibility
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover', // Ensures the image covers the container
                                        objectPosition: 'center', // Centers the image
                                    }}/>
                            </Box>)}
                    </Box>}
            </Box>
            <BottomNav/>
        </>
    );
};

export default Home;

