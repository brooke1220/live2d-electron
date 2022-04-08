const { app, BrowserWindow, screen, ipcMain } = require('electron')
const path = require('path')

let nodeDev = process.env.NODE_ENV || 'production'
let isDev = nodeDev != 'production'

function createWindow () {
    const {width,height} = screen.getPrimaryDisplay().workAreaSize

    const mainWindow = new BrowserWindow({
        width: width,
        height: height,
        transparent: true,
        resizable: false,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    mainWindow.loadURL(
        isDev
          ? 'http://localhost:3001'
          : `file://${path.join(__dirname, "../dist/index.html")}`
    )

    ipcMain.handle('setIgnoreMouseEventsWithTrue', () => {
        mainWindow.setIgnoreMouseEvents(false)
    })

    ipcMain.handle('setIgnoreMouseEventsWithFalse', () => {
        mainWindow.setIgnoreMouseEvents(true, { forward: true })
    })

    mainWindow.setAlwaysOnTop(true)
    
    isDev && mainWindow.webContents.openDevTools()
}

app.whenReady().then(async () => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})