---
sidebar_position: 1
---

# Getting Started

Your guide to setting up and understanding Starlight NRP Bot

Starlight NRP Bot is a Discord bot for the **Starlight** space nation roleplay (NRP) game. Players manage their nations' economies, sovereign statuses, diplomatic relations, and trade across a persistent, simulated galaxy starting in the year **2200**. Time advances automatically in 25-year ticks, crediting each nation's stockpiles with their monthly production.

## What is Starlight NRP Bot

Starlight NRP Bot transforms your Discord server into a fully-featured space nation roleplay management platform. The bot handles the complexity of galactic economics — from production calculations and resource trading to diplomatic treaties and game master oversight.

The game revolves around **automatic ticks** (default: once daily at midnight UTC) that advance the in-game calendar by 25 years. During each tick, every nation's resource stockpiles are credited with 300 months' worth of production, modified by status effects, production modifiers, and tribute agreements.

The bot is designed with a **Game Master (GM)** model. GMs have administrative control over the game world: they register nations, manage resources, set statuses, impose sanctions, and maintain game balance. Players interact through slash commands to view resources, propose trades, form alliances, and participate in the galactic market.

## Key Features

### Core Systems

- **Economy System** — 9 resource types across Basic, Advanced, and Research categories with per-nation stockpile and production tracking
- **Automatic Ticks** — Time advances in 25-year increments on a configurable cron schedule with automatic production crediting
- **Stockpile Caps** — Per-nation, per-resource maximum limits prevent infinite accumulation
- **Production Modifiers** — Temporary tick-expiring multipliers applied to production rates, stackable and clampable
- **Status Flags** — Nation conditions (At War, Golden Age, Blockaded, etc.) that apply production bonuses or penalties

### Player Systems

- **Resource Trading** — Player-to-player trade proposals with offer/request flow, expiration, and status tracking
- **Galactic Market** — Open buy/sell offers priced in any resource, fillable by any player
- **Diplomatic Relations** — Formal bilateral alliances between nations with proposal and dissolution flows
- **Nation Profiles** — View any nation's resource sheet and list all registered nations

### GM Tools

- **Resource Management** — Set, add, subtract, and transfer resources between nations
- **Game State Control** — Force ticks, freeze/unfreeze automatic progression, set the in-game year
- **Status & Modifier Management** — Apply and remove nation status effects and production modifiers
- **Sanctions & Tributes** — Block trade to sanctioned nations, set up recurring inter-nation tribute payments
- **Bulk Operations** — Apply resource changes across all nations at once for galaxy-wide events
- **Audit Log** — Every action is logged with timestamps for full transparency
- **State Export** — Export the complete game state as JSON for backup or analysis
- **Season Reset** — Archive and wipe all data to start a new game season

### Additional Features

- **Galaxy Map** — Upload and view visual maps of the game world, with public and GM-only variants
- **Interactive Error Handling** — Graceful handling of Discord API errors, network timeouts, and unknown interactions
- **Context Menu Integration** — Right-click any user to view their nation's resource sheet
- **Docker Support** — Easy deployment with Docker and Docker Compose

## Requirements

Before getting started with Starlight NRP Bot, ensure you have the following:

| Requirement | Version | Purpose |
|-------------|---------|---------|
| Node.js | 20+ | Runtime environment |
| pnpm | 9+ | Package manager |
| Discord Bot Token | Any | Bot authentication |
| Docker | Latest | Container deployment (optional but recommended) |
| Docker Compose | Latest | Container orchestration (optional but recommended) |

**Recommended:** Using Docker and Docker Compose significantly simplifies setup and ensures consistency across deployments.

## Quick Start

### Using Docker (Recommended)

Docker ensures all dependencies are properly configured and avoids system-specific issues.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/The-A-P-O-L-L-O-Organization/starlight-nrp-bot.git
   cd starlight-nrp-bot
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Edit the `.env` file** with your Discord bot token and server IDs:
   ```bash
   nano .env
   ```

4. **Start the bot:**
   ```bash
   docker compose up -d
   ```

5. **Register slash commands:**
   ```bash
   docker compose run --rm bot pnpm deploy
   ```

6. **Verify it's running:**
   ```bash
   docker compose logs -f bot
   ```

### Manual Setup

If you prefer to run locally without Docker:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/The-A-P-O-L-L-O-Organization/starlight-nrp-bot.git
   cd starlight-nrp-bot
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   nano .env
   ```

4. **Register slash commands:**
   ```bash
   pnpm deploy
   ```

5. **Start the bot:**
   ```bash
   # Development mode (auto-reloads)
   pnpm dev

   # Production mode
   pnpm build
   pnpm start
   ```

## Configuration

Essential environment variables for Starlight NRP Bot:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DISCORD_TOKEN` | Yes | — | Discord bot token from Developer Portal |
| `GUILD_ID` | Yes | — | Discord server ID where the bot operates |
| `TIMELINE_CHANNEL_ID` | Yes | — | Channel ID for tick announcement embeds |
| `DB_PATH` | Yes | `./data/starlight.db` | Path to the SQLite database file |
| `GM_ROLE_NAME` | No | `Owner/GM` | Discord role name that grants GM permissions |
| `MAP_ROLE_NAME` | No | `Map Guy` | Discord role name that can manage the map |
| `TICK_CRON` | No | `0 0 * * *` | Cron expression for automatic tick schedule (UTC) |

**Getting your Discord Token:**

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the "Bot" section and create a bot
4. Copy the token and paste it in your `.env` file

## Next Steps

Now that you have Starlight NRP Bot running, explore the following resources:

- **[User Guide](./user-guide.md)** — Learn how to play, trade, and manage your nation
- **[Command Reference](./command-reference.md)** — See all available commands and options
- **[Developer Guide](./developer-guide.md)** — Understand the codebase and extend the bot
- **[Troubleshooting](./troubleshooting.md)** — Solutions to common problems
