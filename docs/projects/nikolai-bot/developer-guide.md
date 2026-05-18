---
sidebar_position: 3
---

# Developer Guide

Guide for developers contributing to Nikolai-Bot

This guide covers the architecture, project structure, and development workflows for contributing to Nikolai-Bot. Whether you're adding new commands, fixing bugs, or extending functionality, this guide will help you understand how the system works.

## Architecture Overview

Nikolai-Bot is built using Discord.js for bot functionality and Mongoose for data persistence. The system is organized into logical layers:

### Command Structure

Commands are organized into 14 categories reflecting different gameplay areas:

- **admin** - Game Master configuration and management commands
- **diplomacy** - War, alliance, treaty, and government commands
- **economy** - Financial, trade, and economic commands
- **gameplay** - General gameplay and interaction commands
- **info** - Information lookups and statistics
- **military** - Unit production, deployment, and combat commands
- **nation** - Nation creation and core management
- **qol** - Quality of life convenience features
- **research** - Technology and research commands
- **resources** - Resource production and infrastructure
- **social** - Press releases and reputation commands
- **time** - Turn scheduling and processing commands
- **units** - Unit-specific management commands

Each category contains 2-5 command files, totaling 47 distinct commands.

### Database Models

Core data structures persist in MongoDB through Mongoose models:

- **Nation** - Nation metadata, statistics, government type
- **Economy** - Budget, GDP, debt, resources, transactions
- **Military** - Army/Navy/Airforce units, deployments, production
- **War** - Conflict between nations, combat results, peace treaties
- **Research** - Technology tree status, progress, unlocked techs
- **Trade** - Trade agreements and resource exchanges
- **Diplomacy** - Alliances, treaties, espionage, relations
- **AuditLog** - Complete history of all changes

Models define schemas with validation and business logic hooks.

### Event System

Discord.js events trigger bot functionality:

- **ready** - Bot startup initialization
- **interactionCreate** - Slash command execution
- **guildMemberAdd/Remove** - Player join/leave handling
- **messageCreate** - Legacy command handling (if enabled)

Custom event system triggers:

- **turnProcess** - Scheduled turn advancement (every 12 hours)
- **randomEvent** - Events triggered during turn processing
- **warResolution** - Combat resolution after turn processing

### Service Layer

Business logic lives in service modules:

- **EconomyService** - GDP calculation, budget processing, transactions
- **MilitaryService** - Unit production, deployment, combat simulation
- **DiplomacyService** - War/peace logic, alliance management
- **ResearchService** - Technology tree advancement
- **EventService** - Random event generation and resolution
- **AuditService** - Logging and historical record keeping

Services are stateless and testable, with pure functions when possible.

## Development Setup

### Prerequisites

