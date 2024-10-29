import autoImport from 'unplugin-auto-import/vite';
import { VantResolver } from '@vant/auto-import-resolver';

export default function createAutoImport() {
  return autoImport({
    include: [/\.[tj]sx?$/, /\.vue\?vue/, /\.md$/],
    imports: ['vue', 'vue-router', 'pinia'],
    resolvers: [VantResolver()],
    dts: 'src/types/auto-imports.d.ts'
  });
}
