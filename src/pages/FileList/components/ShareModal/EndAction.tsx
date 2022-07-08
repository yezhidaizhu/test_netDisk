/**
 * @ Create Time: 2022-07-08 18:03:26
 * @ Modified time: 2022-07-08 18:16:06
 * @ Description:  尾部确认
 */
import { Button, TextField } from '@mui/material';

export default function EndAction() {
  return (
    <div className="flex justify-between gap-4 items-center p-4 bg-gray-700">
      <TextField size="small" fullWidth label={'分享名称'} />
      <Button variant="contained">确认</Button>
    </div>
  );
}
