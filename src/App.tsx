import { Fragment, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import ModalProvider from 'mui-modal-provider';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import Header from '@/sections/Header';
import HotKeys from '@/sections/HotKeys';
import Main from '@/sections/Main';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';

import Defaultlayout from './sections/Layout';
import './styles.scss';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const themeMode = useMemo(() => {
    return prefersDarkMode ? 'dark' : 'light';
  }, [prefersDarkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode],
  );

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Notifications />
        {/* <HotKeys /> */}
        <SW />
        <ModalProvider>
          <BrowserRouter>
            <Defaultlayout>
              <Pages />
            </Defaultlayout>
          </BrowserRouter>
        </ModalProvider>

        <ToastContainer theme={themeMode} hideProgressBar />
      </ThemeProvider>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
