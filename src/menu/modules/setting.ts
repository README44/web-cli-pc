const setting: Menu.MenuOptions = {
  component: '/setting/index',
  name: 'settingIndex',
  path: '/setting/a',
  meta: {
    icon: 'setting',
    isAffix: false,
    isFull: false,
    isHide: false,
    isKeepAlive: true,
    isLink: '',
    title: 'setting',
    index: 2
  },
  children: [
    {
      component: '/setting/a',
      name: 'A',
      path: '/setting/a',
      meta: {
        icon: 'HomeFilled',
        isAffix: false,
        isFull: false,
        isHide: false,
        isKeepAlive: true,
        isLink: '',
        title: 'A'
      }
    },
    {
      component: '/setting/b',
      name: 'B',
      path: '/setting/b',
      meta: {
        icon: 'HomeFilled',
        isAffix: false,
        isFull: false,
        isHide: false,
        isKeepAlive: true,
        isLink: '',
        title: 'B'
      }
    }
  ]
};
export default setting;
