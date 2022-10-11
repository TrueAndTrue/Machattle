import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import styles from './styles.module.css';
import { MilitaryTech, PrecisionManufacturing, SmartToy } from '@mui/icons-material';

type Anchor = 'left'

export function DropdownMenu() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  // const navigate = useNavigate();
  // const nav = () => {
  //   navigate('/profile')
  // }

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box

      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key={'Home'} disablePadding>
          <Link to={'/Home'} className={styles.link_text}>
            <ListItemButton >
              <ListItemIcon>
                <SmartToy />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key={'Profile'} disablePadding>
          <Link to={'/Profile'} className={styles.link_text}>
            <ListItemButton>
              <ListItemIcon>
                <PrecisionManufacturing />
              </ListItemIcon>
              <ListItemText primary={'Profile'} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key={'Leaderboard'} disablePadding>
          <Link to={'/Leaderboard'} className={styles.link_text}>
            <ListItemButton>
              <ListItemIcon>
                <MilitaryTech />
              </ListItemIcon>
              <ListItemText primary={'Leaderboard'} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className={styles.dropdown_btn_container}>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button className={styles.dropdown_btn} onClick={toggleDrawer(anchor, true)}>- - -</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}