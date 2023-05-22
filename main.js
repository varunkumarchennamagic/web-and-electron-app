const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile('src/index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.on('xlsx-to-json', (event, jsonData) => {
  event.reply('json-data', jsonData);
});

const XLSX = require('xlsx');

ipcMain.on('convert-request', (event, jsonData) => {
    console.log("reached main.js convert-request")
  try {
    // Convert the XLSX data to JSON
    const workbook = XLSX.read(jsonData, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    
    // Send the converted JSON data back to the renderer process
    event.reply('json-data', JSON.stringify(sheetData));
  } catch (error) {
    // Handle any errors that occurred during conversion
    event.reply('conversion-error', error.message);
  }
});

ipcMain.on('convert-and-download', (event, jsonData) => {
    console.log("reached main.js convert-and-download")
  try {
    // Convert the XLSX data to JSON
    const workbook = XLSX.read(jsonData, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    
    // Send the converted JSON data back to the renderer process
    event.reply('json-data', JSON.stringify(sheetData));
  } catch (error) {
    // Handle any errors that occurred during conversion
    event.reply('conversion-error', error.message);
  }
});