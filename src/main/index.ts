import { app, BrowserWindow } from "electron";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import { migrate } from "@/database/migrations";
import { createWindow } from "./services/window.service";
import { initialEnv } from "./services/env.service";
import { bootstrap } from "./services/bootstrap.service";
import { handleMainWindowInstance, handleProtocol } from "./services/deeplink.service";
import { runtimeConfigs } from "./services/runtime.service";

// IS_DEV
const IS_DEV = process.env.NODE_ENV === "development";

// Security warnings and recommendations are printed to the developer console.
// They only show up when the binary's name is Electron,
// indicating that a developer is currently looking at the console.
// You can force-enable or force-disable these warnings by setting
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) app.quit();

// Setup protocol and detect mainWindow instance to handle deeplink
handleProtocol();
handleMainWindowInstance();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  const quit = (e: any) => {
    console.error(e);
    app.quit();
  };

  if (IS_DEV) {
    installExtension(VUEJS_DEVTOOLS).then(initialEnv).then(migrate).then(bootstrap).catch(quit);
  } else {
    initialEnv().then(migrate).then(bootstrap).catch(quit);
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// On OS X it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  } else {
    if (!runtimeConfigs.mainWindow.isVisible()) runtimeConfigs.mainWindow.show();
    runtimeConfigs.mainWindow.focus();
  }
});
