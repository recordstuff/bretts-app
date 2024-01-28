import { FC, useState } from "react"
import { Outlet, Link } from "react-router-dom"
import PrivateRoute from "../components/PrivateRoute"
import { AppBar, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import AlarmIcon from '@mui/icons-material/Alarm';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import { MenuOption } from "../models/MenuOption";

const drawerWidth = 176
const menuOptions: MenuOption[] = [
    {
        Text: "Timer",
        Route: "/",
        Icon: AlarmIcon
    },
    {
        Text: "History",
        Route: "/history",
        Icon: HistoryIcon
    },
    {
        Text: "Profile",
        Route: "/profile",
        Icon: PersonIcon
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
                        {menuOptions.map((menuOption) => (
                                <ListItem key={menuOption.Text} disablePadding component={Link} to={menuOption.Route} className='menu-link'>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <menuOption.Icon/>
                                        </ListItemIcon>
                                        <ListItemText primary={menuOption.Text} />
                                    </ListItemButton>
                                </ListItem>
                        ))}
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