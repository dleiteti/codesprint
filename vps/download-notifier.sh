#!/bin/bash
# Download Notifier - Monitors Nginx access log and sends Telegram alerts
# Deployed as systemd service: download-notifier.service

BOT_TOKEN="8574801333:AAHfS1MV0cBrXhs9N_SDhzUG_1ZvN0L7ZPI"
CHAT_ID="8453400539"
LOG_FILE="/var/log/nginx/access.log"
TRACK_PATTERN="7-codigos-proibidos.pdf"

send_telegram() {
    local message="<b>[Code Sprint]</b> $1"
    curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
        -d "chat_id=${CHAT_ID}" \
        -d "text=${message}" \
        -d "parse_mode=HTML" > /dev/null 2>&1
}

send_telegram "🟢 <b>Download Notifier ativo</b>
Monitorando: ${TRACK_PATTERN}"

tail -F "$LOG_FILE" 2>/dev/null | grep --line-buffered "$TRACK_PATTERN" | while read -r line; do
    # Skip bots and non-200 responses
    if echo "$line" | grep -qiE "(bot|crawler|spider|curl/|wget)"; then
        continue
    fi

    STATUS=$(echo "$line" | awk '{print $9}')
    if [ "$STATUS" != "200" ]; then
        continue
    fi

    IP=$(echo "$line" | awk '{print $1}')
    TIMESTAMP=$(echo "$line" | awk -F'[][]' '{print $2}')
    USER_AGENT=$(echo "$line" | awk -F'"' '{print $6}' | cut -c1-80)
    REFERER=$(echo "$line" | awk -F'"' '{print $4}')

    MESSAGE="📥 <b>Novo download do PDF!</b>

🕐 <b>Hora:</b> ${TIMESTAMP}
🌐 <b>IP:</b> ${IP}
🔗 <b>Referer:</b> ${REFERER:-Direto}
📱 <b>Device:</b> ${USER_AGENT}"

    send_telegram "$MESSAGE"
done
