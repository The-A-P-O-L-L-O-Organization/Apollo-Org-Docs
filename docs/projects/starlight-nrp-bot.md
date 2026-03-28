# Starlight NRP Bot

A Discord bot for the **Starlight** space nation roleplay (NRP) game. Players manage their nations' economies across a persistent, simulated galaxy starting in the year **2300**. Time advances automatically in 25-year ticks, crediting each nation's stockpiles with their monthly production.

## Features

- **Economy System**: Manage 9 resource types across Basic, Advanced, and Research categories
- **Automatic Ticks**: Time advances in 25-year increments with automatic production crediting
- **GM Tools**: Full suite of game master commands for managing the game state
- **Resource Trading**: Player-to-player trade proposals for resource exchanges
- **Diplomatic Relations**: Track and manage diplomatic statuses between nations
- **Market System**: Galactic market for resource exchange
- **Galaxy Map**: Visual representation of the game world
- **Docker Support**: Easy deployment with Docker and Docker Compose

## Commands

### Player Commands

| Command       | Description                                              |
|---------------|----------------------------------------------------------|
| `/resources`  | View your own nation's resource stockpiles (private)     |
| `/nation view` | View any nation's resource sheet                        |
| `/nation list` | List all registered nations                             |
| `/diplomacy` | Manage diplomatic relations with other nations            |
| `/trade`     | Propose and accept resource trades with other players     |
| `/market`     | View galactic market prices and trade resources           |
| `/map`        | View the galaxy map                                      |

### GM Commands

GM access requires the `Administrator` Discord permission or the configured GM role (`Owner/GM` by default).

| Command                        | Description                                              |
|--------------------------------|----------------------------------------------------------|
| `/nation register`             | Register a new nation for a Discord user                 |
| `/resource set`                | Set a nation's stockpile or production for a resource    |
| `/resource set-production-all` | Set all 9 production rates to the same value             |
| `/resource add`                | Add to a nation's stockpile                              |
| `/resource subtract`           | Subtract from a nation's stockpile                       |
| `/gm view-nation`              | View a nation's full resource sheet (private)            |
| `/gm overview`                 | Summary of all nations' production and stockpiles         |
| `/gm delete-nation`            | Permanently delete a nation                              |
| `/gm rename-nation`            | Rename a nation                                          |
| `/gm reset-stockpiles`         | Zero out all stockpiles for a nation                     |
| `/gm set-year`                 | Override the current in-game year                        |
| `/gm force-tick`               | Trigger a production tick immediately                    |
| `/gm transfer`                 | Transfer resources from one nation to another            |
| `/gm backfill-defaults`        | Patch nations with zero production to default values     |

### Context Menu

Right-click any user → **Apps** → **View Nation Resources** to see that user's resource sheet.

## Resource Types

| Category | Resource         |
|----------|-----------------|
| Basic    | Energy Credits, Minerals, Food, Trade |
| Advanced | Alloys, Consumer Goods |
| Research | Physics, Society, Engineering |

Research resources represent an ongoing rate — their stockpile is always zero and does not accumulate during ticks.

## Game Mechanics

- **Tick**: Each tick represents 25 years. All non-research stockpiles are credited with `production_rate × 300` (25 years × 12 months).
- **Schedule**: Ticks run automatically on the configured cron schedule (default: midnight UTC daily).
- **Tick Locking**: If a manual `/gm force-tick` is triggered while an automatic tick is already running, the second tick is skipped to prevent double-crediting.

## Installation

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker and Docker Compose (optional)
- A Discord bot application with a bot token

### Quick Start with Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd starlight-nrp-bot
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

3. **Edit the `.env` file with your settings**
   ```
   DISCORD_TOKEN=your-discord-bot-token
   GUILD_ID=your-guild-id
   TIMELINE_CHANNEL_ID=your-channel-id
   DB_PATH=./data/starlight.db
   ```

4. **Start the bot with Docker Compose**
   ```bash
   docker compose up -d
   ```

5. **Register slash commands**
   ```bash
   docker compose run --rm bot pnpm deploy
   ```

### Manual Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd starlight-nrp-bot
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your settings.

4. **Register slash commands**
   ```bash
   pnpm deploy
   ```

5. **Start the bot**
   ```bash
   # Development
   pnpm dev
   
   # Production
   pnpm build
   pnpm start
   ```

## Configuration

| Variable            | Required | Description                                                         |
|---------------------|----------|---------------------------------------------------------------------|
| `DISCORD_TOKEN`     | Yes      | Bot token from the Discord Developer Portal                         |
| `GUILD_ID`          | Yes      | Discord server (guild) ID                                           |
| `TIMELINE_CHANNEL_ID` | Yes    | Channel ID where tick announcements are posted                      |
| `DB_PATH`           | Yes      | Path to the SQLite database file (e.g. `./data/starlight.db`)       |
| `GM_ROLE_NAME`      | No       | Discord role name that grants GM permissions (default: `Owner/GM`)  |
| `TICK_CRON`         | No       | Cron expression for the automatic tick schedule in UTC (default: `0 0 * * *`) |

## Project Structure

```
starlight-nrp-bot/
├── src/
│   ├── commands/         # Slash command handlers (nation, resource, resources, gm)
│   ├── context-menus/    # User context menu handlers
│   ├── db/schema.ts      # SQLite schema, init, and all query functions
│   ├── utils/
│   │   ├── embeds.ts     # Discord embed builder for resource sheets
│   │   ├── permissions.ts # GM permission check
│   │   └── scheduler.ts  # Cron-based tick scheduler with tick locking
│   ├── types.ts          # Resource types and game constants
│   ├── index.ts          # Bot entrypoint
│   └── deploy-commands.ts # One-shot command registration script
├── tests/
│   ├── schema.test.ts    # DB layer unit tests
│   ├── scheduler.test.ts # Scheduler / tick logic unit tests
│   └── features.test.ts  # Feature tests
├── Dockerfile
├── docker-compose.yml
├── package.json
└── pnpm-lock.yaml
```

## Development

### Running Tests

```bash
pnpm test          # run once
pnpm test:watch    # watch mode
pnpm test:coverage # with coverage report
```

Tests use [Vitest](https://vitest.dev) and run against an in-memory SQLite database — no `.env` file is needed.

## Technologies Used

- **discord.js** - Discord API wrapper for Node.js
- **Node.js** - JavaScript runtime
- **pnpm** - Package manager
- **SQLite** - Database (via better-sqlite3)
- **node-cron** - Task scheduling for automatic ticks
- **Vitest** - Testing framework
- **Docker** - Containerization platform

## Links

- [GitHub Repository](https://github.com/The-A-P-O-L-L-O-Organization/starlight-nrp-bot)

> Starlight NRP Bot is maintained by [The-A-P-O-L-L-O-Organization](https://github.com/The-A-P-O-L-L-O-Organization).


