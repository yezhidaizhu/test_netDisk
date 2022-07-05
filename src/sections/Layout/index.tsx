import { useEffect } from 'react';

import { Box } from '@mui/material';

import InputUpload from '@/components/InputUpload/InputUpload';
import useUser from '@/hooks/electron/useUser';
import useDiskSpace from '@/store/netDisk/useDiskSpace';
import useSidebar from '@/store/sidebar';

import Main from '../Main';
import PersistentDrawerLeft from '../Sbar';
import ControlBar from '../Sbar/ControlBar';

export default function Defaultlayout(props: { children: any }) {
  const { children } = props;

  const [isSidebarOpen] = useSidebar();
  const { userInfo, initUser } = useUser();
  const { refreshSpace } = useDiskSpace();

  useEffect(() => {
    initUser();
  }, []);

  useEffect(() => {
    if (userInfo.eapUrl) {
      refreshSpace();
    }
  }, [userInfo]);

  return (
    <Box sx={{ display: 'flex' }}>
      <PersistentDrawerLeft />
      <Main open={isSidebarOpen}>
        <div className="relative" id="main">
          <ControlBar />
          {children}
        </div>
      </Main>
      <InputUpload />
    </Box>
  );
}
