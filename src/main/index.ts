import { app } from 'electron'
import { execSync } from 'node:child_process'

import { makeAppWithSingleInstanceLock } from 'lib/electron-app/factories/app/instance'
import { makeAppSetup } from 'lib/electron-app/factories/app/setup'
import { MainWindow } from './windows/main'
import './ipc'

function installGitIfNeeded() {
  try {
    execSync('git --version')
  } catch (_error) {
    console.log('Git not found. Instaling...')
    const platform = process.platform
    let installCommand = ''

    if (platform === 'win32') {
      console.log('Instalando o git no Windows')
      console.log('winget install --id Git.Git -e --source winget')
      installCommand = 'winget install --id Git.Git -e --source winget'
    } else if (platform === 'darwin') {
      console.log('Instalando o git no Mac')
      console.log('brew install git')
      installCommand = 'brew install git'
    } else if (platform === 'linux') {
      console.log('Instalando o git no linux')
      console.log('comando usado: sudo apt-get install git -y')
      installCommand = 'sudo apt-get install git -y'
    }

    if (installCommand) {
      try {
        execSync(installCommand)
        console.log('Git installed successfully.')
      } catch (installError) {
        console.error(`Failed to install Git: ${installError}`)
      }
    } else {
      console.error('Unsupported operating system for Git installation.')
    }
  }
}

makeAppWithSingleInstanceLock(async () => {
  await app.whenReady()
  installGitIfNeeded()
  await makeAppSetup(MainWindow)
})
