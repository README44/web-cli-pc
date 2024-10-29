import boxen from 'boxen';
import picocolors from 'picocolors';
import { copyFileSync } from 'fs';
import { resolve } from 'path';
import type { Plugin } from 'vite';

export default function appInfo(): Plugin {
  return {
    name: 'appInfo',
    apply: 'serve',
    async buildStart() {
      const { bold, green, cyan, bgGreen, underline } = picocolors;
      console.log(
        boxen(
          `${bold(green(`由 ${bgGreen(' NOVA-ADMIN ')} 驱动`))}\n\n${cyan('在线文档：')}${underline('还没有')}\n${cyan('持续迭代优化的前后端分离中后台管理系统框架。')}`,
          {
            padding: 0.5,
            borderColor: 'cyan',
            borderStyle: 'round'
          }
        )
      );
      // 更新配置
      // if (process.env.APP_ENV) {
      //   copyFileSync(
      //     resolve(process.cwd(), `build/conf/admin-config-${process.env.APP_ENV}.js`),
      //     resolve(process.cwd(), `public/admin-config.js`)
      //   );
      // }
    }
  };
}
