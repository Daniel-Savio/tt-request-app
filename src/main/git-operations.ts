import simpleGit, { type SimpleGit } from 'simple-git'
import os from 'node:os'
import path from 'node:path'
import dns from 'node:dns'
import fs from 'node:fs/promises'

const localPath = path.join(__dirname, 'request-info')
const repoUrl = 'https://github.com/Daniel-Savio/request-info'

async function checkInternetConnection(): Promise<void> {
  try {
    dns.lookup('github.com', err => {
      if (err) {
        throw new Error('No Internet Connection')
      }
    })
  } catch (error) {
    console.error('No internet connection.', error)
    throw new Error('No Internet Connection')
  }
}

async function pathExists(p: string): Promise<boolean> {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

export async function cloneRepository(): Promise<void> {
  await checkInternetConnection()

  if (!(await pathExists(localPath))) {
    try {
      // Initialize git in the base directory for the clone command
      const git = simpleGit()
      await git.clone(repoUrl, localPath, ['--depth', '1'])
      console.log('Repository cloned successfully.')
    } catch (error) {
      console.error('Failed to clone repository:', error)
      throw new Error('Failed to clone repository')
    }
  } else {
    await pullChanges()
  }
}

export async function addCommitAndPush(commitMessage: string): Promise<void> {
  await checkInternetConnection()
  const git: SimpleGit = simpleGit(localPath)

  try {
    const hostname = os.hostname().replace(/[^a-zA-Z0-9-]/g, '-')
    const branchName = `feature/desktop-${hostname}`

    await git.checkout(['-B', branchName])
    await git.add('.')
    await git.commit(commitMessage)
    await git.push('origin', branchName, { '--set-upstream': null })
    console.log(`Successfully pushed changes to branch ${branchName}`)
  } catch (error) {
    console.error('Failed to add, commit, and push changes:', error)
    // Re-throwing the original error preserves the stack trace
    throw error
  }
}

export async function pullChanges(): Promise<void> {
  await checkInternetConnection()
  const git: SimpleGit = simpleGit(localPath)

  try {
    await git.pull()
    console.log('Repository updated successfully.')
  } catch (error) {
    console.error('Failed to update the repository:', error)
    throw new Error('Failed to update the repository')
  }
}
