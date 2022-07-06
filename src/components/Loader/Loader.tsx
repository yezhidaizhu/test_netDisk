import MoonLoader from 'react-spinners/MoonLoader';
import { LoaderSizeProps } from 'react-spinners/helpers/props';

const color = '#3B82F6';

function Loader(props: LoaderSizeProps) {
  return <MoonLoader {...props} color={color} />;
}

export default Loader;
