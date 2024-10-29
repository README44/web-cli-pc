import { createHtmlPlugin } from 'vite-plugin-html';
import dayjs from 'dayjs';
import { __APP_INFO__ } from '../utils';

const t = dayjs(__APP_INFO__.lastBuildTime).format('YYYYMMDDHHmmss');

const getAppConfigSrc = () => {
  return `/admin-config.js?v=${__APP_INFO__.pkg.version}-${t}`;
};

export default function createHtml() {
  return createHtmlPlugin({
    inject: {
      data: {
        title: __APP_INFO__.APP_TITLE,
        __APP_INFO__: JSON.stringify(__APP_INFO__)
      },
      tags: [
        {
          tag: 'script'
          // attrs: {
          //   src: getAppConfigSrc()
          // }
        }
      ]
    }
  });
}
