const { app, BrowserWindow, ipcMain } = require("electron");
const log = require("electron-log");
const electronLocalshortcut = require('electron-localshortcut');
const { autoUpdater } = require("electron-updater");
const Storage = require("./storage");

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

const storage = new Storage();

log.info(storage.db);

class Main {
    constructor() {
        let self = this;
        this.mainWindow = null;

        this._init();

    }
    _init() {
        app.whenReady().then(() => {
            this.autoupdate();
            this.setWindowMain();
            this.addListeners();

            this.mainWindow.once("ready-to-show", () => {
                this.mainWindow.show();
            })
        });

        app.on("before-quit", () => {
            storage.saveAll();
        })
    }
    setWindowMain() {
        this.mainWindow = new BrowserWindow({
            width: 1800,
            height: 1020,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true
            }
        });
        this.mainWindow.loadURL(__dirname + "/devBuild/index.html");
        this.mainWindow.removeMenu();
        this.addShortCuts();
    }
    autoupdate() {
        autoUpdater.checkForUpdatesAndNotify();

        autoUpdater.on('update-available', (info) => {
            this.mainWindow.webContents.send("updateMessage", { status: "Update available!" });
        })

        autoUpdater.on('update-downloaded', (info) => {
            autoUpdater.quitAndInstall();
        })
    }
    exit() {
        app.quit();
    }
    addListeners() {
        ipcMain.on("getRecipes", (eve, args) => {
            const recipes = storage.getRecipes();

            this.mainWindow.webContents.send("recipes", recipes);
        });

        ipcMain.on("newRecipe", (ev, args) => {
            storage.newRecipe(args);
        });

        ipcMain.on("save", () => {
            console.log("save");
            this.mainWindow.webContents.send("getSave");
        });

        ipcMain.on("getRecipeById", (ev, args) => {
            this.mainWindow.webContents.send("recipe", storage.getRecipeById(args));
        });

        ipcMain.on("saveData", (ev, args) => {
            storage.updateRecipe(args.id, args.content);
        });

        ipcMain.on("deleteRecipe", (ev, args) => {
            storage.deleteRecipe(args);
        });

        ipcMain.on("exit", () => {
            this.exit();
        })
    }
    addShortCuts() {
        electronLocalshortcut.register(this.mainWindow, "F12", () => {
            this.mainWindow.webContents.openDevTools();
        });
        electronLocalshortcut.register(this.mainWindow, "CTRL+R", () => {
            this.mainWindow.webContents.reload();
        })
    }

}

const main = new Main();