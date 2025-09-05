export const ENVIRONMENT = {
  IS_DEV: process.env.NODE_ENV === 'development',
}

export const PLATFORM = {
  IS_MAC: process.platform === 'darwin',
  IS_WINDOWS: process.platform === 'win32',
  IS_LINUX: process.platform === 'linux',
}

export const IPC = {
  GITSTATUS: {
    PULL: 'git-status: pull',
    CLONE: 'git-status: clone',
  },
  JSON: {
    FETCH: 'app-data: fetch',
  },
}
