import { app, Tray } from 'electron'

import { creatAppTray } from './tray'

$tools.log.info(`Application <${$tools.APP_NAME}> launched.`)

let tray: Tray

app.allowRendererProcessReuse = true

app.on('ready', () => {
  tray = creatAppTray()
  $tools.createWindow('Home')

  console.log('ready=========')
})

app.on('activate', () => {
  console.log('activate=========')
  if (process.platform == 'darwin') {
    $tools.createWindow('Home')
  }
})

app.on('window-all-closed', function () {
  console.log('window-all-closed=========')
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
})

app.on('before-quit', () => {
  console.log('before-quit=========')
  $tools.log.info(`Application <${$tools.APP_NAME}> has exited normally.`)
  if (process.platform === 'win32') {
    tray.destroy()
  }
})
