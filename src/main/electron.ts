import path from "path";
import { app, BrowserWindow } from "electron";

function isDev() {
  return process.env.NODE_ENV === "development";
}

function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      //遇到ReferenceError: global is not defined,需要配下面这个才能解决
      contextIsolation: false,
    },
  });

  if (isDev()) {
    // 在开发环境下，加载的是运行在 7001 端口的 React
    mainWindow.loadURL(`http://127.0.0.1:7001`);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, "../dist/index.html")}`);
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
