---
sidebar_position: 3
---

# Developer Guide

Welcome to the Apollo Bot Developer Guide. This guide covers everything you need to know to set up your development environment, understand the codebase architecture, and contribute to Apollo.

## Development Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 26+** - The JavaScript runtime
- **pnpm 11** - Package manager (recommended over npm)
- **Git** - Version control
- **SQLite** - For local database development

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Apollo-Org/apollo-bot.git
   cd apollo-bot
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

### Configure Environment

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your development settings:**
   ```
   DISCORD_TOKEN=your_test_bot_token
   DISCORD_CLIENT_ID=your_client_id
   DISCORD_GUILD_ID=your_test_guild_id
   DATABASE_URL=sqlite://./apollo.db
   REDIS_URL=redis://localhost:6379
   ```

### Start Development

Run the development server with hot reload:

```bash
pnpm dev
```

The bot will start and connect to Discord. Check your console for any initialization errors.

## Project Structure

Apollo follows a modular architecture. Here's the `src/` directory structure:

```
src/
├── index.js                 # Gateway entry point
├── worker.js                # Worker entry point
├── deploy-commands.js       # Command deployment utility
├── config/
│   ├── settings.js
│   └── constants.js
├── core/
│   ├── Plugin.js            # Base plugin class
│   ├── PluginManager.js     # Plugin lifecycle management
│   ├── EventBus.js          # Event communication system
│   └── pluginDownloader.js  # Plugin loading utility
├── plugins/
│   ├── utility/             # General utility commands
│   ├── admin/               # Admin commands
│   ├── moderation/          # Moderation commands
│   ├── tickets/             # Ticket system
│   ├── automod/             # Auto-moderation
│   └── nova/                # Nova AI integration
├── db/
│   ├── knex.js              # Database configuration
│   ├── adapter.js           # Database adapter
│   └── migrations/          # Database migrations
├── queue/
│   ├── queue.js             # Job queue setup
│   └── jobs/                # Job definitions
├── gateway/
│   └── leader.js            # Gateway leader logic
└── utils/
    ├── logger.js            # Logging utility
    ├── formatters.js        # Text formatting
    ├── validators.js        # Input validation
    ├── errors.js            # Error handling
    ├── cache.js             # Caching layer
    ├── metrics.js           # Metrics collection
    ├── permissions.js       # Permission checks
    └── helpers.js           # General helpers
```

## Plugin Architecture

Apollo's extensibility is built on a plugin system. All functionality is organized as plugins that can be enabled, disabled, and communicated with through a central event bus.

### Plugin Base Class

Here's the structure of a basic plugin:

```javascript
import { Plugin } from '../core/Plugin.js'

export default class MyPlugin extends Plugin {
  constructor(client, config) {
    super('my-plugin', '1.0.0')
    this.client = client
    this.config = config
  }

  // Called when plugin is enabled
  async onEnable() {
    console.log(`${this.name} enabled!`)
    this.registerCommands()
    this.setupListeners()
  }

  // Called when plugin is disabled
  async onDisable() {
    console.log(`${this.name} disabled!`)
    this.cleanup()
  }

  registerCommands() {
    // Register slash commands
  }

  setupListeners() {
    // Setup event listeners
  }

  cleanup() {
    // Clean up resources
  }
}
```

### Plugin Communication

Plugins communicate through three primary mechanisms:

#### Events (EventBus)

Emit and listen to events across the application:

```javascript
// Emit an event
this.client.eventBus.emit('user-warned', {
  userId: '123456',
  moderatorId: '789012',
  reason: 'Spam'
})

// Listen for events
this.client.eventBus.on('user-warned', (data) => {
  console.log(`User ${data.userId} was warned`)
})
```

#### API Registry

Register and call plugin APIs:

```javascript
// Register an API function
this.client.apiRegistry.registerAPI('get-user-warnings', async (userId) => {
  return await this.db.getWarnings(userId)
})

// Call another plugin's API
const warnings = await this.client.apiRegistry.callAPI('get-user-warnings', userId)
```

#### Reactive State

Share state that other plugins can watch:

```javascript
// Set reactive state
this.client.setState('moderation-config', { warnLimit: 3 })

// Watch for changes
this.client.watchState('moderation-config', (newState) => {
  console.log('Config updated:', newState)
})
```

### Command Structure

Commands in Apollo are Discord slash commands with validation and permission checks:

```javascript
export const command = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to warn')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for the warning')
        .setRequired(false)
    ),
  
  async execute(interaction) {
    const user = interaction.options.getUser('user')
    const reason = interaction.options.getString('reason') || 'No reason provided'
    
    // Your command logic here
    await interaction.reply(`${user} has been warned: ${reason}`)
  }
}
```

## Multi-Instance Architecture

