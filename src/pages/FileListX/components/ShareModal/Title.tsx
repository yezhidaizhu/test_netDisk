/**
 * @ Create Time: 2022-07-08 09:54:33
 * @ Modified time: 2022-07-08 18:08:06
 * @ Description:  头部
 */
import { Search } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export default function Title(props: { toggleSearch: () => void }) {
  const { toggleSearch } = props;

  return (
    <div className="flex justify-between items-center pl-4 pr-2">
      <span className="text-lg">请选择分享人员</span>
      <IconButton size="small" onClick={toggleSearch}>
        <Search />
      </IconButton>
    </div>
  );
}
