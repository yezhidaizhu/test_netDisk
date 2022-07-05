import { Box } from '@mui/material';

import useSidebar from '@/store/sidebar';

import Main from '../Main';
import PersistentDrawerLeft from '../Sbar';
import ControlBar from '../Sbar/ControlBar';

export default function Defaultlayout(props: { children: any }) {
  const [isSidebarOpen, sidebarActions] = useSidebar();
  const { children } = props;

  return (
    <Box sx={{ display: 'flex' }}>
      <PersistentDrawerLeft />
      <Main open={isSidebarOpen}>
        <div className="relative">
          <ControlBar />
          {children}
        </div>
      </Main>
    </Box>
  );
}
