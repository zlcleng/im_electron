const { ipcMain } = require('electron')
const TimMain = require('im_electron_sdk/dist/main')
const Store = require('electron-store')
const { SDK_APP_ID } = require('./const');

const store = new Store()
Store.initRenderer()

let mainInstance;
let catchedSdkAppId;
const settingConfig = store.get('setting-config')
const sdkappid = catchedSdkAppId = settingConfig?.sdkappId ?? SDK_APP_ID

const initTimMain = (appid) => {
  mainInstance = new TimMain({
    sdkappid: appid
  })
}
// 初始化
initTimMain(sdkappid)

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
ipcMain.handle('re-create-main-instance',async (event, newSdkAppid) => {
  console.log("************ re-create-main-instance",newSdkAppid)
  if( newSdkAppid !== catchedSdkAppId ) {
    catchedSdkAppId = newSdkAppid
    mainInstance.destroy()
    await initTimMain(newSdkAppid)
  }

  await sleep(1000)
  return
})

module.exports = {
  mainInstance,
  initTimMain
}