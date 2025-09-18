import { promises as fs } from 'node:fs'
import path from 'node:path'
import { app } from 'electron'

export async function getJsonData() {
  // Constrói o caminho para o arquivo de forma segura
  const filePath = path.join(app.getPath('userData'), 'request-info', 'sd.json')

  // Lê o arquivo de forma assíncrona
  const data = await fs.readFile(filePath, 'utf-8')

  // Converte o conteúdo do arquivo para JSON
  const jsonData = JSON.parse(data.toString())

  console.log('Dados do JSON lidos com sucesso.')

  // Retorna o objeto JSON
  return jsonData
}
