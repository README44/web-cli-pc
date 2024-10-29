import { defineConfig } from 'vite';
import { resolve } from 'path';
import createVitePlugins from './build/plugins';
import { __APP_INFO__ } from './build/utils';

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
      'process.env': {
        APP_ENV: process.env.APP_ENV
      }
    },
    plugins: createVitePlugins(),
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: atRule => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ]
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`
        }
      }
    },
    server: {
      host: '0.0.0.0'
    },
    build: {
      outDir: `dist`,
      cssCodeSplit: false,
      sourcemap: false,
      emptyOutDir: true,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          //静态资源分类打包
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
          manualChunks: {
            // 分包配置，配置完成自动按需加载
            vue: ['vue', 'vue-router', 'pinia', 'vue-i18n', 'element-plus'],
            echarts: ['echarts']
          }
        }
      }
    }
  };
});
