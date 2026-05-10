# A.P.O.L.L.O Discord Bot

A modular, horizontally-scalable Discord bot built with discord.js featuring a plugin system, work-queue architecture for multi-instance deployment, and integrated subsystems.

## Features

- **Plugin Architecture**: Modular plugin system with inter-plugin communication via EventBus (events, API registry, reactive state) and cross-pod Redis pub/sub
- **Multi-Instance Scaling**: Gateway + worker split with BullMQ work queues, PostgreSQL for shared persistence, leader election over Redis
- **Nova Subsystem**: Daily Na'vi word posting from the Reykunyu API at noon ET — features from the legacy Nova bot integrated as a plugin
- **Welcome System**: Automatically greets new members when they join the server
- **Utility Commands**: 20+ commands for server management, polls, reminders, tags, and more
- **Moderation Commands**: Full suite — kick, ban, tempban, mute, warn, purge with logging
- **Ticket System**: User-facing support ticket creation with staff management
- **Auto-Moderation**: Spam detection, raid protection, banned words, caps filtering, invite filtering
- **Remote Plugin Management**: Install, enable, disable, reload, and uninstall plugins at runtime via Discord commands or REST API
- **PostgreSQL & SQLite**: Full SQLite support for development and single-instance; PostgreSQL for multi-instance production deployment
- **Docker Support**: Multi-stage Docker builds and Docker Compose with multi-instance profile

## Commands

### Nova Subsystem (Navi)

1. **/navi** - Manually trigger a Na'vi word post (owner only)
   - Fetches a random Na'vi word with English translation from Reykunyu API
   - Posts as a rich embed to the configured channel

### Utility Commands

2. **/ping** - Check the bot's latency and response time
3. **/help** - Shows the help menu with all available commands by category
4. **/userinfo** - Displays information about a user (ID, join date, roles, status)
5. **/serverinfo** - Shows server statistics and information
6. **/avatar** - Display a user's avatar
7. **/banner** - Display a user's banner
8. **/channelinfo** - Shows channel details and permissions
9. **/roleinfo** - Displays role information and member count
10. **/embed** - Create and send custom rich embeds
11. **/announcement** - Send formatted announcements to a channel
12. **/poll** - Create interactive polls with reaction voting
13. **/remind** / **/reminders** / **/cancelreminder** - Reminder system
14. **/tag** - Custom server tag system
15. **/giveaway** - Create and manage giveaways
16. **/report** - Report a user to server staff
17. **/joke** - Fetch a random joke
18. **/roll** - Roll dice with optional sides
19. **/8ball** - Magic 8-ball responses
20. **/invite** - Get bot invite links
21. **/sla** - Service level agreement display
22. **/leaderboard** - Server activity leaderboard
23. **/stats** - Bot statistics and uptime
24. **/level** - User level and XP (if configured)

### Moderation Commands

25. **/kick** - Kick a user from the server
26. **/ban** - Ban a user from the server (optionally delete message history)
27. **/unban** - Unban a previously banned user
28. **/mute** - Temporarily mute a user (Discord timeout, with role fallback)
29. **/unmute** - Unmute a previously muted user
30. **/purge** - Bulk delete messages (1-100, optional user filter)
31. **/warn** - Issue a warning to a user
    - **/warnings** - View and manage warnings
    - **/clear-warnings** - Clear warnings for a user
32. **/nickname** - Change or reset a user's nickname
33. **/slowmode** - Set channel slowmode

### Ticket System

34. **/ticket** - Open a support ticket
    - **/ticket setup** - Configure the ticket system
    - **/ticket close** - Close a ticket
    - **/ticket add** - Add a user to a ticket
    - **/ticket remove** - Remove a user from a ticket

### Admin Commands

35. **/system** - Health dashboard (plugins, memory, uptime, queue stats, DB status)
36. **/queue** - BullMQ queue management (jobs by status, retry failed, clean completed)
37. **/migrate** - Database migration management (status, run pending migrations)
38. **/plugin** - Remote plugin management
    - **/plugin install** - Install a plugin from a ZIP URL
    - **/plugin enable** / **/plugin disable** - Toggle a plugin
    - **/plugin reload** - Reload a plugin
    - **/plugin uninstall** - Remove a plugin
    - **/plugin search** - Search the plugin registry
    - **/plugin update** - Update an installed plugin

## Installation

### Prerequisites

- Node.js 26 or higher
- pnpm 11 (install via `npm install -g corepack && corepack enable && corepack prepare pnpm@latest --activate`)
- Docker and Docker Compose (optional, for containerized deployment)
- A Discord bot token and client ID

### Quick Start with Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/The-A-P-O-L-L-O-Organization/Apollo-Discord-Bot.git
   cd Apollo-Discord-Bot
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

3. **Edit the `.env` file** with your Discord bot token, client ID, and owner IDs:
   ```
   DISCORD_TOKEN=your-discord-bot-token-here
   CLIENT_ID=your-bot-client-id
   OWNER_IDS=your-discord-user-id
   ```

4. **Start the bot**
   ```bash
   docker compose up -d
   ```

