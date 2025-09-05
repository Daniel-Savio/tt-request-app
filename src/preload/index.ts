import { contextBridge, ipcRenderer } from 'electron'
import { IPC } from 'shared/constants'
import { AppData, StatusResponse, } from 'shared/types'

declare global {
  interface Window {
    App: typeof API
  }
}

const API = {
  sayHelloFromBridge: () => console.log('\nHello from bridgeAPI! 👋\n\n'),

  pullGitStatus(): Promise<StatusResponse> {
    return ipcRenderer.invoke(IPC.GITSTATUS.PULL)
  },
  cloneGitStatus(): Promise<StatusResponse> {
    return ipcRenderer.invoke(IPC.GITSTATUS.CLONE)
  },
  getJsonData(): Promise<AppData> {
    return ipcRenderer.invoke(IPC.JSON.FETCH)
  }
}

contextBridge.exposeInMainWorld('App', API)
