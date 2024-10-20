import {Box, Button, Stack} from "@mui/material";
import MainWrapper from "./MainWrapper.jsx";
import AddIcon from '@mui/icons-material/Add';

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

    const images = Array.from({length: 1});
    console.log(Math.max(images.length, 4))
    return (
        <MainWrapper>
            <Box height="100%" width={"100%"}>
                <Box sx={{height: "calc(100% - 56px)", width: "100%", overflowY: "auto"}}>
                    <Stack height={images.length <= 5 ? "100%" : "105%"}>
                        {images.map((_, i) => (
                            i <= 4 ?
                                (<Box key={i} sx={squareStyles(Math.min(images.length, 5) - i)}>
                                    <img src="../assets/image.jpg" alt="image"/>
                                    {i}
                                </Box>) : null
                        ))}
                    </Stack>
                    <Stack>
                        {images.map((_, i) => (
                            i > 4 ?
                                (<Box key={i} sx={squareStyles(1)}>
                                    <img src="../assets/image.jpg" alt="image"/>
                                    {i}
                                </Box>) : null
                        ))}
                    </Stack>
                </Box>
                <Button variant="contained" size="large" sx={{margin: 1, width: "calc(100% - 16px)"}}>
                    <AddIcon/>
                </Button>
            </Box>
        </MainWrapper>
    );
};