5. **View logs**
   ```bash
   docker compose logs -f
   ```

### Multi-Instance with Docker Compose

For horizontal scaling with PostgreSQL, Redis, and BullMQ:

```bash
docker compose --profile multi up -d
```

This starts: PostgreSQL, Redis, gateway (1 replica), and worker (configurable replicas).

Environment variables for multi-instance:
```
DB_TYPE=postgres
DATABASE_URL=postgresql://user:password@host:5432/apollo
QUEUE_ENABLED=true
REDIS_HOST=redis
```

### Manual Installation

1. **Clone and install dependencies**
   ```bash
   git clone https://github.com/The-A-P-O-L-L-O-Organization/Apollo-Discord-Bot.git
   cd Apollo-Discord-Bot
   pnpm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with DISCORD_TOKEN, CLIENT_ID, OWNER_IDS
   ```

3. **Deploy slash commands**
   ```bash
   node deploy-commands.js
   ```

4. **Start the bot**
   ```bash
   pnpm start
   ```

## Configuration

All configuration is managed through `src/config/config.js` and environment variables.

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DISCORD_TOKEN` | Yes | — | Discord bot token |
| `CLIENT_ID` | Yes | — | Discord application/client ID |
| `OWNER_IDS` | Yes | — | Comma-separated Discord user IDs for admin access |
| `DB_TYPE` | No | `sqlite` | Database type (`sqlite` or `postgres`) |
| `DATABASE_URL` | No | — | PostgreSQL connection string (required if `DB_TYPE=postgres`) |
| `QUEUE_ENABLED` | No | `false` | Enable BullMQ work queue |
| `REDIS_HOST` | No | `localhost` | Redis host (required if QUEUE_ENABLED) |
| `REDIS_PORT` | No | `6379` | Redis port |
| `REDIS_PASSWORD` | No | — | Redis password |
| `RUN_MODE` | No | `gateway` | `gateway` (WebSocket) or `worker` (job processing) |
| `POD_ID` | No | `default` | Unique instance identifier for leader election |
| `NAVI_CHANNEL_ID` | No | — | Channel ID for daily Na'vi word posts (Nova subsystem) |

### Key Config Sections

```javascript
export const config = {
    // Plugin System
    plugins: {
        enabled: ['utility', 'admin', 'moderation', 'tickets', 'automod', 'nova'],
        directory: './src/plugins',
        optionalDirectory: './data/plugins',
        registryFile: './data/plugin-registry.json'
    },

    // Database
    database: {
        type: process.env.DB_TYPE || 'sqlite',
        postgres: {
            connectionString: process.env.DATABASE_URL,
            pool: { min: 2, max: 10 }
        }
    },

    // Queue (BullMQ)
    queue: {
        enabled: process.env.QUEUE_ENABLED === 'true',
        redis: { host, port, password },
        prefix: 'apollo'
    },

    // Warning thresholds
    warnings: {
        thresholds: { mute: 3, kick: 5, ban: 7 },
        muteDuration: 3600000,
        dmOnWarn: true
    },

    // Auto-moderation
    automod: {
        bannedWords: [],
        maxMentions: 5,
        maxCapsPercent: 70,
        spamThreshold: 5,
        action: 'warn'
    }
};
```

## Project Structure

```
Apollo-Discord-Bot/
├── src/
│   ├── index.js                 # Gateway entry (WebSocket + leader election)
│   ├── worker.js                # Worker entry (BullMQ consumer, no Discord client)
│   ├── deploy-commands.js       # Slash command deployment
│   ├── config/
│   │   └── config.js            # Central configuration
│   ├── core/
│   │   ├── Plugin.js            # Plugin base class
│   │   ├── PluginManager.js     # Plugin lifecycle management
│   │   ├── EventBus.js          # Inter-plugin communication (3 layers + Redis pub/sub)
│   │   └── pluginDownloader.js  # Remote plugin ZIP extraction
│   ├── plugins/
│   │   ├── utility/             # 24 commands: ping, help, embed, poll, remind, tag, etc.
│   │   ├── admin/               # 4 commands: system, queue, migrate, plugin
│   │   ├── moderation/          # 12 commands: kick, ban, mute, warn, purge, etc.
│   │   ├── tickets/             # 5 commands: ticket open/close/setup/add/remove
│   │   ├── automod/             # Auto-moderation background events
│   │   └── nova/                # Nova subsystem: /navi command, daily Na'vi scheduler
│   ├── db/
│   │   ├── knex.js              # Knex connection factory (PG or SQLite)
│   │   ├── adapter.js           # Async PG adapter (get/set/update guild data)
│   │   └── migrations/          # Database migration files
│   ├── queue/
│   │   ├── queue.js             # BullMQ queue factory (with no-op fallback)
│   │   └── jobs/                # Job processor definitions
│   ├── gateway/
│   │   └── leader.js            # Redis leader election (SET NX PX + heartbeat)
│   └── utils/
│       ├── db.js                # Async PG/SQLite bridge (56 import sites unchanged)
│       ├── lock.js              # Distributed lock (acquire/release/withLock)
│       ├── automod.js           # Spam detection (Redis + in-memory)
│       ├── raidDetection.js     # Join raid prevention (Redis + in-memory)
│       ├── reminderScheduler.js # Background reminder checking
│       ├── pollScheduler.js     # Poll expiry and tallying
│       ├── tempbanScheduler.js  # Tempban expiry processing
│       └── tempRolesScheduler.js# Temporary role cleanup
├── Dockerfile                   # Development Dockerfile
├── Dockerfile.prod              # Multi-stage production Dockerfile
├── docker-compose.yml           # Single + multi-instance profiles
├── .env.example                 # All environment variables documented
├── INSTALLATION.md              # Full installation guide (single, K8s, Docker Compose)
├── package.json
└── pnpm-workspace.yaml          # Security overrides
```

## Architecture

### Plugin System

Each plugin in `src/plugins/` extends the `Plugin` base class with a static `id`:

```javascript
import Plugin from '../../core/Plugin.js';

