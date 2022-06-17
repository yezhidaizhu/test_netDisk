import { Divider, Typography } from '@mui/material';

export default function Toolbar(props: { rowCount: number; numSelected: number }) {
  const { rowCount = 0, numSelected } = props;

  return (
    <>
      <div className="p-2  pl-4  flex items-center">
        <span className="text-gray-700 dark:text-gray-400 ">
          {numSelected ? `已选 ${numSelected} 项` : `共 ${rowCount} 项`}
        </span>
      </div>
      <Divider />
    </>
  );
}
