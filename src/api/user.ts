import axios from 'axios';

// 获取 eap 接口中的用户信息
export function queryMe() {
  return axios.get(`${window.API}/EAPMe/QueryMe`);
}
