import AddTaskIcon from '@mui/icons-material/AddTask';
import BugReportIcon from '@mui/icons-material/BugReport';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import Reply from '@mui/icons-material/Reply';
import Share from '@mui/icons-material/Share';
import TerrainIcon from '@mui/icons-material/Terrain';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.FileList]: {
    component: asyncComponentLoader(() => import('@/pages/FileList')),
    path: '/',
    title: '云盘',
    icon: HomeIcon,
  },
  [Pages.FileListX]: {
    component: asyncComponentLoader(() => import('@/pages/FileListX')),
    path: '/fileListX',
    title: '云盘X',
    icon: HomeIcon,
  },
  [Pages.Transfer]: {
    component: asyncComponentLoader(() => import('@/pages/Transfer')),
    path: '/transfer',
    title: '传输列表',
    icon: HomeIcon,
  },
  [Pages.Share]: {
    component: asyncComponentLoader(() => import('@/pages/Share')),
    path: '/Share',
    title: '查看分享',
    icon: Share,
  },
  [Pages.MyShare]: {
    component: asyncComponentLoader(() => import('@/pages/MyShare')),
    path: '/MyShare',
    title: '我的分享',
    icon: Reply,
  },
  [Pages.Page1]: {
    component: asyncComponentLoader(() => import('@/pages/Page1')),
    path: '/page-1',
    title: 'Page 1',
    icon: GitHubIcon,
  },
  [Pages.Page2]: {
    component: asyncComponentLoader(() => import('@/pages/Page2')),
    path: '/page-2',
    title: 'Page 2',
    icon: AddTaskIcon,
  },
  [Pages.Page3]: {
    component: asyncComponentLoader(() => import('@/pages/Page3')),
    path: '/page-3',
    title: 'Page 3',
    icon: TerrainIcon,
  },
  [Pages.Page4]: {
    component: asyncComponentLoader(() => import('@/pages/Page4')),
    path: '/page-4',
    title: 'Page 4',
    icon: BugReportIcon,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
    title: '404',
  },
};

export default routes;
