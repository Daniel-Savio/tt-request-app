/// <reference types="vite/client" />

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        send(channel: string, data?: any): void;
        on(channel: string, listener: (...args: any[]) => void): () => void;
        removeAllListeners(channel: string): void;
      };
    };
  }
}
