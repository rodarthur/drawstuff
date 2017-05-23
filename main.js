const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

// keep a global reference of the window object, if you don't, the window will be closed automatically when the js object is garbage collected.
let win;

function createWindow() {
  // create the browser window
  win = new BrowserWindow({width: 800, height: 600});

  // load the index.html of the app
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // open the dev tools
  win.webContents.openDevTools();

  // emitted when the window is closed.
  win.on('closed', () => {
    // dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
};

// this method will be called when Eelectron has finished
// initialization and is ready to create browser windows.
// some apis can only be used after this event occurs.
app.on('ready', createWindow);

// quite when all windows are closed.
app.on('window-all-closed', () => {
  // on macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  };
});

app.on('activate', () => {
  // on mac os it's common to re-create a window in the app when the 
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  };
});

// in this file you can include the rest of your app's specific main process
// code. you can also put them in sparate files and require them here.