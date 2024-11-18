import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { Home, Settings } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const BottomNav = () => {
  const location = useLocation();
  const [value, setValue] = useState(
    location.pathname === "/"
      ? 0
      : location.pathname.startsWith("/boards")
        ? 1
        : 2,
  );
  return (
    <>
      <Box
        sx={{ width: "100%", position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction icon={<Home />} component={Link} to={"/"} />
          <BottomNavigationAction
            icon={<DashboardCustomizeIcon />}
            component={Link}
            to={"/boards"}
          />
          <BottomNavigationAction
            icon={<Settings />}
            component={Link}
            to={""}
          />
        </BottomNavigation>
      </Box>
      <div style={{ height: "56px" }} />
    </>
  );
};

export default BottomNav;
