/**
 * @ Create Time: 2022-07-04 11:30:52
 * @ Modified time: 2022-07-11 16:39:23
 * @ Description:  与 electron 通信
 */
import { useRef } from 'react';

import { IpcEventType } from './types';

export default function useIPC() {
  if (!window?.electron) {
    if (import.meta.env.DEV) {
      console.error('<useIPC> : window.electron undefined');
    }
  }

  const sendMessage = useRef(window?.electron?.ipcRenderer?.sendMessage);
  const on = useRef(window?.electron?.ipcRenderer?.on);
  const once = useRef(window?.electron?.ipcRenderer?.once);
  const removeListener = useRef(window?.electron?.ipcRenderer?.removeListener);

  const sendAndOnce = (events: IpcEventType, arg: any[] = [], cb = (e: any) => {}) => {
    sendMessage.current?.(events, arg);
    once.current?.(events, cb);
  };

  return {
    sendMessage: sendMessage.current,
    on: on.current,
    once: once.current,
    removeListener: removeListener.current,
    sendAndOnce,
  };
}
