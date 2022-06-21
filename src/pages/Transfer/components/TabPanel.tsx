import { Fade } from '@mui/material';

export default function TabPanel(props: { children: any; show: boolean; [x: string]: any }) {
  const { children, show, ...other } = props;

  return (
    <Fade in={show} style={{ transformOrigin: '0 0 0' }}>
      <div
        className={`
        flex-1 p-4
        ${show ? 'block' : 'hidden'}
      `}
        {...other}
      >
        {children}
      </div>
    </Fade>
  );
}