Apollo is designed to run multiple instances for scalability and redundancy:

```
┌─────────────────────────────────────────────────────┐
│           Discord Gateway Connections               │
└────────────┬────────────────────────────────────────┘
             │
    ┌────────┴──────────┐
    │                   │
┌───▼──────┐      ┌────▼──────┐
│ Gateway  │      │  Worker   │
│ Instance │      │ Instances │
└───┬──────┘      └────┬──────┘
    │                   │
    └──────────┬────────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───▼────────┐      ┌────▼───────┐
│   Redis    │      │ PostgreSQL  │
│  Cache &   │      │ / SQLite    │
│   Pub/Sub  │      │ Database    │
└────────────┘      └─────────────┘
```

**Components:**
- **Gateway Instance**: Maintains primary Discord websocket connection, handles gateway leadership
- **Worker Instances**: Process jobs, handle commands, perform computations
- **Redis**: Caches data and provides pub/sub for inter-process communication
- **Database**: Persistent storage for configurations, warnings, tickets, and other data

## Development Commands

Here are the common commands you'll use during development:

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start development server with hot reload |
| `node deploy-commands.js` | Deploy slash commands to Discord |
| `pnpm test` | Run test suite |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run linter (ESLint) |

## Adding a New Command

To add a new slash command to Apollo:

1. **Create a command file** in `src/plugins/[plugin-name]/commands/`:
   ```javascript
   // src/plugins/utility/commands/ping.js
   import { SlashCommandBuilder } from 'discord.js'
   
   export const command = {
     data: new SlashCommandBuilder()
       .setName('ping')
       .setDescription('Replies with pong!'),
     
     async execute(interaction) {
       await interaction.reply('Pong!')
     }
   }
   ```

2. **Restart the bot** to load the new command:
   ```bash
   pnpm dev
   ```

3. **Deploy commands to Discord**:
   ```bash
   node deploy-commands.js
   ```

4. **Test the command** in your Discord server using `/ping`

## Adding a New Plugin

To create a new plugin for Apollo:

1. **Create the plugin directory structure**:
   ```bash
   mkdir -p src/plugins/my-feature
   mkdir src/plugins/my-feature/commands
   mkdir src/plugins/my-feature/events
   mkdir src/plugins/my-feature/db
   ```

2. **Create the main plugin file** (`src/plugins/my-feature/plugin.js`):
   ```javascript
   import { Plugin } from '../../core/Plugin.js'
   
   export default class MyFeaturePlugin extends Plugin {
     constructor(client, config) {
       super('my-feature', '1.0.0')
       this.client = client
       this.config = config
     }
   
     async onEnable() {
       console.log('MyFeature plugin enabled')
       await this.loadCommands()
       await this.setupDatabase()
     }
   
     async onDisable() {
       console.log('MyFeature plugin disabled')
     }
   
     async loadCommands() {
       // Load all commands in commands/
     }
   
     async setupDatabase() {
       // Initialize database tables if needed
     }
   }
   ```

3. **Add commands and event listeners** in the `commands/` and `events/` subdirectories

4. **Enable the plugin** in your configuration file (usually `src/config/settings.js`):
   ```javascript
   plugins: {
     'my-feature': { enabled: true }
   }
   ```

5. **Restart and deploy**:
   ```bash
   pnpm dev
   node deploy-commands.js
   ```

## Testing

Apollo uses Vitest for unit and integration testing.

### Running Tests

```bash
pnpm test
```

This runs all test files matching `**/*.test.js` or `**/*.spec.js`.

### Test File Locations

Place test files alongside your code:
- `src/utils/helpers.js` → `src/utils/helpers.test.js`
- `src/plugins/admin/commands/ban.js` → `src/plugins/admin/commands/ban.test.js`

### Writing Tests

```javascript
import { describe, it, expect } from 'vitest'
import { isValidUserId } from './validators.js'

describe('Validators', () => {
  it('should validate user IDs correctly', () => {
    expect(isValidUserId('123456789')).toBe(true)
    expect(isValidUserId('invalid')).toBe(false)
  })
})
```

## Contributing

Want to contribute to Apollo? Follow these steps:

1. **Fork the repository** on GitHub
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/my-awesome-feature
   ```
3. **Make your changes** and test them locally
4. **Add tests** for new functionality
5. **Run linter and tests**:
   ```bash
   pnpm lint
   pnpm test
   ```
6. **Submit a pull request** with a clear description of your changes

## Technologies

Apollo Bot is built with modern technologies:

- **discord.js** - Discord API library
- **Node.js 26** - JavaScript runtime
- **pnpm 11** - Package manager
- **BullMQ** - Job queue
- **PostgreSQL / SQLite** - Database
- **Redis** - Cache and pub/sub
- **Docker** - Containerization
- **Vitest** - Testing framework
