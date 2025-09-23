import { app } from 'electron'

import { makeAppWithSingleInstanceLock } from 'lib/electron-app/factories/app/instance'
import { makeAppSetup } from 'lib/electron-app/factories/app/setup'
import { MainWindow } from './windows/main'
import './ipc'
import { handleGitInstallation } from './git-installation'

makeAppWithSingleInstanceLock(async () => {
  await app.whenReady()
  await makeAppSetup(MainWindow)
  handleGitInstallation()
})
