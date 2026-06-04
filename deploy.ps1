$ErrorActionPreference = "Stop"
$VpsUser = "root"
$VpsHost = "72.60.146.84"
$VpsPort = "65002"
$DestDir = "/var/www/codesprint"
$KeyPath = ".\vps_key"
$BuildDir = ".\landing\out"
$NginxConf = ".\nginx_codesprint.conf"
$NginxDest = "/etc/nginx/sites-available/codesprint.com.br"

Write-Host "[DEPLOY] CodeSprint Landing Page" -ForegroundColor Cyan

if (-not (Test-Path $KeyPath)) {
    Write-Host "Erro: chave SSH nao encontrada." -ForegroundColor Red
    exit 1
}

Write-Host "[1/6] Build Next.js..." -ForegroundColor Yellow
Push-Location landing
if (Test-Path "out") { Remove-Item -Recurse -Force "out" }
npm run build
Pop-Location

if (-not (Test-Path $BuildDir)) {
    Write-Host "Build falhou." -ForegroundColor Red
    exit 1
}
Write-Host "[1/6] Build OK" -ForegroundColor Green

Write-Host "[2/6] Limpando diretorio remoto..." -ForegroundColor Yellow
ssh -i $KeyPath -p $VpsPort "${VpsUser}@${VpsHost}" "mkdir -p $DestDir"
ssh -i $KeyPath -p $VpsPort "${VpsUser}@${VpsHost}" "rm -rf ${DestDir}/*"

Write-Host "[3/6] Enviando arquivos via SCP..." -ForegroundColor Yellow
scp -r -i $KeyPath -P $VpsPort "${BuildDir}\*" "${VpsUser}@${VpsHost}:${DestDir}/"

Write-Host "[4/6] Atualizando Nginx config..." -ForegroundColor Yellow
scp -i $KeyPath -P $VpsPort "$NginxConf" "${VpsUser}@${VpsHost}:${NginxDest}"

Write-Host "[5/6] Ajustando permissoes..." -ForegroundColor Yellow
ssh -i $KeyPath -p $VpsPort "${VpsUser}@${VpsHost}" "chmod -R 755 $DestDir"

Write-Host "[6/6] Validando e recarregando Nginx..." -ForegroundColor Yellow
ssh -i $KeyPath -p $VpsPort "${VpsUser}@${VpsHost}" "nginx -t && nginx -s reload"

Write-Host "Deploy concluido! Site online." -ForegroundColor Green
