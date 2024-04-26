import { FC, Fragment, useState } from "react"
import { Outlet, Link } from "react-router-dom"
import PrivateRoute from "../components/PrivateRoute"
import { AppBar, Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from "@mui/material"
import AgricultureIcon from '@mui/icons-material/Agriculture';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { MenuOption } from "../models/MenuOption";
import { JwtField, JwtRole } from "../models/Jwt";
import { jwtUtil } from "../wrappers/JwtUtil"
import { Breadcrumbinator } from "../components/Breadcruminator";

const drawerWidth = 200
let lastRole = JwtRole.Any
const menuOptions: MenuOption[] = [
    {
        Text: "Home",
        Route: "/",
        Icon: HomeIcon,
        Role: JwtRole.Any,
    },
    {
        Text: "Grid Example",
        Route: "/gridexample",
        Icon: TableRowsIcon,
        Role: JwtRole.User,
    },
    {
        Text: "Example Two",
        Route: "/exampletwo",
        Icon: TableChartIcon,
        Role: JwtRole.User,
    },
    {
        Text: "Bacon Ipsum",
        Route: "/baconipsum",
        Icon: AgricultureIcon,
        Role: JwtRole.User,
    },
    {
        Text: "Users",
        Route: "/users",
        Icon: PeopleIcon,
        Role: JwtRole.Admin,
        ChildRoutes: ['/user']
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
                        <Box sx={{ marginLeft: 'auto' }}>
                            {localStorage.getItem(JwtField.DisplayName)}
                            <a href="/login" title='Go back to the login screen.'>
                                <Typography sx={{ fontSize: '.9em' }}>Logout</Typography>
                            </a>
                        </Box>
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
                    <List> {/* notice the use of Fragment vs <></> since we need the key property */}
                        {menuOptions.map((menuOption) => {
                            let component = jwtUtil.hasRole(menuOption.Role) ? (
                                <Fragment key={menuOption.Text}>
                                    {menuOption.Role === JwtRole.Admin && lastRole === JwtRole.User && <Divider />}
                                    <ListItem disablePadding component={Link} to={menuOption.Route} className='menu-link' >
                                        <ListItemButton selected={menuOption.Route === window.location.pathname
                                            || menuOption.ChildRoutes?.some(cr => window.location.pathname.startsWith(cr))}>
                                            <ListItemIcon>
                                                <menuOption.Icon />
                                            </ListItemIcon>
                                            <ListItemText primary={menuOption.Text} />
                                        </ListItemButton>
                                    </ListItem>
                                </Fragment>
                            ) : null // fragment shorthand does not work here (listitem key)
                            lastRole = menuOption.Role
                            return component
                        })}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <Stack>
                        <Toolbar />
                        <Breadcrumbinator />
                        <Outlet context={setPageTitle} />
                    </Stack>
                </Box>
            </Box>
        </PrivateRoute>
    )
}

export default Layout