export default class MyPlugin extends Plugin {
  static id = 'myplugin';
  static version = '1.0.0';
  static dependencies = [];

  async onEnable() {
    await this._loadCommands();   // Loads from ./commands/
    await this._loadEvents();     // Loads from ./events/
    initMyScheduler(this.client);
  }

  async onDisable() {
    this._unloadCommands();
    this._unloadEvents();
    stopMyScheduler();
  }
}
```

Plugins communicate via `EventBus` (`this.bus`):
- **Events**: `this.bus.emit('eventName', data)` / `this.bus.on('eventName', handler)`
- **API Registry**: `this.bus.registerAPI('myapi', { methods })` / `this.bus.callAPI('myapi', 'method', args)`
- **Reactive State**: `this.bus.setState('key', value)` / `this.bus.watchState('key', callback)`
- **Cross-Pod**: Redis pub/sub bridges all three layers across gateway and workers

### Multi-Instance Architecture

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│ Gateway  │     │ Worker 1 │     │ Worker N │
│ (1 pod)  │     │ (N pods) │     │          │
└────┬─────┘     └────┬─────┘     └────┬─────┘
     │                │                │
     └────────────────┴────────────────┘
              │                 │
        ┌─────▼─────┐    ┌──────▼──────┐
        │  Discord  │    │   Redis +   │
        │ WebSocket │    │  PostgreSQL │
        └───────────┘    └─────────────┘
```

- **Gateway** (1 replica): Maintains Discord WebSocket connection, enqueues commands to BullMQ
- **Workers** (N replicas): Pull and process commands from BullMQ, respond via REST API
- **Leader Election**: Redis `SET NX PX` ensures exactly one gateway runs schedulers
- **State**: Shared PostgreSQL for all persistent data; Redis for locks, queues, and cross-pod events

## Usage

```bash
# Development (with auto-restart)
pnpm dev

# Production
pnpm start

# Docker Compose (single instance)
docker compose up -d

# Docker Compose (multi-instance with PostgreSQL + Redis)
docker compose --profile multi up -d

# Run tests
pnpm test

# Deploy slash commands
node deploy-commands.js
```

## Adding New Plugins

1. Create `src/plugins/yourplugin/` with `plugin.js` extending `Plugin`
2. Add commands in `commands/` and events in `events/`
3. Add your plugin's `id` to `config.plugins.enabled` in `src/config/config.js`
4. Slash commands are auto-deployed on next bot restart

## Adding New Commands to an Existing Plugin

1. Create a new command file in `src/plugins/<plugin>/commands/`
2. Follow the structure:
   ```javascript
   import { SlashCommandBuilder } from 'discord.js';

   export default {
     data: new SlashCommandBuilder()
       .setName('commandname')
       .setDescription('Description'),
     name: 'commandname',
     category: 'category',

     async execute(interaction) {
       // Command logic
     }
   };
   ```
3. Restart the bot — the plugin's `_loadCommands()` picks it up automatically

## Technologies Used

- **discord.js** — Discord API wrapper
- **Node.js 26** — JavaScript runtime
- **pnpm 11** — Package manager
- **BullMQ** — Work queue for horizontal scaling
- **PostgreSQL / SQLite** — Database (Knex query builder)
- **Redis** — Caching, locks, queues, cross-pod bridging
- **Docker** — Containerization with Alpine-based images
- **GitHub Actions** — CI/CD pipeline
- **GitHub Container Registry** — Docker image hosting
- **Vitest** — Test framework (982+ tests)

## Links

- [GitHub Repository](https://github.com/The-A-P-O-L-L-O-Organization/Apollo-Discord-Bot)
- [Installation Guide](https://github.com/The-A-P-O-L-L-O-Organization/Apollo-Discord-Bot/blob/main/INSTALLATION.md)
- [Contributing](https://github.com/The-A-P-O-L-L-O-Organization/Apollo-Discord-Bot/blob/main/CONTRIBUTING.md)

> A.P.O.L.L.O Discord Bot v2 is maintained by [The-A-P-O-L-L-O-Organization](https://github.com/The-A-P-O-L-L-O-Organization).
