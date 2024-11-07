const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')

let mainWindow
let cameraWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js')
    }
  })

  mainWindow.loadFile('index.html')

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Відкрити камеру',
      click: () => {
        createCameraWindow()
      }
    }
  ])

  mainWindow.webContents.on('context-menu', (e, params) => {
    contextMenu.popup(mainWindow, params.x, params.y)
  })
}

function createCameraWindow() {
  cameraWindow = new BrowserWindow({
    width: 640,
    height: 480,
    parent: mainWindow,
    modal: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  cameraWindow.loadFile('camera.html')

  cameraWindow.on('closed', () => {
    cameraWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


ipcMain.on('image-captured', (event, imageData) => {

  mainWindow.webContents.send('show-image', imageData)
})
