/// <reference types="vite/client" />

declare global {
  type API = string;
  interface Window {
    API: string;
    EAP: string;
  }
}

export {};
