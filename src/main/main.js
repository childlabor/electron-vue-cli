// Modules to control application life and create native browser window
const {app, BrowserWindow, BrowserView, ipcMain } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function isDev() {
  return process.env['NODE_ENV'] === 'development'
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { // 网页功能的设置
      nodeIntegration: true
    },
    // show: false, // 页面加载完毕再显示应用窗口
    // alwaysOnTop: true // 窗口是否永远在别的窗口的上面
  })

  if (isDev()) {
    // 按照常规框架的方式（vue）启动一个webpcak服务器进行开发, Electron通过HTTP协议打开页面, 这样我们依旧可以享受到代码热更新等功能
    mainWindow.loadURL('http://172.20.10.2:8080/');
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
  } else {
    // and load the index.html of the app.
    mainWindow.loadFile('./dist/index.html')
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // 页面加载完毕再显示应用窗口
  // mainWindow.once('ready-to-show', () => {
  //   mainWindow.show()
  // })

  // 子窗口-视图窗口
  // let view = new BrowserView({
  //   webPreferences: {
  //     nodeIntegration: false
  //   }
  // })
  // mainWindow.setBrowserView(view)
  // view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
  // view.webContents.loadURL('https://electronjs.org')

  // 父子窗口-浏览器窗口
  // let child = new BrowserWindow({
  //   parent: mainWindow,
  //   width: 400,
  //   height: 300,
  // })
  // child.loadURL('http://172.20.10.2:8080/');
  // child.show()

  // 进程间通信
  ipcMain.on('asynchronous-message', (event, arg) => {
    console.log('main:',  arg) // prints "ping"
    event.sender.send('asynchronous-reply', 'pong')
  })
  ipcMain.on('synchronous-message', (event, arg) => {
    console.log('main:', arg) // prints "ping"
    event.returnValue = 'pong'
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
