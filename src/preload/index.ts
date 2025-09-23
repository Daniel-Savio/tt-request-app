import { contextBridge, ipcRenderer } from 'electron'
import { IPC } from 'shared/constants'
import type { AppData, StatusResponse } from 'shared/types'

declare global {
  interface Window {
    App: typeof API
  }
}

const API = {

  pullGitStatus(): Promise<StatusResponse> {
    return ipcRenderer.invoke(IPC.GITSTATUS.PULL)
  },
  cloneGitStatus(): Promise<StatusResponse> {
    return ipcRenderer.invoke(IPC.GITSTATUS.CLONE)
  },
  getJsonData(): Promise<AppData> {
    return ipcRenderer.invoke(IPC.JSON.FETCH)
  },
  gitStatus: (callback: (id: string) => void) => {
    const listener = (_event: any, id: string) => callback(id);
    ipcRenderer.on(IPC.GITSTATUS.FETCH, listener);
    return () => ipcRenderer.removeListener(IPC.GITSTATUS.FETCH, listener);
  },


  ipcRenderer: {
    send: (channel: string, data: any) => {
      ipcRenderer.send(channel, data)
    },
    on: (channel: string, func: (...args: any[]) => void) => {
      const subscription = (_event: any, ...args: any[]) => func(...args)
      ipcRenderer.on(channel, subscription)

      return () => {
        ipcRenderer.removeListener(channel, subscription)
      }
    },
    removeAllListeners: (channel: string) => {
      ipcRenderer.removeAllListeners(channel)
    },
  },
}


contextBridge.exposeInMainWorld('App', API)
