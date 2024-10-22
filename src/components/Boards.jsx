import {Box, Fab, Stack} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import BottomNav from "./BottomNav.jsx";
import TopBar from "./TopBar.jsx";
import {useTheme} from "@mui/material/styles";

const DISPLAYED_BOARDS = 5

export const Boards = () => {
    const theme = useTheme();

    const squareStyles = (grow) => {
        return {
            backgroundColor: "gray",
            width: "calc(100% - 16px)",
            borderRadius: "10px",
            flexGrow: grow,
            minHeight: "60px",
            margin: 1,
        };

    };
    // TODO: DESKTOP LAYOUT AND RESPONSIVENESS
    const images = Array.from({length: 1});
    return (
        <>
            <TopBar header="View Name"/>
            <Stack width="100%" // height={"100%"}
                   sx={{
                       overflowY: "auto",
                       minHeight: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`,
                       height: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`
                   }}
            >
                <Stack sx={{
                    overflowY: "auto",
                    minHeight: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`,
                    height: `calc(100vh - 56px - ${theme.mixins.toolbar.minHeight}px)`
                }}>
                    {images.map((_, i) => (
                        i < DISPLAYED_BOARDS ?
                            (<Box key={i} sx={squareStyles(Math.min(images.length, DISPLAYED_BOARDS) - i)}>
                                <img src="../assets/image.jpg" alt="image"/>
                                {i}
                            </Box>) : null
                    ))}
                </Stack>
                <Stack>
                    {images.map((_, i) => (
                        i >= DISPLAYED_BOARDS ?
                            (<Box key={i} sx={squareStyles(1)}>
                                <img src="../assets/image.jpg" alt="image"/>
                                {i}
                            </Box>) : null
                    ))}
                </Stack>
            </Stack>
            <Fab variant="extended" color="primary" sx={{position: "fixed", bottom: "60px", right: 0}}>
                <AddIcon/> <b>Add a Board</b>
            </Fab>

            <BottomNav/>
        </>
    );
};
