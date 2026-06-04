$ErrorActionPreference = "Stop"
$VpsUser = "root"
$VpsHost = "72.60.146.84"
$VpsPort = "65002"
$KeyPath = ".\vps_key"
$ScriptDir = ".\vps"

Write-Host "[SETUP] Download Notifier - Telegram" -ForegroundColor Cyan

if (-not (Test-Path $KeyPath)) {
    Write-Host "Erro: chave SSH nao encontrada." -ForegroundColor Red
    exit 1
}

Write-Host "[1/4] Criando diretorio no servidor..." -ForegroundColor Yellow
ssh -i $KeyPath -p $VpsPort "${VpsUser}@${VpsHost}" "mkdir -p /opt/codesprint"

Write-Host "[2/4] Enviando arquivos..." -ForegroundColor Yellow
scp -i $KeyPath -P $VpsPort "${ScriptDir}\download-notifier.sh" "${VpsUser}@${VpsHost}:/opt/codesprint/download-notifier.sh"
scp -i $KeyPath -P $VpsPort "${ScriptDir}\download-notifier.service" "${VpsUser}@${VpsHost}:/etc/systemd/system/download-notifier.service"

Write-Host "[3/4] Configurando permissoes e servico..." -ForegroundColor Yellow
ssh -i $KeyPath -p $VpsPort "${VpsUser}@${VpsHost}" @"
chmod +x /opt/codesprint/download-notifier.sh
systemctl daemon-reload
systemctl enable download-notifier
systemctl restart download-notifier
"@

Write-Host "[4/4] Verificando status..." -ForegroundColor Yellow
ssh -i $KeyPath -p $VpsPort "${VpsUser}@${VpsHost}" "systemctl status download-notifier --no-pager -l"

Write-Host "`nSetup concluido! Voce recebera uma mensagem de confirmacao no Telegram." -ForegroundColor Green
