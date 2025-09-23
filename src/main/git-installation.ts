import { exec, execSync } from 'node:child_process'
import { BrowserWindow } from 'electron'
import { IPC } from 'shared/constants'

export async function handleGitInstallation() {
  try {
    const mainWindow = BrowserWindow.getAllWindows()[0]
    execSync('git --version')
    const gitVersion = await exec('git --version')
    gitVersion.stdout?.on('data', data => {

      mainWindow.webContents.send(IPC.GITSTATUS.FETCH, { status: true, data: data.toString() })
      console.log(data)
    })


  } catch (_error) {
    const mainWindow = BrowserWindow.getAllWindows()[0]

    if (!mainWindow) return

    const platform = process.platform
    let installCommand = ''
    let platformName = ''

    if (platform === 'win32') {
      platformName = 'Windows'
      installCommand = 'winget install --id Git.Git -e --source winget'
    } else if (platform === 'darwin') {
      platformName = 'Mac'
      installCommand = 'brew install git'
    } else if (platform === 'linux') {
      platformName = 'Linux'
      installCommand = 'sudo apt-get install git -y'
    }

    if (installCommand) {
      mainWindow.webContents.send(IPC.GITSTATUS.FETCH, {
        status: false, data: `Git is not installed. Starting installation for ${platformName}...`
      })
      try {
        const child = exec(installCommand)

        child.stdout?.on('data', data => {
          mainWindow.webContents.send(IPC.GITSTATUS.FETCH, { status: false, data: data.toString() })
        })

        child.stderr?.on('data', data => {
          mainWindow.webContents.send(IPC.GITSTATUS.FETCH, { status: false, data: data.toString() })
        })

        child.on('close', code => {
          if (code === 0) {
            mainWindow.webContents.send(IPC.GITSTATUS.FETCH, { status: false, data: 'Git installed successfully.' })
            setTimeout(() => mainWindow.webContents.send(IPC.GITSTATUS.FETCH, { status: true, data: "Done" }), 3000) // Close window after 3s
          } else {
            mainWindow.webContents.send(IPC.GITSTATUS.FETCH, `Installation failed with code: ${code}`)
          }
        })

        child.on('error', error => {
          if (error) {
            mainWindow.webContents.send(IPC.GITSTATUS.FETCH, { status: false, data: `Failed to install Git: Por favor instale o Git manualmente. \n https://git-scm.com/downloads` })
          }
        })
      } catch (installError) {
        mainWindow.webContents.send(IPC.GITSTATUS.FETCH, { status: false, data: `Failed to install Git: Por favor instale o Git manualmente. \n https://git-scm.com/downloads` })
      }
    } else {
      mainWindow.webContents.send(IPC.GITSTATUS.FETCH, { status: false, data: `Failed to install Git: Por favor instale o Git manualmente. \n https://git-scm.com/downloads` })
    }
  }
}
