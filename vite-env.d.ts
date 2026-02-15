/// <reference types="vite/client" />

// custom environment variable typings
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // add other variables if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
