const { spawn } = require('child_process');
const fs = require('fs');

console.log('Starting Expo server...');
console.log('This will display the QR code and connection URL in the terminal.');
console.log('Please look at the terminal output for the QR code and connection details.\n');

const expo = spawn('npx', ['expo', 'start'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

expo.on('error', (err) => {
  console.error('Error starting Expo:', err);
});

expo.on('close', (code) => {
  console.log(`Expo process exited with code ${code}`);
});

