const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    frame: false, // This is key for custom window controls
    titleBarStyle: 'hidden', // Hides default title bar but keeps traffic lights on macOS
    trafficLightPosition: { x: 15, y: 15 }, // macOS traffic light position
    backgroundColor: '#F8F8FF', // Match your app's off-white background
  });

  // In development, load from the Next.js dev server.
  // In production, you would load the output from `next build`.
  win.loadURL(
    isDev
      ? 'http://localhost:9002'
      : `file://${path.join(__dirname, '../out/index.html')}` // Placeholder for production
  );

  // IPC listeners for our custom window controls
  ipcMain.on('window:minimize', () => {
    win.minimize();
  });

  ipcMain.on('window:maximize', () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  ipcMain.on('window:close', () => {
    win.close();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
