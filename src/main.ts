import { createApp, App as IApp } from 'vue';
import App from '@/App.vue';
// custom directives
import directives from '@/directives';
// vue Router
import router from '@/router';
// pinia store
import pinia from '@/stores';
// vue i18n
import I18n from '@/i18n';
import 'vue-global-api';
import '@/utils/system-copyright';
// element icons
import * as Icons from '@element-plus/icons-vue';
// svg icons
import 'virtual:svg-icons-register';
// element plus
import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';
// import 'element-plus/theme-chalk/dark/css-vars.css';
// style
import '@/styles/index.scss';
// icon-park
import { install } from '@icon-park/vue-next/es/all';
import '@icon-park/vue-next/styles/index.css';
// uno
import 'uno.css';

let app: IApp;

function render(props: any) {
  const { container } = props;
  app = createApp(App);
  Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons]);
  });
  install(app, 'nova-i');
  app.use(ElementPlus);
  app.use(directives);
  app.use(router);
  app.use(I18n);
  app.use(pinia);
  app.mount(container ? container.querySelector('#app') : '#app');
}

render({});
