/**
 * @ Create Time: 2022-07-08 11:58:43
 * @ Modified time: 2022-07-08 17:08:01
 * @ Description:  人员
 */
import axios from 'axios';
import qs from 'qs';

// 获取人员列表
export function queryOrg(queryOrgParamType: QueryOrgParamType) {
  const { dptId = 0, companyId = 0 } = queryOrgParamType;
  const params = qs.stringify({
    dptId,
    companyId,
  });
  return axios.get(`${window.API}/EAPOrg/QueryOrg?${params}`);
}

// 查询人员
export function searchOrg(searchOrgType: SearchOrgType) {
  const { content } = searchOrgType;
  const params = qs.stringify({
    content,
  });
  return axios.get(`${window.API}/EAPOrg/Search?${params}`);
}
