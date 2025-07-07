import * as dotenv from 'dotenv';
import { cleanEnv, str, num, bool, url, makeValidator } from 'envalid';

const corsValidator = makeValidator((input: string) => {
  const origins = input.split(',');
  return origins.map(origin => origin.trim());
});

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
  PORT: num({ default: 3000 }),
  HOST: str({ default: '0.0.0.0' }),
  
  // Security
  TRUST_PROXY: num({ default: 0 }),
  RATE_LIMIT_WINDOW_MS: num({ default: 15 * 60 * 1000 }),
  RATE_LIMIT_MAX: num({ default: 100 }),
  CORS_ORIGINS: corsValidator({ default: ['http://localhost:3000'] }),
  CSRF_COOKIE_SECURE: bool({ default: false }),
  
  // HTTPS
  HTTPS_ENABLED: bool({ default: false }),
  SSL_CERT_PATH: str({ default: '' }),
  SSL_KEY_PATH: str({ default: '' }),
  
  // Cluster
  CLUSTER_ENABLED: bool({ default: false }),
  CLUSTER_WORKERS: num({ default: 0 }), 
  
  // Advanced
  REQUEST_BODY_LIMIT: str({ default: '10kb' }),
  TRUSTED_PROXIES: str({ default: '' }),

  //Database
  DB_LOCAL_URI: str({ default: '' }),
});

export type AppEnv = typeof env;