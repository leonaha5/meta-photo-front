import {AppBar, Avatar, IconButton, Stack, Toolbar, Typography} from "@mui/material";
import {deepOrange} from "@mui/material/colors";
import {MoreVert} from "@mui/icons-material";
import PropTypes from "prop-types";

export default function TopBar({header}) {
    return (
        <AppBar elevation={0} position={"relative"}>
            <Toolbar>
                <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                    <IconButton
                        size="large"
                        edge="start"
                        sx={{mr: 2}}
                    >
                        <MoreVert/>
                    </IconButton>
                    <Typography variant="h6" component="div">
                        {header}
                    </Typography>
                    <Avatar sx={{bgcolor: deepOrange[500]}}>N</Avatar></Stack>
            </Toolbar>
        </AppBar>
    );
}

TopBar.propTypes = {
    header: PropTypes.string.isRequired,
};