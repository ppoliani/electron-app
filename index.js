const {app, BrowserWindow} = require('electron')
const url = require('url');
const path = require('path');

// Add React extension for development
// const {
//   default: installExtension, 
//   REACT_DEVELOPER_TOOLS
// } = require('electron-devtools-installer')

// Keep a reference for dev mode
let dev = process.env.NODE_ENV === 'dev';

// Temporary fix for broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true')
  app.commandLine.appendSwitch('force-device-scale-factor', '1')
}

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false, // don't show until window is ready
    webPreferences: {
      nodeIntegration: true
    }
  })

  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    win.loadURL('http://localhost:3000/index.html');
  } 
  else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    })

    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }


  // Don't show the app window until it is ready and loaded
  win.once('ready-to-show', () => {
    win.show()
    // Open the DevTools automatically if developing
    // TODO: this doesn't work with the latest version of electron
    // https://github.com/dimitarnestorov/react-devtools-electron/issues/162
    if (dev) {
      win.webContents.openDevTools();
    //   installExtension(REACT_DEVELOPER_TOOLS)
    //     .catch(err => console.log('Error loading React DevTools: ', err))
    //     win.webContents.openDevTools()
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
