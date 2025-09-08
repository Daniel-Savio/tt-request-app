import type { BrowserWindow, IpcMainInvokeEvent } from 'electron'
import type { registerRoute } from 'lib/electron-router-dom'
export type BrowserWindowOrNull = Electron.BrowserWindow | null
import * as z from 'zod'
type Route = Parameters<typeof registerRoute>[0]

export interface WindowProps extends Electron.BrowserWindowConstructorOptions {
  id: Route['id']
  query?: Route['query']
}

export interface WindowCreationByIPC {
  channel: string
  window(): BrowserWindowOrNull
  callback(window: BrowserWindow, event: IpcMainInvokeEvent): void
}

export interface StatusResponse {
  isSuccess: boolean
  message: string
}

export interface AppData {
  isSuccess: boolean
  data: DataInfo
}

export interface DataInfo {
  comercial: string[]
  processamento: string[]
  sd: string[]
  entradas: string[]
  protocolos_entrada: string[]
  protocolos_saida: string[]
  ied: string[]
  ied_terceiros: IedTerceiros[]
}

export interface IedTerceiros {
  nome: string
  fabricante: string
}

export const requestFormSchema = z.object({
  salesName: z
    .string('Insira um nome válido e envie novamente')
    .min(3, 'Insira um nome válido')
    .nonempty('Campo obrigatório'),
  processName: z
    .string('Insira um nome válido e envie novamente')
    .min(3, 'Insira um nome válido')
    .nonempty('Campo obrigatório'),
  email: z.email(),
  client: z.string().min(3, 'Insira um nome válido'),
  project: z.string().min(3, 'Insira um nome válido'),
  invoiceNumber: z.string().regex(/^\d+$/, 'Insira um número de pedido válido'),
  clientNumber: z.string().regex(/^\d+$/, 'Insira um número de cliente válido'),
  processingDate: z.date('Selecione uma data válida'),
    entradas: z
    .array(
      z.object({
        type: z.string(),
        value: z.string(),
        ip: z.string().optional(),
        port: z.string().optional(),
        config: z.string().optional(),
        baudRate: z.string().optional(),
        dataBits: z.string().optional(),
        parity: z.string().optional(),
        stopBits: z.string().optional(),
        ieds: z.array(z.object({
          name: z.string(),
          address: z.string(),
        })).optional(),
      })
    )
    .optional(),
})

export type RequestForm = z.infer<typeof requestFormSchema>
