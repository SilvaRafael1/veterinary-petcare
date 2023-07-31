export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: SECRET;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
