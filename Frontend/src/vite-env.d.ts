/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '@siemens/ix/loader' {
  export function applyPolyfills(): Promise<void>;
  export function defineCustomElements(): void;
}