- Node.js 18+ ([download](https://nodejs.org/))
- MongoDB 6+ ([local install](https://docs.mongodb.com/manual/installation/) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Git ([download](https://git-scm.com/))
- A text editor or IDE (VS Code recommended)

### Clone Repository

```bash
git clone https://github.com/your-org/nikolai-bot.git
cd nikolai-bot
```

### Install Dependencies

```bash
npm install
```

This installs all required packages including discord.js, mongoose, dotenv, and testing dependencies.

### Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```
DISCORD_TOKEN=your_bot_token_here
MONGODB_URI=mongodb://localhost:27017
GUILD_ID=your_discord_server_id
TURN_INTERVAL=12
MONGODB_DB_NAME=nikolai_bot
LOG_LEVEL=debug
ENABLE_DEV_COMMANDS=true
```

### Running Locally

Start the bot in development mode:

```bash
npm run dev
```

This starts the bot with auto-reload on file changes. You'll see logs like:

```
[2024-01-15 10:30:00] info: Nikolai-Bot ready! Logged in as YourBot#1234
[2024-01-15 10:30:00] info: Registered 47 commands in guild 123456789
```

### Docker Development

For development with Docker:

```bash
# Build the development image
docker build -f Dockerfile.dev -t nikolai-bot:dev .

# Start with docker-compose
docker-compose -f docker-compose.dev.yml up

# View logs
docker-compose logs -f nikolai-bot
```

## Project Structure

```
nikolai-bot/
├── src/
│   ├── commands/                 # Command handlers (47 files across 14 folders)
│   │   ├── admin/
│   │   ├── diplomacy/
│   │   ├── economy/
│   │   ├── gameplay/
│   │   ├── info/
│   │   ├── military/
│   │   ├── nation/
│   │   ├── qol/
│   │   ├── research/
│   │   ├── resources/
│   │   ├── social/
│   │   ├── time/
│   │   └── units/
│   ├── database/
│   │   ├── models/               # Mongoose schemas
│   │   │   ├── Nation.js
│   │   │   ├── Economy.js
│   │   │   ├── Military.js
│   │   │   ├── War.js
│   │   │   ├── Research.js
│   │   │   ├── Trade.js
│   │   │   ├── Diplomacy.js
│   │   │   ├── AuditLog.js
│   │   │   └── ...
│   │   └── connection.js         # MongoDB connection
│   ├── services/                 # Business logic
│   │   ├── EconomyService.js
│   │   ├── MilitaryService.js
│   │   ├── DiplomacyService.js
│   │   ├── ResearchService.js
│   │   ├── EventService.js
│   │   ├── AuditService.js
│   │   └── ...
│   ├── events/                   # Discord.js event handlers
│   │   ├── ready.js
│   │   ├── interactionCreate.js
│   │   └── ...
│   ├── utils/                    # Utility functions
│   │   ├── logger.js
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   └── ...
│   ├── config/                   # Configuration
│   │   ├── constants.js
│   │   ├── gameBalance.js
│   │   └── permissions.js
│   └── index.js                  # Bot entry point
├── tests/                        # Test files
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── .env.example                  # Example environment variables
├── .gitignore
├── package.json
└── README.md
```

## Creating Commands

Commands follow a consistent structure for organization and consistency.

### Command Template

```javascript
// src/commands/category/commandName.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('commandname')
    .setDescription('Brief description of what the command does')
    .addStringOption(option =>
      option
        .setName('parameter')
        .setDescription('Parameter description')
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      // Command logic here
      await interaction.reply('Response message');
    } catch (error) {
      console.error('Command error:', error);
      await interaction.reply({
        content: 'An error occurred while executing this command.',
        ephemeral: true,
      });
    }
  },
};
```

### Registering Commands

Commands are auto-discovered from the `/src/commands/` directory structure. The bot:

1. Walks all subdirectories in `/src/commands/`
2. Loads all `.js` files as command modules
3. Registers commands with Discord on bot startup

No manual registration needed—just save your command file in the appropriate category folder.

### Slash Command Implementation

Use Discord.js SlashCommandBuilder for all new commands:

```javascript
const { SlashCommandBuilder } = require('discord.js');

new SlashCommandBuilder()
  .setName('economy')
  .setDescription('View your nation economy')
  .addSubcommand(subcommand =>
    subcommand
      .setName('view')
      .setDescription('View economy details')
  )
  .addSubcommand(subcommand =>
    subcommand
      .setName('budget')
      .setDescription('Set your budget')
      .addIntegerOption(option =>
        option
          .setName('amount')
          .setDescription('Budget amount')
          .setRequired(true)
      )
  )
```

### Permission Checks

Always verify permissions before executing:

```javascript
async execute(interaction) {
  const { user, guild } = interaction;
  
  // Get nation for this user
  const nation = await Nation.findOne({ discordUserId: user.id });
  if (!nation) {
    return interaction.reply({
      content: 'You must own a nation to use this command.',
      ephemeral: true,
    });
  }

  // Verify user is nation leader
  if (nation.leaderId !== user.id) {
    return interaction.reply({
      content: 'You must be the nation leader to execute this command.',
      ephemeral: true,
    });
  }

  // Execute command logic
}
```

### Error Handling

Always wrap command logic in try-catch and use AuditService for logging:

```javascript
async execute(interaction) {
  try {
    const result = await SomeService.doSomething();
    
    await AuditService.log({
      action: 'command.executed',
      user: interaction.user.id,
      command: 'commandname',
      details: { result },
    });
    
    await interaction.reply(successMessage);
  } catch (error) {
    console.error('Command error:', error);
    
    await AuditService.log({
      action: 'command.error',
      user: interaction.user.id,
      command: 'commandname',
      error: error.message,
    });
    
    await interaction.reply({
      content: 'An error occurred.',
      ephemeral: true,
    });
  }
}
```

## Database Operations

### Mongoose Models

All data persists through Mongoose models in MongoDB. Here's typical usage:

### Creating Documents

```javascript
const nation = new Nation({
  name: 'My Nation',
  discordUserId: interaction.user.id,
  population: 1000000,
  capital: 'Capital City',
  government: 'democracy',
});

await nation.save();
```

### Querying Documents

```javascript
// Find by ID
const nation = await Nation.findById(nationId);

// Find by property
const nation = await Nation.findOne({ name: 'My Nation' });

// Find multiple
const nations = await Nation.find({ government: 'monarchy' });

// Find with filtering
const wealthy = await Nation.find({ gdp: { $gte: 1000000 } });
```

### Updating Documents

```javascript
// Update single property
nation.gdp = 2000000;
await nation.save();

// Update multiple properties
await Nation.updateOne(
  { _id: nationId },
  { $set: { gdp: 2000000, stability: 75 } }
);

// Increment values
await Nation.updateOne(
  { _id: nationId },
  { $inc: { population: 1000 } }
);
```

### Transactions

For operations affecting multiple documents, use transactions:

```javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
  // Deduct from source nation
  await Economy.updateOne(
    { nationId: sourceId },
    { $inc: { budget: -amount } },
    { session }
  );

  // Add to target nation
  await Economy.updateOne(
    { nationId: targetId },
    { $inc: { budget: amount } },
    { session }
  );

  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  await session.endSession();
}
```

### Audit Logging

Always log significant actions for debugging and admin oversight:

```javascript
await AuditLog.create({
  timestamp: new Date(),
  action: 'economy.transfer',
  userId: user.id,
  sourceNation: sourceId,
  targetNation: targetId,
  amount: amount,
  status: 'success',
});
```

## Testing

### Unit Tests

Test individual service methods:

```bash
npm run test:unit
```

Example unit test:

```javascript
// tests/unit/services/EconomyService.test.js
const EconomyService = require('../../../src/services/EconomyService');

describe('EconomyService', () => {
  it('should calculate GDP correctly', () => {
    const result = EconomyService.calculateGDP({
      population: 1000000,
      infrastructure: 50,
      tradeBenefit: 10000,
    });
    
    expect(result).toBeGreaterThan(0);
  });
});
```

### Integration Tests

Test command execution and database interactions:

```bash
npm run test:integration
```

### Creating Test Data

Use dev commands to create test nations:

```javascript
// In development mode with ENABLE_DEV_COMMANDS=true
/dev nation create --name "Test Nation" --population 1000000
/dev economy initialize --nation "Test Nation"
/dev military add --nation "Test Nation" --unit army --count 10
```

## Contributing

### Code Style

- Use 2-space indentation
- Use const/let, never var
- Use async/await, avoid promise chains
- Add JSDoc comments for all functions
- Keep functions focused and testable

### Commit Messages

Follow conventional commits format:

```
feat: add new economy command
fix: prevent double-processing during turn
docs: update command reference
refactor: simplify battle simulator
test: add unit tests for economy service
```

### Pull Request Process

1. Create a feature branch from `main`
2. Implement your changes with commits
3. Add or update tests for your changes
4. Update relevant documentation
5. Open a pull request with clear description of changes
6. Address review feedback
7. Wait for approval before merging

### Bug Reporting

When reporting bugs, include:

- Discord username and nation name
- Exact steps to reproduce
- Expected vs actual behavior
- Error logs (if available)
- Bot version/commit hash

### Code Review Checklist

- Does the code follow the style guide?
- Are there sufficient tests?
- Is error handling comprehensive?
- Are all database operations audited?
- Is the documentation up to date?
- Does it break any existing functionality?
