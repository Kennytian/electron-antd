#### 全局色
`@color_primary: #7cb305;`

#### 打开 render 线程调试
cmd + alt + i

#### 图标库
- https://remixicon.com/

- 用法：
1. 找到如「information」
2. 编写如例代码 `<i className="fs-48 text-info ri-information-fill" />`

#### 支持 WebView
- 添加属性 webviewTag: true

#### 保存文件
```js
const { filePath, canceled } = await remote.dialog.showSaveDialog({
  defaultPath: "text.txt"
});

if (filePath && !canceled) {
  const data = new Uint8Array(Buffer.from('Hello Node.js'));
  fs.writeFile(filePath, data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}
```

