import {Box, Button, Stack} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import BottomNav from "./BottomNav.jsx";
import TopBar from "./TopBar.jsx";

const DISPLAYED_BOARDS = 5

export const Boards = () => {
    const squareStyles = (grow, last) => {
        return {
            backgroundColor: "gray",
            width: last ? "calc(50% - 8px)" : "calc(100% - 16px)",
            borderRadius: "10px",
            margin: 1,
            flexGrow: grow,
            minHeight: "60px"
        };

    };

    const images = Array.from({length: 5});
    return (
        <>
            <TopBar header="View Name"/>
            <Stack height={"100%"}>
                <Box sx={{height: "calc(100% - 56px)", width: "100%"}}>
                    {images.map((_, i) => (
                        i < DISPLAYED_BOARDS ?
                            (<Box key={i} sx={squareStyles(Math.min(images.length, DISPLAYED_BOARDS) - i)}>
                                <img src="../assets/image.jpg" alt="image"/>
                                {i}
                            </Box>) : null
                    ))}
                </Box>

            </Stack>
            <>
                <div style={{height: "56px"}}/>
                <Box sx={{
                    backgroundColor: "background.default",
                    width: "100%",
                    position: "fixed",
                    bottom: "56px",
                }}>
                    <Button variant="contained" size="large"
                            sx={{
                                margin: 1,
                                width: "calc(100% - 16px)",
                            }}>
                        <AddIcon/>
                    </Button>
                </Box></>
            <BottomNav/>
        </>
    );
};
