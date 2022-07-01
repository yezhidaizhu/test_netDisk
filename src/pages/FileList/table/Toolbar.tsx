import { Divider, Typography } from '@mui/material';

export const toolbarHeight = 28;

export default function Toolbar(props: { rowCount: number; numSelected: number }) {
  const { rowCount = 0, numSelected } = props;

  return (
    <div
      className=" absolute left-0 bottom-0
    w-full  py-1 
    flex items-center 
    ring-1 ring-slate-100 dark:ring-slate-700
    text-sm shadow-md"
      style={{ height: toolbarHeight }}
    >
      <div className="w-8"></div>
      <span className="text-gray-700 dark:text-gray-400  ">
        {numSelected ? `已选 ${numSelected} 项` : `共 ${rowCount} 项`}
      </span>
    </div>
  );
}
