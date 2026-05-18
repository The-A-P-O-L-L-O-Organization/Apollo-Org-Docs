---
sidebar_position: 1
---

# Getting Started

Your guide to setting up and understanding Nikolai-Bot

Nikolai-Bot is a comprehensive Discord bot for managing Nation Roleplay (NRP) games. It provides game masters and players with tools to create nations, manage economies, build military forces, engage in diplomacy, and conduct advanced nation-building gameplay on Discord.

## What is Nikolai-Bot

Nikolai-Bot transforms your Discord server into a fully-featured Nation Roleplay management platform. Whether you're running a small roleplay with friends or orchestrating a complex geopolitical simulation, Nikolai-Bot handles the complexity of nation management—from economic calculations to military combat to diplomatic relations.

The bot is designed around a turn-based system where game masters process turns every 12 hours (configurable), advancing the game world and triggering automatic events. Players manage their nations through Discord slash commands, with full permission controls ensuring Game Masters maintain game balance and integrity.

Unlike traditional roleplay servers that rely on manual tracking, Nikolai-Bot maintains comprehensive audit logs of every action, transaction, and event. This creates a verifiable, transparent game world where players can trust the integrity of the system and GMs can investigate any issues.

## Key Features

### Core Systems

- **Nation Management** - Create nations with detailed statistics, populations, capitals, and governance structures
- **Economy Systems** - Multiple currencies, GDP tracking, budgets, loans, transactions, and financial reporting
- **Military Forces** - Army, Airforce, and Navy units with production queues, deployment, and combat simulation
- **Diplomacy** - Wars, treaties, alliances, and diplomatic relations between nations
- **Research & Technology** - Technology trees, research progress tracking, and advancement mechanics
- **National Spirits** - Traits and ideologies with mechanical bonuses and penalties
- **Random Events** - Configurable events that trigger each turn to create dynamic gameplay
- **Turn Processing** - Automatic turn advancement every 12 hours with event execution and economic calculations

### Social & Roleplay

- **Press Releases** - Publish official nation announcements to other players
- **Reputation System** - Track nation reputation across multiple metrics
- **Crisis Events** - Special events that test nations during difficult moments

### Advanced Gameplay

- **Infrastructure** - Build and upgrade national infrastructure for economic benefits
- **Wonders & Projects** - Construct mega-projects that provide lasting bonuses
- **Fog of War** - Limited visibility to other nations' true military and economic strength

### Economy Expansion

- **Trade Routes** - Establish bilateral trade for regular resource exchange
- **Sanctions** - Impose trade restrictions and economic penalties
- **Black Market** - Underground trade channels for sensitive transactions
- **Currency Exchange** - Convert between national currencies at market rates
- **Economic Crises** - Handle recessions, inflation, and other macro events

### Diplomacy & Politics

- **Espionage** - Conduct intelligence operations against rival nations
- **Alliances** - Form multi-nation blocs for coordinated action
- **World Council** - Democratic body for passing universal laws
- **Government Types** - Different governmental structures with unique mechanics
- **Coups** - Internal political instability and leadership changes

### Military Expansion

- **Battle Simulator** - Realistic combat calculations for wars
- **Military Doctrines** - Different strategies that modify combat effectiveness
- **Occupations** - Control and administer conquered territories
- **Arms Treaties** - Limit military spending and weapons development
- **Mercenaries** - Hire foreign military units for additional firepower

### Quality of Life

- **Turn Reminders** - Alerts for upcoming turn processing
- **Nation Profiles** - View complete statistics and history of any nation
- **Bulk Operations** - Execute multiple commands at once for efficiency

## Requirements

Before getting started with Nikolai-Bot, ensure you have the following:

| Requirement | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | Runtime environment |
| MongoDB | 6+ | Data persistence |
| Discord Bot Token | Any | Bot authentication |
| Docker | Latest | Container deployment (optional but recommended) |
| Docker Compose | Latest | Multi-container orchestration (optional but recommended) |

**Recommended:** Using Docker and Docker Compose significantly simplifies setup and ensures consistency across deployments.

## Quick Start

### Using Docker (Recommended)

Docker ensures all dependencies are properly configured and avoids system-specific issues.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/nikolai-bot.git
   cd nikolai-bot
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your Discord token and MongoDB connection string
   nano .env
   ```

3. **Start the bot:**
   ```bash
   docker-compose up -d
   ```

4. **Verify it's running:**
   ```bash
   docker-compose logs -f nikolai-bot
   ```

### Manual Setup

If you prefer to run locally without Docker:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   nano .env
   ```

3. **Ensure MongoDB is running:**
   ```bash
   # Start MongoDB locally or connect to a remote instance
   mongod
   ```

4. **Start the bot:**
   ```bash
   npm start
   ```

## Configuration

Essential environment variables for Nikolai-Bot:

| Variable | Required | Description |
|----------|----------|-------------|
| `DISCORD_TOKEN` | Yes | Your Discord bot token from Developer Portal |
| `MONGODB_URI` | Yes | Connection string to MongoDB database |
| `GUILD_ID` | Yes | Discord server ID where bot operates |
| `TURN_INTERVAL` | No | Turn processing interval in hours (default: 12) |
| `MONGODB_DB_NAME` | No | Database name (default: nikolai_bot) |
| `LOG_LEVEL` | No | Logging verbosity (default: info) |
| `ENABLE_DEV_COMMANDS` | No | Enable development commands (default: false) |

**Getting your Discord Token:**
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the "Bot" section and create a bot
4. Copy the token and paste it in your `.env` file

**MongoDB Connection:**
- Local: `mongodb://localhost:27017`
- MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true`

## Next Steps

Now that you have Nikolai-Bot running, explore the following resources:

- **[User Guide](./user-guide.md)** - Learn how to play and manage your nation
- **[Command Reference](./command-reference.md)** - See all available commands and options
- **[Developer Guide](./developer-guide.md)** - Extend and customize the bot
- **[Troubleshooting](./troubleshooting.md)** - Solutions to common problems

Welcome to Nation Roleplay with Nikolai-Bot!
