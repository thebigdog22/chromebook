const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('chromebook', {
  openUrl: (url) => ipcRenderer.invoke('open-url', url),
  getPlatform: () => process.platform,
  getVersion: () => process.versions.electron
});
