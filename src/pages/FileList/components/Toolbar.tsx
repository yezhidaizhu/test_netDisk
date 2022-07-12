import { Switch } from '@mui/material';

import useTableDense from '@/store/netDisk/useTableDense';

export const toolbarHeight = 28;

export default function Toolbar(props: { rowCount: number; numSelected: number }) {
  const { rowCount = 0, numSelected } = props;
  const { isDense, toggleDense } = useTableDense();

  return (
    <div
      className=" absolute left-0 bottom-0
    w-full  py-1 
    flex items-center justify-between
    ring-1 ring-slate-100 dark:ring-slate-700
    text-gray-700 dark:text-gray-400 pl-8 
    text-sm shadow-md"
      style={{ height: toolbarHeight }}
    >
      <div>{numSelected ? `已选 ${numSelected} 项` : `共 ${rowCount} 项`}</div>

      <div className="pr-4">
        <div className="flex items-center">
          紧凑 <Switch size="small" checked={isDense} onChange={() => toggleDense()} />
        </div>
      </div>
    </div>
  );
}
