import React from 'react';

// List components 
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Material icon components
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';

export const MenuItems = (
    <>
        {/* Dashboard to katas button */}
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='Katas'/>
        </ListItemButton>
        {/* Dashboard to users button */}
        <ListItemButton>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary='Users'/>
        </ListItemButton>
        {/* Dashboard to Ranking button */}
        <ListItemButton>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary='Ranking'/>
        </ListItemButton>
    </>    
)