import { remote } from 'electron';

export function initRenderer() {
  global.__$tools = remote.getGlobal('__$tools');
  global.__$api = remote.getGlobal('__$api');
  global.__$store = remote.getGlobal('__$store');

  console.log('在 UI 线程显示===================');

  console.log('在 UI 线程显示', process.env);
}
