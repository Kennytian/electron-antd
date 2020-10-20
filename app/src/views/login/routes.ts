const routes: RouteConfig[] = [
  {
    key: 'Login',
    path: '/login',
    windowOptions: {
      title: '登录',
      resizable: false,
      minimizable: false,
      maximizable: false,
      fullscreenable: false,
      width: 300,
      height: 240,
    },
    createConfig: {
      showTitlebar: true,
      hideMenus: true,
    },
  },
];

export default routes;
