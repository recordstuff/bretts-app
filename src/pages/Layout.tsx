import { FC, useState } from "react"
import { Outlet, Link } from "react-router-dom"
import PrivateRoute from "../components/PrivateRoute"
import { AppBar, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import AlarmIcon from '@mui/icons-material/Alarm';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import { MenuOption } from "../models/MenuOption";
import { JwtRole } from "../models/Jwt";
import { jwtUtil } from "../wrappers/JwtUtil"

const drawerWidth = 176
const menuOptions: MenuOption[] = [
    {
        Text: "Home",
        Route: "/",
        Icon: AlarmIcon,
        Role: JwtRole.Any,
    },
    {
        Text: "History",
        Route: "/history",
        Icon: HistoryIcon,
        Role: JwtRole.User,
    },
    {
        Text: "Profile",
        Route: "/profile",
        Icon: PersonIcon,
        Role: JwtRole.User,
    },
    {
        Text: "Users",
        Route: "/users",
        Icon: PeopleIcon,
        Role: JwtRole.Admin,
    },
    {
        Text: "Settings",
        Route: "/settings",
        Icon: SettingsIcon,
        Role: JwtRole.Admin,
    },
]

const Layout: FC = () => {
    const [pageTitle, setPageTitle] = useState('')

    return (
        <PrivateRoute>
            <Box sx={{ display: 'flex' }}>
                <AppBar
                    position="fixed"
                    sx={{ 
                        width: `calc(100% - ${drawerWidth}px)`, 
                        ml: `${drawerWidth}px` 
                    }}
                >
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            {pageTitle}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <List>
                        {menuOptions.map((menuOption) => {
                            return jwtUtil.hasRole(menuOption.Role) ? (
                                <ListItem key={menuOption.Text} disablePadding component={Link} to={menuOption.Route} className='menu-link'>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <menuOption.Icon />
                                        </ListItemIcon>
                                        <ListItemText primary={menuOption.Text} />
                                    </ListItemButton>
                                </ListItem>
                            ) : (null);
                        })}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <Toolbar />
                    <Outlet context={setPageTitle} />
                </Box>
            </Box>
        </PrivateRoute>
    )
}

export default Layout