import banner from 'vite-plugin-banner';
import { __APP_INFO__ } from '../utils';

const INFO = `

███╗   ██╗ ██████╗ ██╗   ██╗ █████╗      █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗
████╗  ██║██╔═══██╗██║   ██║██╔══██╗    ██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║
██╔██╗ ██║██║   ██║██║   ██║███████║    ███████║██║  ██║██╔████╔██║██║██╔██╗ ██║
██║╚██╗██║██║   ██║╚██╗ ██╔╝██╔══██║    ██╔══██║██║  ██║██║╚██╔╝██║██║██║╚██╗██║
██║ ╚████║╚██████╔╝ ╚████╔╝ ██║  ██║    ██║  ██║██████╔╝██║ ╚═╝ ██║██║██║ ╚████║
╚═╝  ╚═══╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝    ╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝
                                                                                
`;

export default function createBanner() {
  //   const BANNER = `
  // /**
  //   ${INFO}
  //  * name：${__APP_INFO__.pkg.name}
  //  * version：${__APP_INFO__.pkg.version}
  //  * lastBuildTime：${__APP_INFO__.lastBuildTime}
  //  */
  // `;
  return banner(`
/**
 * name：${__APP_INFO__.pkg.name}
 * version：${__APP_INFO__.pkg.version}
 * lastBuildTime：${__APP_INFO__.lastBuildTime}
 */
`);
}
