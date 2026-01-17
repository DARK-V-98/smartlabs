const { contextBridge, ipcRenderer } = require('electron');

// Expose a controlled API to the renderer process (your React app).
contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window:minimize'),
  maximize: () => ipcRenderer.send('window:maximize'),
  close: () => ipcRenderer.send('window:close'),
});
