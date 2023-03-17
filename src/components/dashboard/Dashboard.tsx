import React, { useState } from 'react';

// Theme personalization of MAterial UI
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

// CSS and Drawer
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';

// Nav Bar
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// Material lists
import List from '@mui/material/List';

// Icons
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Material Grids and box
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

//List for the menu
import { MenuItems } from './MenuItems';
import { NewEditor } from '../editor/NewEditor';
import { Tiptap } from '../editor/TiptapEditor';

// Width for drawer menu
const drawerWidth: number = 240;

// Props fform AppBar
interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

// App Bar
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => (
    {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            }),
        })
    }
))


// Drawer Menu
const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open'
})(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflow: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen
                }),
                widht: theme.spacing(7),
                // Breakpoints to media queries of css in different display sizes (Responsive design)
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9)
                }
            })
        }
    })
);

// Define theme
const myTheme = createTheme();


// Dashboard content
// TODO Refactor with navigation component
export const Dashboard = () => {
    const [open, setOpen] = useState(true);

    // Show / hide Drawer Menu
    const toogleDrawer = () => {
        setOpen(!open);
    }

    return (
        <ThemeProvider theme={myTheme}>
            <Box sx={{ display:'flex' }}>
                <CssBaseline />
                {/* AppBar */}
                <AppBar position='absolute' open={open} >
                    {/* Toolbar ---> Actions */}
                    <Toolbar sx={{ pr: '24px'}} >
                        {/* Icon to toogle drawer menu */}
                        <IconButton
                            edge='start'
                            color='inherit'
                            aria-label='open drawer'
                            onClick={toogleDrawer}
                            sx= {{
                                marginRight: '36px',
                                ...(open && {
                                    display: 'none'
                                })
                            }}
                        >
                            <MenuIcon />
                            {/* Title of App */}
                        </IconButton>
                        <Typography
                            component='h1'
                            variant='h6'
                            color='inherit'
                            noWrap
                            sx={{
                                flexGrow: 1
                            }}
                        >
                            Code Verification Katas
                        </Typography>
                        {/* Icon to show notifications */}
                        <IconButton color='inherit'>
                            <Badge 
                                badgeContent={10}
                                color='secondary'
                            >
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        {/* Icon to logout */}
                        <IconButton color='inherit'>
                            <LogoutIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant='permanent' open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1]
                        }}
                    >
                        {/* Icon to hide the menu */}
                        <IconButton color='inherit' onClick={toogleDrawer}>
                            <ChevronLeft />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    {/* List of menu items */}
                    <List component='nav'>
                        { MenuItems }
                    </List>
                </Drawer>
                {/* Dashboard content */}
                <Box
                    component='main'
                    sx={{
                        backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800],
                        flexGrow: 1,
                        height: '95vh',
                        overflow: 'auto'
                    }}
                >
                    {/* Toolbar */}
                    <Toolbar />
                    {/* Container with the content */}
                    {/* TODO: Change for the navigation content by url and stack of routes */}
                    <Container
                        maxWidth='lg'
                        sx={{
                            mt: 4,
                            mb: 4
                        }}
                    >
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 400
                                }}
                            >
                                {/* Code Editor */}
                                <NewEditor />
                                {/* <Tiptap /> */}
                            </Paper>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>    
    )
}
