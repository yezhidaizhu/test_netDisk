/**
 * @ Create Time: 2022-07-04 15:49:47
 * @ Modified time: 2022-07-05 17:46:43
 * @ Description: 上传操作
 */
import { useEffect, useState } from 'react';
import { atom, useRecoilState } from 'recoil';

import Uppy from '@uppy/core';
import zh_CN from '@uppy/locales/lib/zh_CN';
import XHRUpload from '@uppy/xhr-upload';

const uppyListState = atom<Uppy[] | []>({
  key: 'uppy-list-state',
  default: [],
});

const uppy = new Uppy({
  locale: zh_CN,
  autoProceed: true,
}).use(XHRUpload, {
  endpoint: 'https://localhost/upload',
  formData: true,
  fieldName: 'file-${index}',
});

export default function useUpload() {
  const [uppyList, setUppyList] = useRecoilState(uppyListState); // 当前文件列表

  return {
    uppy,
  };
}
