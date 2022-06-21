import { useState } from 'react';

import { CheckCircleOutline, CloudDownload, CloudUpload } from '@mui/icons-material';
import { Box, Fade, Grow, Tab, Tabs } from '@mui/material';
import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

import TabPanel from './components/TabPanel';

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
                icon={<tab.Icon fontSize="small" />}
                iconPosition="start"
                label={tab.label}
              />
            ))}
          </Tabs>
        </Box>
        <TabPanel show={curTab === 0}>Item 1</TabPanel>
        <TabPanel show={curTab === 1}>Item Two</TabPanel>
        <TabPanel show={curTab === 2}>Item Three</TabPanel>
      </Box>
    </>
  );
}

export default Transfer;
