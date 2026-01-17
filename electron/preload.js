const { contextBridge, ipcRenderer } = require('electron');

// Expose a controlled API to the renderer process (your React app).
// This is a security best practice for Electron apps with contextIsolation enabled.
contextBridge.exposeInMainWorld('electronAPI', {
  /**
   * Sends a message to the main process via a specified channel.
   * @param {string} channel - The channel to send the message on.
   * @param {*} data - The data to send with the message.
   */
  send: (channel, data) => {
    // Whitelist the channels you want to allow.
    // This prevents the renderer from sending arbitrary messages to the main process.
    const validChannels = ['window:minimize', 'window:maximize', 'window:close'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
});
