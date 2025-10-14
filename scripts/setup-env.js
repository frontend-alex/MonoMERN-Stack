#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const serverExamplePath = path.join('app', 'server', '.env.example');
const clientExamplePath = path.join('app', 'client', '.env.example');

const serverEnvPath = path.join('app', 'server', '.env');
const clientEnvPath = path.join('app', 'client', '.env');

if (!fs.existsSync(serverExamplePath)) {
  console.error('Server .env.example file not found at:', serverExamplePath);
  process.exit(1);
}

if (!fs.existsSync(clientExamplePath)) {
  console.error('Client .env.example file not found at:', clientExamplePath);
  process.exit(1);
}

const serverDir = path.dirname(serverEnvPath);
const clientDir = path.dirname(clientEnvPath);

if (!fs.existsSync(serverDir)) {
  fs.mkdirSync(serverDir, { recursive: true });
}

if (!fs.existsSync(clientDir)) {
  fs.mkdirSync(clientDir, { recursive: true });
}

fs.copyFileSync(serverExamplePath, serverEnvPath);
fs.copyFileSync(clientExamplePath, clientEnvPath);

console.log('Environment files created successfully!');
console.log('Server .env:', serverEnvPath);
console.log('Client .env:', clientEnvPath);
console.log('');
console.log('Remember to update the values in your .env files as needed!');
