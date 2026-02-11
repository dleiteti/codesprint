#!/bin/bash
# CodeSprint Landing Page Deploy Script

set -e  # Exit on error

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
VPS_HOST="${VPS_HOST:-estoquefacil.net}"
VPS_USER="${VPS_USER:-root}"
VPS_PORT="${VPS_PORT:-65002}"
VPS_PATH="${VPS_PATH:-/var/www/codesprint}"
SSH_KEY="$(dirname "$0")/vps_key"

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🚀 CodeSprint Landing Page Deploy   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Verify SSH key exists
if [ ! -f "${SSH_KEY}" ]; then
    echo -e "${RED}❌ SSH key not found: ${SSH_KEY}${NC}"
    exit 1
fi

# Verify SSH key permissions
if [ "$(stat -c %a ${SSH_KEY})" != "600" ]; then
    echo -e "${YELLOW}⚠️  Fixing SSH key permissions...${NC}"
    chmod 600 "${SSH_KEY}"
fi

# Step 1: Build
echo -e "${BLUE}📦 Building Next.js production bundle...${NC}"
cd landing

# Clean previous build
rm -rf .next out

# Build
npm run build

# Step 2: Determine build directory
if [ -d "out" ]; then
    BUILD_DIR="out"
    echo -e "${GREEN}✅ Static export detected (out/)${NC}"
else
    BUILD_DIR=".next"
    echo -e "${GREEN}✅ Server build detected (.next/)${NC}"
fi

# Step 3: Test SSH connection
echo -e "${BLUE}🔐 Testing SSH connection...${NC}"
if ! ssh -i "${SSH_KEY}" -p "${VPS_PORT}" -o ConnectTimeout=5 "${VPS_USER}@${VPS_HOST}" "echo connected" &>/dev/null; then
    echo -e "${RED}❌ Cannot connect to VPS${NC}"
    exit 1
fi
echo -e "${GREEN}✅ SSH connection successful${NC}"

# Step 4: Create remote directory if not exists
echo -e "${BLUE}📁 Preparing remote directory...${NC}"
ssh -i "${SSH_KEY}" -p "${VPS_PORT}" "${VPS_USER}@${VPS_HOST}" \
    "mkdir -p ${VPS_PATH} && rm -rf ${VPS_PATH}/*"

# Step 5: Deploy via rsync
echo -e "${BLUE}📤 Deploying to ${VPS_HOST}...${NC}"
rsync -avz --delete --progress \
    -e "ssh -i ${SSH_KEY} -p ${VPS_PORT}" \
    ${BUILD_DIR}/ \
    ${VPS_USER}@${VPS_HOST}:${VPS_PATH}/

# Step 6: Fix permissions
echo -e "${BLUE}🔧 Fixing permissions...${NC}"
ssh -i "${SSH_KEY}" -p "${VPS_PORT}" "${VPS_USER}@${VPS_HOST}" \
    "find ${VPS_PATH} -type d -exec chmod 755 {} \; && find ${VPS_PATH} -type f -exec chmod 644 {} \;"

# Step 7: Health check
echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║       ✅ Deploy Complete!             ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "🌐 URL: ${BLUE}https://${VPS_HOST}${NC}"
echo -e "📊 Build: ${BUILD_DIR}"
echo -e "📍 Path: ${VPS_PATH}"
echo ""
