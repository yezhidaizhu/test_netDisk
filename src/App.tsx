import { Fragment, useMemo } from 'react';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import ModalProvider from 'mui-modal-provider';
import { SnackbarProvider } from 'notistack';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import Header from '@/sections/Header';
import HotKeys from '@/sections/HotKeys';
import Main from '@/sections/Main';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';

import useThemeMode from './hooks/useThemeMode';
import Defaultlayout from './sections/Layout';
import './styles.scss';

function App() {
  const { mode } = useThemeMode();

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <Fragment>
      <SnackbarProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Notifications />
          {/* <HotKeys /> */}
          <SW />
          <ModalProvider>
            <HashRouter>
              <Defaultlayout>
                <Pages />
              </Defaultlayout>
            </HashRouter>
          </ModalProvider>

          <ToastContainer theme={mode} hideProgressBar />
        </ThemeProvider>
      </SnackbarProvider>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
