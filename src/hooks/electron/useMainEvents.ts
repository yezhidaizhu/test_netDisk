import { IpcEventType } from './types';
import useIPC from './useIPC';

/**
 * 将所有Ipc通信事件封装在此
 */
export function useMainEvents() {
  const { sendMessage, sendAndOnce } = useIPC();

  /**
   * 使得token 失活，即退出登录状态
   * 可使用在系统启动前使得之前使用的 token 失效
   */
  const disableEAPToken = () => {
    sendMessage(IpcEventType.DisableEAPToken, []);
  };

  /**
   * 设置是否开机启动
   */
  const autoStartup = (autoStartup: boolean) => {
    sendMessage(IpcEventType.AutoStartup, [{ autoStartup }]);
  };

  /**
   * 登录成功
   * @param storeData 登录成功保存的信息
   */
  const saveLoginInfo = (storeData: any, cb?: (err: string) => void) => {
    const _cb = cb || (() => {});
    sendAndOnce(IpcEventType.SaveLoginInfo, [storeData], _cb);
  };

  /**
   * 退出登录
   */
  const logout = (opts?: { openLoginWin?: boolean; clearUserInfo?: boolean }) => {
    const { openLoginWin, clearUserInfo } = opts || {};
    sendMessage(IpcEventType.Logout, [{ openLoginWin, clearUserInfo }]);
  };

  /**
   * 获取用户信息
   */
  const getUserInfo = () =>
    new Promise((resolve) => {
      sendAndOnce(IpcEventType.GetUserInfo, [], (arg: any) => {
        if ({}.toString() === {}.toString.call(arg)) {
          resolve(arg);
        }
        resolve({});
      });
    });

  /**
   * 获取机器码
   */
  const getMachineId = () =>
    new Promise((resolve) => {
      sendAndOnce(IpcEventType.GetMachineId, [], (mid: string) => {
        resolve(mid || '');
      });
    });

  /**
   * 保存 user_token
   */
  const saveUserToken = (token: string) => {
    sendMessage(IpcEventType.SaveUserToken, [token]);
  };

  /**
   * 设置开机启动
   */
  const setAutoStartup = (autoStartup: boolean) => [
    sendMessage(IpcEventType.AutoStartup, [{ autoStartup }]),
  ];

  /**
   * 隐藏菜单搜索
   */
  const hiddenMenuSearchWin = () => {
    sendMessage(IpcEventType.HiddenEAPMenuSearchWin, []);
  };

  /**
   * 获取平台类型
   */
  const getPlatformType = (_cb: (arg: any) => void) => {
    sendAndOnce(IpcEventType.GetPlatformType, [], _cb);
  };

  /**
   * 根据传入的路径，在浏览器中打开路径
   * @param url 需要打开的路劲
   */
  const openDefaultBrower = (url: string) => {
    sendMessage(IpcEventType.OpenBrowser, [url]);
  };

  return {
    disableEAPToken,
    autoStartup,
    saveLoginInfo,
    getUserInfo,
    getMachineId,
    saveUserToken,
    logout,
    setAutoStartup,
    hiddenMenuSearchWin,
    getPlatformType,
    openDefaultBrower,
  };
}
