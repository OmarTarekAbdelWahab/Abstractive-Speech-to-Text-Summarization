/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_BACK_END_API_URL: string;
  readonly VITE_FAST_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}