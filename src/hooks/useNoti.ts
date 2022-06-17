import { OptionsObject, SnackbarMessage, useSnackbar } from 'notistack';

export default function useNoti() {
  const { enqueueSnackbar } = useSnackbar();

  const noti = (
    message: SnackbarMessage,
    options: OptionsObject | undefined = {},
    type: NotiType = 'default',
  ) => {
    const opts: OptionsObject = { variant: type, ...options };
    enqueueSnackbar(message, opts);
  };

  const success = (message: SnackbarMessage, options: OptionsObject | undefined = {}) =>
    noti(message, options, 'success');
  const error = (message: SnackbarMessage, options: OptionsObject | undefined = {}) =>
    noti(message, options, 'error');
  const info = (message: SnackbarMessage, options: OptionsObject | undefined = {}) =>
    noti(message, options, 'info');
  const warning = (message: SnackbarMessage, options: OptionsObject | undefined = {}) =>
    noti(message, options, 'warning');

  return {
    noti,
    success,
    error,
    info,
    warning,
  };
}

type NotiType = 'default' | 'success' | 'error' | 'info' | 'warning';
