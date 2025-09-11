import { ipcMain } from 'electron'
import { cloneRepository, pullChanges } from 'main/git-operations'
import { getJsonData } from 'main/model'
import { IPC } from 'shared/constants'
import type { AppData, StatusResponse } from 'shared/types'

ipcMain.handle(IPC.GITSTATUS.PULL, async (): Promise<StatusResponse> => {
  try {
    await pullChanges()
    return { isSuccess: true, message: 'Repositorio clonado e atualizado' }
  } catch (_e: any) {
    return { isSuccess: false, message: e.message }
  }
})

ipcMain.handle(IPC.GITSTATUS.CLONE, async (): Promise<StatusResponse> => {
  try {
    await cloneRepository()
    return { isSuccess: true, message: 'Repositorio clonado e atualizado' }
  } catch (_e: any) {
    return { isSuccess: false, message: e.message }
  }
})

ipcMain.handle(IPC.JSON.FETCH, async (): Promise<AppData> => {
  try {
    const jsonData = await getJsonData()
    console.log(jsonData)
    return { isSuccess: true, data: jsonData }
  } catch (_e: any) {
    console.log('dsd')
    return { isSuccess: false, data: await getJsonData() }
  }
})
