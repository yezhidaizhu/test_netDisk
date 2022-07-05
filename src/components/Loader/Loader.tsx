import PulseLoader from 'react-spinners/PulseLoader';
import { LoaderSizeProps } from 'react-spinners/helpers/props';

const color = '#3B82F6';

function Loader(props: LoaderSizeProps) {
  return <PulseLoader {...props} color={color} />;
}

export default Loader;
