# Start Expo with tunnel mode and show QR code
set-location $PSScriptRoot
Write-Host "Starting Expo development server with tunnel mode..."
Write-Host "This will show a QR code in the terminal that you can scan."
Write-Host "Press Ctrl+C to stop the server."
Write-Host ""
npx expo start --tunnel

