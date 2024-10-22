import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import {Home, Settings} from "@mui/icons-material";
import {Link} from "react-router-dom";

const BottomNav = () => {
    const [value, setValue] = React.useState(0);
    // TODO: ADD CONTEXT FOR THE SELECTED TAB IN THE NAVIGATION
    return (
        <>
            <Box sx={{width: '100%', position: 'fixed', bottom: 0, left: 0, right: 0}}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction icon={<Home/>} component={Link} to={"/"}/>
                    <BottomNavigationAction icon={<DashboardCustomizeIcon/>} component={Link} to={"/boards"}/>
                    <BottomNavigationAction icon={<Settings/>} component={Link} to={""}/>
                </BottomNavigation>
            </Box>
            <div style={{height: "56px"}}/>
        </>
    );
}

export default BottomNav;
