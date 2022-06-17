import { Search as SearchIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export default function Search() {
  return (
    <IconButton size="small">
      <SearchIcon className="opacity-50 hover:opacity-90 cursor-pointer" />
    </IconButton>
  );
}
