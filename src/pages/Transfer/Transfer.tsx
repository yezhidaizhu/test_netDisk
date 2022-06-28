import { useState } from 'react';

import { CheckCircleOutline, CloudDownload, CloudUpload } from '@mui/icons-material';
import { Box, Tab, Tabs } from '@mui/material';

import Meta from '@/components/Meta';

import TabPanel from './components/TabPanel';
import DownloadTab from './downloadTab';
import UploadTab from './uploadTab';

const tabs = [
  {
    key: 'upload',
    label: '上传',
    Icon: CloudUpload,
  },
  {
    key: 'download',
    label: '下载',
    Icon: CloudDownload,
  },
  {
    key: 'finish',
    label: '完成',
    Icon: CheckCircleOutline,
  },
];

function Transfer() {
  const [curTab, setCurTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurTab(newValue);
  };

  return (
    <>
      <Meta title="传输列表" />
      <Box
        className="flex flex-col h-screen  overflow-hidden pl-16 pb-2
      transition scale-100
      "
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingTop: 2 }}>
          <Tabs value={curTab} onChange={handleChange}>
            {tabs.map((tab) => (
              <Tab
                key={tab.key}
                label={
                  <div className="flex gap-2 items-center">
                    <tab.Icon fontSize="small" />
                    {tab.label}
                  </div>
                }
              ></Tab>
            ))}
          </Tabs>
        </Box>
        <TabPanel show={curTab === 0}>
          <UploadTab />
        </TabPanel>
        <TabPanel show={curTab === 1}>
          <DownloadTab />
        </TabPanel>
        <TabPanel show={curTab === 2}>Item Three</TabPanel>
      </Box>
    </>
  );
}

export default Transfer;
