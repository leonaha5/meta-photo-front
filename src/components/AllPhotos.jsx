import {Box} from "@mui/material";
import TopBar from "./TopBar.jsx";
import BottomNav from "./BottomNav.jsx";
import {useTheme} from "@mui/material/styles";

const Home = () => {
    // Common styles for the squares
    const theme = useTheme();
    const squareStyles = {
        backgroundColor: "gray",
        paddingBottom: "100%", // Ensures the square aspect ratio
        width: "100%", // Full width to fill the grid cell
        borderRadius: "10px"
    };

    return (
        <>
            <TopBar header="View Name"/>


            <Box sx={{
                width: "100%",
                height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 56px)`,
                overflow: "auto"
            }}>

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

                </Box>
            </Box>
            <BottomNav/>
        </>
    );
};

export default Home;

