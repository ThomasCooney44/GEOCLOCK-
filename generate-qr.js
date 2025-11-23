const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Get IP address from command line or use default
const ip = process.argv[2] || '192.168.1.2';
const expoUrl = `exp://${ip}:8081`;

console.log(`Generating QR code for: ${expoUrl}`);

QRCode.toFile(
  path.join(__dirname, 'qrcode.png'),
  expoUrl,
  {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 500,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  },
  function (err) {
    if (err) {
      console.error('Error generating QR code:', err);
      process.exit(1);
    }
    console.log('QR code generated successfully! Saved as qrcode.png');
    console.log(`\nScan this QR code with Expo Go app on your phone.`);
    console.log(`Make sure your phone and laptop are on the same Wi-Fi network.`);
  }
);

