import { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { CompareArrows, Save, Settings } from '@mui/icons-material';
import { Box, Fade, Grow } from '@mui/material';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import useUser from '@/hooks/electron/useUser';
import useAvatar from '@/hooks/useAvatar';
import routes from '@/routes';
import { Pages } from '@/routes/types';
import useDiskSpace from '@/store/netDisk/useDiskSpace';
import useSidebar from '@/store/sidebar';
import { fsize } from '@/utils/helper';

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
  const [isSidebarOpen] = useSidebar();

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
      <Box className="p-2 flex flex-col justify-between h-full">
        <Box>
          <SideList list={labelList1} curPath={location.pathname} />
          <Divider />
          <SideList list={labelList2} curPath={location.pathname} />
        </Box>

        <DiskSpace />
      </Box>
    </Drawer>
  );
}

function SideList(props: { list: { label: string; path: string; Icon?: any }[]; curPath: string }) {
  const { list = [], curPath } = props;

  return (
    <List dense>
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

function DiskSpace() {
  const { space } = useDiskSpace();
  const { userInfo } = useUser();
  const { avatar } = useAvatar();

  const size = useMemo(() => fsize(space), [space]);

  return (
    <div className="flex flex-col gap-2 text-sm text-gray-500 p-4">
      <span> 剩余空间：{size} </span>
      <Divider />
      <div className="flex items-center gap-3 text-xs pt-1">
        {avatar && (
          <Grow in={!!avatar}>
            <img src={avatar} className="rounded-full w-10 h-10 " />
          </Grow>
        )}

        <div className="flex flex-col gap-2 max-w-full overflow-hidden">
          <div className=" truncate ">用户名：{userInfo.userName}</div>
          <div className=" truncate ">单位：{userInfo.unit}</div>
        </div>
      </div>
    </div>
  );
}
