import { APP_CONFIG } from '@/config';

const copyright_common_style = 'font-size: 14px; margin-bottom: 2px; padding: 6px 8px; color: #fff;';
const copyright_main_style = `${copyright_common_style} background: #e24329;`;
const copyright_sub_style = `${copyright_common_style} background: #707070;`;

console.info(`%cDriven by %cNOVA LINK%c`, copyright_sub_style, copyright_main_style, copyright_sub_style);
console.info(`APP_MODE: ${APP_CONFIG.APP_MODE}`);
