import dayjs from 'dayjs';
import { name, version, engines } from '../package.json';

const __APP_INFO__ = {
  pkg: { name, version, engines },
  APP_TITLE: 'web-cli-pc',
  APP_TITLE_SHORT: '',
  lastBuildTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
};

export { __APP_INFO__ };
