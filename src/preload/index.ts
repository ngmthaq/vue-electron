// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import type { ElectronEventCallbackType } from "@/configs/types/electron";
import { ipcRenderer } from "electron";
import { localStorage } from "./services/storage.service";
import { versions } from "./services/versions.service";
import { frame } from "./services/frame.service";
import { env } from "./services/env.service";
import { localDatabase } from "./services/database.service";

/**
 * Electron Add Event Listener
 *
 * @param eventName
 * @param callback
 */
const addEventListener = (eventName: string, callback: ElectronEventCallbackType) => {
  ipcRenderer.on(eventName, callback);
};

/**
 * Electron Remove Event Listener
 *
 * @param eventName
 * @param callback
 */
const removeEventListener = (eventName: string, callback: ElectronEventCallbackType) => {
  ipcRenderer.off(eventName, callback);
};

/**
 * Electron Preload Object
 */
export const electronPreload = {
  env: env,
  frame: frame,
  versions: versions,
  platform: process.platform,
  localStorage: localStorage,
  localDatabase: localDatabase,
  addEventListener: addEventListener,
  removeEventListener: removeEventListener,
};
