/**
 * @ Create Time: 2022-07-08 18:03:26
 * @ Modified time: 2022-07-11 10:08:23
 * @ Description:  尾部确认
 */
import { useEffect, useState } from 'react';

import { Button, TextField } from '@mui/material';

import useNoti from '@/hooks/useNoti';
import { checkFolderName } from '@/utils/helper';

import useShareDrawer from '../../store/useShareDrawer';

export default function EndAction(props: { onComfirm: (fileName: string) => void }) {
  const { onComfirm } = props;
  const noti = useNoti();
  const { shareFiles } = useShareDrawer();

  const [shareName, setShareName] = useState('');
  const [inputErr, setInputErr] = useState(false);

  useEffect(() => {
    const _shareName = shareFiles.map((file) => file.fileName).join(',');
    setShareName(_shareName);
  }, []);

  const onInputChange = (e: any) => {
    const value = e.target.value;
    setShareName(value);
    setInputErr(false);
  };

  const _onComfirm = () => {
    // 文件名检查
    const err = checkFolderName(shareName);
    if (err) {
      noti.error(err);
      setInputErr(true);
    } else {
      onComfirm(shareName);
    }
  };

  return (
    <div className="flex justify-between gap-4 items-center p-4 bg-gray-700">
      <TextField
        error={inputErr}
        size="small"
        value={shareName}
        fullWidth
        label={'分享名称'}
        onChange={onInputChange}
        spellCheck={false}
        inputProps={{
          maxLength: 30,
        }}
      />
      <Button variant="contained" onClick={_onComfirm}>
        确认
      </Button>
    </div>
  );
}
