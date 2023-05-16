import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { CheckCircleOutline, Cancel } from '@mui/icons-material';
import { useIsConnected } from '../contexts/Beacon';

const drawerWidth = 240
const TestBar: React.FC = () => {
  const isConnected = useIsConnected()
  return (
    <div>
       <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        <Typography variant="h6" color="textSecondary" textAlign="left" sx={{ pl: 2, pt: 1, pb: 0 }}>
  Task 1
</Typography>
        <List>
        <ListItem key="Wallet Connected">
        <ListItemIcon>
        {isConnected() ? <CheckCircleOutline style={{ color: 'green' }} /> : <Cancel style={{ color: 'red' }} />}
        </ListItemIcon>
        <ListItemText primary="Wallet Connected" />

    </ListItem>


          
  {['Connect Contract', 'Call Poke Entrypoint'].map((text, index) => (
    <ListItem key={text}>
        <ListItemIcon>
          {index % 2 === 0 ? <CheckCircleOutline style={{ color: 'green' }} /> : <Cancel style={{ color: 'red' }} />}
        </ListItemIcon>
        <ListItemText primary={text} />

    </ListItem>
  ))}
</List>
          <Divider />        
        </Box>
      </Drawer>
    </div>
  );
};

export default TestBar;