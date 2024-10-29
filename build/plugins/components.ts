import components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

export default function createComponents() {
  return components({
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    resolvers: [VantResolver()],
    dts: 'src/types/components.d.ts'
  });
}
