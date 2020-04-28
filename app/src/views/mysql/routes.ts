const routes: RouteConfig[] = [
  {
    key: 'MySQL',
    path: '/mysql',
    windowOptions: {
      title: 'MySQL',
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
]

export default routes
