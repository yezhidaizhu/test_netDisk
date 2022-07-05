/**
 * @ Create Time: 2022-07-05 10:35:50
 * @ Modified time: 2022-07-05 11:00:12
 * @ Description:  用户头像
 */
import { useEffect, useState } from 'react';

import { queryMe } from '@/api';

import useUser from './electron/useUser';

export default function useAvatar() {
  const { userInfo } = useUser();
  const [avatar, setAvatar] = useState(``);

  const getEapUserInfo = async () => {
    const { data } = await queryMe();
    if (data.result === 0) {
      const hash = data.me.avatarHash || '';
      hash && setAvatar(`${userInfo.eapUrl}/Service/WxGetFile?hash=${hash}`);
    }
  };

  useEffect(() => {
    if (userInfo.eapUrl) {
      getEapUserInfo();
    }
  }, [userInfo.eapUrl]);

  return {
    avatar,
  };
}
