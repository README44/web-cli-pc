import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import appInfo from './app-info';
import createAutoImport from './auto-import';
import createComponents from './components';
import createDevtools from './dev-tools';
import createHtml from './html';
import createUnocss from './unocss';
import createSetupExtend from './setup-extend';
import createLayouts from './layouts';
import createPage from './pages';
import createCompression from './compression';
import createBanner from './banner';
import createCodeInspectorPlugin from './codeInspectorPlugin.ts';
import createNodePolyfills from './node-polyfills.ts';
import createSvgIconsPlugin from './svg.ts';

export default function createVitePlugins() {
  const vitePlugins: (PluginOption | PluginOption[])[] = [appInfo(), vue(), vueJsx()];

  vitePlugins.push(createAutoImport());
  vitePlugins.push(createComponents());
  vitePlugins.push(createDevtools());
  vitePlugins.push(createHtml());
  vitePlugins.push(createUnocss());
  vitePlugins.push(createSetupExtend());
  vitePlugins.push(createLayouts());
  vitePlugins.push(createPage());
  vitePlugins.push(createCompression());
  vitePlugins.push(createBanner());
  vitePlugins.push(createCodeInspectorPlugin());
  vitePlugins.push(createNodePolyfills());
  vitePlugins.push(createSvgIconsPlugin());

  return vitePlugins;
}
