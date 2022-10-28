const { app, ipcMain, Menu, Tray, BrowserWindow, Notification } = require('electron');
const path = require('path');
const url = require('url');
const IPC = require(path.join(__dirname, './ipc.js')) //require('./ipc');
// const { mainInstance } = require('./utils/timMain')

let ipc;
let mainWindow;
const logoSrc = '../src/assets/logo.png' //process.env?.NODE_ENV?.trim() === 'development' ? '../icon/logo.png' : '../../icon/logo.png'
const logoPng = path.join(__dirname, logoSrc)

// 设置托盘
function setTray () {
  const tray = new Tray(logoPng)
  // 右键菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '打开',
      role: 'redo',
      click: () => {
        if (mainWindow) {
          mainWindow.show()
        }
      }
    },
    { label: '退出', role: 'quit' }
  ])
  tray.setToolTip('觅建')
  tray.setContextMenu(contextMenu)
  tray.on('click', (event,bounds,position) => {  // 监听单击做的时
    mainWindow.show()
  })
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 760,
    width: 1100,
    minWidth: 650,
    minHeight: 500,
    show:false,
    frame:false,
    icon: logoPng,
    webPreferences: {
      webSecurity: true,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
      contextIsolation: false,
      sandbox: false
    }
  })
  // setTray()
  // mainInstance.enable(mainWindow.webContents)
  global.WIN = mainWindow

  mainWindow.on('ready-to-show',() => {
    mainWindow.show()
    if(!ipc) ipc = new IPC(mainWindow);
  })
  mainWindow.on('close', () => {
    // mainWindow.webContents.send('updateHistoryMessage')
    setTimeout(() => {
      app.exit()
    }, 30)
  })
  console.log('======process env======', process.env?.NODE_ENV);
  mainWindow.loadURL(`http://172.16.4.237:5566/conversation`)
  // process.env?.NODE_ENV === 'development' ? mainWindow.loadURL(`http://172.16.4.237:5566`) : mainWindow.loadURL(`https://mijiancare.feishu.cn/drive/home/`);
  process.env?.NODE_ENV === 'development' && mainWindow.webContents.openDevTools();
}

function showNotification () {
  new Notification({
    title: '开机',
    body: '我启动了, 又是美好的一天'
  }).show()
}

app.whenReady().then(createWindow).then(showNotification)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.exit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


// 1. 窗口 最小化
ipcMain.on('window-min',function(){ // 收到渲染进程的窗口最小化操作的通知，并调用窗口最小化函数，执行该操作
  mainWindow.minimize();
})
 
// 2. 窗口 最大化、恢复
ipcMain.on('window-max',function () {
  if(mainWindow.isMaximized()){ // 为true表示窗口已最大化
    mainWindow.restore();// 将窗口恢复为之前的状态.
  }else{
    mainWindow.maximize();
  }
})
 
// 3. 关闭窗口
ipcMain.on('window-close',function (){
  // mainWindow.close();
  mainWindow.minimize();
})
