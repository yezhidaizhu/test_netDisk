import { Search as SearchIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import useSearch from '../store/useSearch';

export default function Search() {
  const { toggleOpenSearch } = useSearch();
  return (
    <IconButton size="small" onClick={toggleOpenSearch}>
      <SearchIcon className="opacity-50 hover:opacity-90 cursor-pointer" />
    </IconButton>
  );
}
