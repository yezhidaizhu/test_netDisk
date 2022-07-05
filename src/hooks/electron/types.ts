/**
 * 这里所有事件类型，与 useIPC 要保持一致
 */
export enum IpcEventType {
  LoginOk = 'loginOk', // 登录成功

  Logout = 'logout', // 退出登录

  SaveLoginInfo = 'SaveLoginInfo', // 保存登录成功信息，并且通知登录成功

  GetUserInfo = 'getUserInfo', // 获取用户信息

  OpenBrowser = 'OpenBrowser', // 打开浏览器

  HaveNewNoti = 'haveNewNoti', // 通知有新消息

  OpenEAPMenuItem = 'openMenuItem', // 打开 eap 菜单中的链接

  GetMachineId = 'getMachineId', // 获取机器码

  SaveUserToken = 'saveUserToken', // 保存 user_token

  SaveToken = 'SaveToken', // 保存token

  ClearUserInfo = 'clearUserInfo', // 清空账号信息

  QuitApp = 'quitApp', // 关闭程序

  DisableEAPToken = 'disableEAPToken', // 使得token失活

  AutoStartup = 'AutoStartup', // 设置开机启动

  HiddenEAPMenuSearchWin = 'HiddenEAPMenuSearchWin', // 隐藏eap菜单搜索

  GetPlatformType = 'GetPlatformType', // 获取平台类型
}

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: IpcEventType, args: unknown[]): void;
        on(channel: string, func: (...args: unknown[]) => void): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
        removeListener(channel: IpcEventType, listener: unknown): void;
      };
      electronStore: {
        set(key: string, value: any): void;
        get(key: string): any;
      };
    };
  }
}

export type UserInfo = {
  userToken?: string;
  token?: string;
  eapUrl?: string;
  avatar?: string;
  userName?: string;
  unit?: string;

  machineId?: string;
  [x: string]: any;
};

export {};
