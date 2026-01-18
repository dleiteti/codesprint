---
description: Guia definitivo para conectar e executar comandos na VPS CodeSprint usando a chave SSH do projeto.
---

# Procedimento de Conexão à VPS CodeSprint

Este documento instrui qualquer agente ou desenvolvedor sobre como acessar a infraestrutura de produção (VPS) para realizar manutenções, deploys manuais ou verificações.

## 1. Credenciais

- **Chave Privada SSH**: Localizada em `~/.ssh/id_rsa` (chave padrão do sistema)
- **Usuário**: `root`
- **Host**: `191.252.205.87`
- **Senha**: `federal` (caso a chave SSH não funcione)

## 2. Como Conectar Manualmente

Para abrir um terminal interativo:

```bash
ssh root@191.252.205.87
```

Se precisar especificar a chave explicitamente:

```bash
ssh -i ~/.ssh/id_rsa root@191.252.205.87
```

## 3. Deploy Completo (rsync + build + restart)

### Passo 1: Sincronizar arquivos via rsync

```bash
cd /home/danilo/.gemini/antigravity/scratch/codesprint
rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' . root@191.252.205.87:/root/codesprint/
```

### Passo 2: Build na VPS

```bash
ssh root@191.252.205.87 'cd /root/codesprint && npm run build'
```

### Passo 3: Restart PM2

```bash
ssh root@191.252.205.87 'pm2 restart codesprint'
```

### Script Completo (uma linha):

```bash
cd /home/danilo/.gemini/antigravity/scratch/codesprint && \
rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' . root@191.252.205.87:/root/codesprint/ && \
ssh root@191.252.205.87 'cd /root/codesprint && npm run build && pm2 restart codesprint'
```

## 4. Verificações Úteis

### Status do PM2

```bash
ssh root@191.252.205.87 'pm2 status'
```

### Logs da aplicação

```bash
ssh root@191.252.205.87 'pm2 logs codesprint --lines 50'
```

### Verificar saúde do servidor

```bash
ssh root@191.252.205.87 'df -h && free -h'
```

## 5. Troubleshooting

- **Permission Denied (publickey)**: Use a senha `federal` quando solicitado
- **Connection Refused**: Verificar se o servidor está online
- **Build falha**: Verificar se há espaço em disco (`df -h`)
- **PM2 não reinicia**: Verificar logs com `pm2 logs codesprint`

## 6. Estrutura de Diretórios na VPS

```
/root/codesprint/          # Código da aplicação
/root/codesprint/.next/    # Build de produção Next.js
```
