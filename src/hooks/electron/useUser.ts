/**
 * @ Create Time: 2022-07-04 11:23:50
 * @ Modified time: 2022-07-04 16:58:00
 * @ Description:  获取系统信息，包括 eap 地址
 */
import { atom, useRecoilState } from 'recoil';

import { UserInfo } from './types';
import { useMainEvents } from './useMainEvents';

const electronUserInfoState = atom<UserInfo>({
  key: 'electron-userInfo-state',
  default: {},
});

export default function useUser() {
  const { getUserInfo } = useMainEvents();
  const [userInfo, setUserInfo] = useRecoilState<UserInfo>(electronUserInfoState);

  // 从 electron 中获取eap登录信息，包括服务地址
  const initUser = async () => {
    const info: any = (await getUserInfo()) || {};
    setUserInfo(info);
    // api 写到全局中

    if (info.eapUrl) {
      window.EAP = info.eapUrl;
      window.API = info.eapUrl + '/wxapi/';
    }
  };

  return { userInfo, initUser };
}
