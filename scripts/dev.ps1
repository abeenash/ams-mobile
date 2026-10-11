$ip = (Get-NetIPConfiguration | Where-Object { $_.IPv4DefaultGateway } | Select-Object -First 1).IPv4Address.IPv4Address
$envFile = Join-Path $PSScriptRoot "..\.env.local"
"EXPO_PUBLIC_API_URL=http://${ip}:8080" | Set-Content -Path $envFile -Encoding ascii
Write-Host "API URL set to http://${ip}:8080"
npx expo start