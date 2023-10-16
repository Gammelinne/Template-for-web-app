/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_APP_ENV: string
  // Ajoutez d'autres variables d'environnement selon vos besoins
}

declare global {
  const importMeta: {
    env: ImportMetaEnv
  }
}

// Export pour TypeScript
export {}
