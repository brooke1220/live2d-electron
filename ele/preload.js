const resolve = require('path').resolve
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('setIgnoreMouseEvents', (hoverd) => {
    if(hoverd){
        ipcRenderer.invoke('setIgnoreMouseEventsWithTrue')
    }else{
        ipcRenderer.invoke('setIgnoreMouseEventsWithFalse')
    }
})