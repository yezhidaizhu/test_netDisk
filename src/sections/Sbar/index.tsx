import { Link, useLocation } from 'react-router-dom';

import { CompareArrows, Save, Settings } from '@mui/icons-material';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import routes from '@/routes';
import { Pages } from '@/routes/types';
import useSidebar from '@/store/sidebar';

export const drawerWidth = 240;

const labelList1 = [
  {
    label: '云盘',
    Icon: Save,
    path: routes[Pages.FileList].path,
  },
  {
    label: '文件传输',
    Icon: CompareArrows,
    path: routes[Pages.Transfer].path,
  },
];

const labelList2 = [
  {
    label: '设置',
    Icon: Settings,
    path: routes[Pages.Page3].path,
  },
];

export default function PersistentDrawerLeft() {
  const [isSidebarOpen, sidebarActions] = useSidebar();

  const location = useLocation();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={isSidebarOpen}
      className="text-gray-500"
    >
      <Box className="p-2">
        <List>
          <SideList list={labelList1} curPath={location.pathname} />
        </List>
        <Divider />
        <List>
          <SideList list={labelList2} curPath={location.pathname} />
        </List>
      </Box>
    </Drawer>
  );
}

function SideList(props: { list: { label: string; path: string; Icon?: any }[]; curPath: string }) {
  const { list = [], curPath } = props;

  return (
    <List>
      {list.map((item, index) => (
        <ListItem
          key={item.label}
          className="rounded overflow-hidden"
          component={Link}
          to={item.path}
          selected={curPath === item.path}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <item.Icon />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
