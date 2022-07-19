// 测试数据 =====================>

export function createDemoRow(num: number): FileInfo[] {
  const row = new Array(num);

  return [...row].map(() => {
    return {
      id: randomString(6),
      fileName: randomString(Math.floor(Math.random() * 30)) + '.' + randomExt(),
      size: Math.random() * 10000,
      modifyTime: randomDate(),
    };
  });
}

function randomString(e: any) {
  e = e || 32;
  let t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
    a = t.length,
    n = '';
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}

function randomDate() {
  const time = new Date().getTime();

  return time - Math.floor(Math.random() * 10000);
}

// 随机文件后缀名
function randomExt() {
  const ext = [
    'html',
    'css',
    'json',
    'png',
    'js',
    'pdf',
    'zip',
    'exe',
    'sh',
    'doc',
    'ttf',
    'ppt',
    'xls',
    'mp4',
    'mp3',
    'txt',
    'apk',
    'log',
    'svg',
    '',
  ];
  const randomIndex = Math.floor(Math.random() * ext.length);
  return ext[randomIndex];
}
