---
sidebar_position: 1
---

# A.P.O.L.L.O Discord Bot

A modular, horizontally-scalable Discord bot built with discord.js featuring a plugin system, work-queue architecture for multi-instance deployment, and integrated subsystems.

## Key Features

- **Plugin Architecture**: Modular plugin system with inter-plugin communication
- **Multi-Instance Scaling**: Gateway + worker split with BullMQ work queues
- **Nova Subsystem**: Daily Na'vi word posting from Reykunyu API
- **Welcome System**: Automatic greeting for new members
- **Utility Commands**: 20+ commands for server management
- **Moderation Suite**: Kick, ban, mute, warn, purge with logging
- **Ticket System**: User-facing support tickets
- **Auto-Moderation**: Spam detection, raid protection, word filtering
- **Remote Plugin Management**: Install/enable/disable plugins at runtime
- **Multi-Database**: SQLite for development, PostgreSQL for production
- **Docker Support**: Multi-stage builds and Docker Compose

## Prerequisites

- Node.js 26 or higher
- pnpm 11 (install via `npm install -g corepack && corepack enable`)
- Docker and Docker Compose (optional, recommended for deployment)
- A Discord bot token and client ID

## Quick Start with Docker Compose (Recommended)

### 1. Clone the repository

```bash
git clone https://github.com/The-A-P-O-L-L-O-Organization/Apollo-Discord-Bot.git
cd Apollo-Discord-Bot
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

### 3. Edit the `.env` file

Add your Discord bot credentials:

```
DISCORD_TOKEN=your-discord-bot-token-here
CLIENT_ID=your-bot-client-id
OWNER_IDS=your-discord-user-id
```

### 4. Start the bot

```bash
docker compose up -d
```

### 5. View logs

```bash
docker compose logs -f
```

## Manual Installation

If you prefer to run without Docker:

### 1. Clone and install dependencies

```bash
git clone https://github.com/The-A-P-O-L-L-O-Organization/Apollo-Discord-Bot.git
cd Apollo-Discord-Bot
pnpm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
# Edit .env with DISCORD_TOKEN, CLIENT_ID, OWNER_IDS
```

### 3. Deploy slash commands

```bash
node deploy-commands.js
```

### 4. Start the bot

```bash
pnpm start
```

## Multi-Instance Deployment

For horizontal scaling with PostgreSQL and Redis:

```bash
docker compose --profile multi up -d
```

This starts PostgreSQL, Redis, gateway (1 replica), and worker instances.

Set environment variables:
```
DB_TYPE=postgres
DATABASE_URL=postgresql://user:password@host:5432/apollo
QUEUE_ENABLED=true
REDIS_HOST=redis
```

## Basic Configuration

### Essential Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DISCORD_TOKEN` | Yes | — | Discord bot token |
| `CLIENT_ID` | Yes | — | Discord application/client ID |
| `OWNER_IDS` | Yes | — | Comma-separated Discord user IDs for admin access |
| `DB_TYPE` | No | `sqlite` | Database type (`sqlite` or `postgres`) |
| `DATABASE_URL` | No | — | PostgreSQL connection string |
| `QUEUE_ENABLED` | No | `false` | Enable BullMQ work queue |
| `REDIS_HOST` | No | `localhost` | Redis host |

## Verify Setup

After starting the bot:

1. Check the bot is online in your Discord server
2. Run `/ping` — should respond with latency
3. Run `/help` — should show available commands
4. Check logs with `docker compose logs -f` (Docker) or console output (manual)

## Next Steps

- **User Guide**: Learn about commands and features
- **Developer Guide**: Set up development environment and extend functionality
- **Command Reference**: Complete command documentation

## Support

For issues and feature requests, visit:
- [GitHub Repository](https://github.com/The-A-P-O-L-L-O-Organization/Apollo-Discord-Bot)
- [Installation Guide](https://github.com/The-A-P-O-L-L-O-Organization/Apollo-Discord-Bot/blob/main/INSTALLATION.md)
- [Contributing](https://github.com/The-A-P-O-L-L-O-Organization/Apollo-Discord-Bot/blob/main/CONTRIBUTING.md)
