# A.P.O.L.L.O Discord Bot

A Discord bot built with discord.js that welcomes new users and provides useful utility and moderation commands.

## Features

- **Welcome System**: Automatically greets new members when they join the server
- **Utility Commands**: Includes helpful commands for server management
- **Moderation Commands**: Full suite of moderation tools for server management
- **Docker Support**: Easy deployment with Docker and Docker Compose
- **Easy to Extend**: Modular architecture makes it simple to add new features
- **Rich Embeds**: Beautiful, formatted messages for better user experience

## Commands

### Utility Commands

1. **/ping** - Check the bot's latency and response time
   - Measures round-trip latency
   - Shows API latency
   - Displays connection status

2. **/help** - Shows the help menu with all available commands
   - Lists all commands by category
   - Provides usage instructions
   - Shows command descriptions

3. **/userinfo** - Displays information about a user
   - Shows username, ID, and account age
   - Displays join date and server position
   - Lists roles and status

### Moderation Commands

4. **/kick** - Kick a user from the server
   - Removes user from the server
   - Requires reason
   - Logs action in moderation channel

5. **/ban** - Ban a user from the server
   - Permanently removes user from server
   - Option to delete message history (0-7 days)
   - Requires reason
   - Logs action in moderation channel

6. **/unban** - Unban a previously banned user
   - Removes ban from user by ID
   - Requires user ID
   - Logs action in moderation channel

7. **/mute** - Temporarily mute a user
   - Uses Discord timeout feature
   - Supports duration (1m, 1h, 1d, 1w)
   - Fallback to Mute role if needed
   - Logs action in moderation channel

8. **/unmute** - Unmute a previously muted user
   - Removes timeout from user
   - Also removes Mute role if present
   - Logs action in moderation channel

9. **/purge** - Delete multiple messages from a channel
   - Bulk delete messages (1-100)
   - Optional user filter
   - Logs action in moderation channel

## Installation

### Prerequisites

- Node.js 18.0 or higher
- pnpm (recommended) or npm
- Docker and Docker Compose (optional)
- A Discord bot token

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

3. **Edit the `.env` file and add your Discord bot token**
   ```
   DISCORD_TOKEN=your-discord-bot-token-here
   CLIENT_ID=your-bot-client-id
   ```

4. **Start the bot with Docker Compose**
   ```bash
   docker-compose up -d
   ```

5. **View logs**
   ```bash
   docker-compose logs -f
   ```

6. **Stop the bot**
   ```bash
   docker-compose down
   ```

### Manual Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/The-A-P-O-L-L-O-Organization/Apollo-Discord-Bot.git
   cd Apollo-Discord-Bot
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file and add your Discord bot token:
   ```
   DISCORD_TOKEN=your-discord-bot-token-here
   CLIENT_ID=your-bot-client-id
   ```

4. **Set up your Discord server**
   - Create a channel named "welcome" for welcome messages
   - Create a channel named "mod-logs" for moderation logs (optional)
   - Create a role named "Muted" for the mute feature (optional)
   - Invite the bot to your server with appropriate permissions

5. **Deploy commands** (optional, for slash commands)
   ```bash
   node deploy-commands.js
   ```

6. **Start the bot**
   ```bash
   pnpm start
   ```

## Configuration

All configuration is managed through `src/config/config.js`. Key settings include:

```javascript
export const config = {
    // Discord Bot Token
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    
    // Bot Activity/Status
    activity: {
        name: 'for new members join',
        type: 'WATCHING'
    },
    
    // Welcome Message Settings
    welcome: {
        channelName: 'welcome',
        message: 'Welcome {user} to {server}!'
    },
    
    // Moderation Settings
    moderation: {
        defaultReason: 'No reason provided',
        muteRoleName: 'Muted',
        muteDuration: 3600000, // 1 hour
        maxMessagesPerPurge: 100,
        purgeCooldown: 5000,
        logModerationActions: true,
        moderationLogChannel: 'mod-logs'
    },
    
    // Command Prefix
    prefix: '!'
};
```

## Project Structure

```
Apollo-Discord-Bot/
├── src/
│   ├── index.js              # Main entry point
│   ├── config/
│   │   └── config.js         # Bot configuration
│   ├── commands/
│   │   ├── ping.js           # Ping command
│   │   ├── help.js           # Help command
│   │   ├── userinfo.js       # User info command
│   │   ├── kick.js           # Kick command
│   │   ├── ban.js            # Ban command
│   │   ├── unban.js          # Unban command
│   │   ├── mute.js           # Mute command
│   │   ├── unmute.js         # Unmute command
│   │   └── purge.js          # Purge command
│   ├── events/
│   │   ├── ready.js          # Ready event handler
│   │   └── guildMemberAdd.js # Welcome event handler
│   └── handlers/
│       └── commandHandler.js # Command registration
├── deploy-commands.js        # Command deployment script
├── Dockerfile                # Development Dockerfile
├── Dockerfile.prod           # Production Dockerfile
├── docker-compose.yml        # Docker Compose configuration
├── .env.example              # Environment template
├── .dockerignore             # Docker ignore file
├── package.json              # Project dependencies
└── pnpm-lock.yaml            # Locked dependencies
```

## Usage

### Starting the Bot

```bash
# Start in normal mode
pnpm start

# Start in development mode (with auto-restart)
pnpm dev

# Start with Docker Compose (recommended)
docker-compose up -d
```

### Inviting the Bot

When inviting the bot to your server, ensure it has the following permissions:
- Send Messages
- Embed Links
- Manage Roles
- Manage Messages
- Kick Members
- Ban Members
- Mute Members
- View Channel
- Add Reactions

## Adding New Commands

1. Create a new file in `src/commands/`
2. Follow the structure of existing commands:
   ```javascript
   import { ApplicationCommandType } from 'discord.js';
   
   export default {
       name: 'commandname',
       description: 'Your command description',
       type: ApplicationCommandType.ChatInput,
       
       async execute(interaction) {
           // Your command logic here
       }
   };
   ```
3. The command will be automatically loaded on next bot restart

## Moderation Notes

- All moderation commands require appropriate permissions
- Actions are logged with timestamp and moderator information
- Reasons are required for all moderation actions
- The bot prevents self-moderation (cannot kick/ban/mute itself)
- Timeout-based mute is preferred over role-based mute
- Purge command can filter by specific user

## Technologies Used

- **discord.js** - Discord API wrapper for Node.js
- **Node.js** - JavaScript runtime
- **pnpm** - Package manager
- **Docker** - Containerization platform
- **GitHub Actions** - CI/CD pipeline
- **GitHub Packages** - Container registry

## License

This project is licensed under the GPLv3 License - see the [LICENSE file](https://github.com/The-A-P-O-L-L-O-Organization/Apollo-Discord-Bot/blob/main/LICENSE) for details.

## Links

- [GitHub Repository](https://github.com/The-A-P-O-L-L-O-Organization/Apollo-Discord-Bot)

> A.P.O.L.L.O Discord Bot is maintained by [The-A-P-O-L-L-O-Organization](https://github.com/The-A-P-O-L-L-O-Organization).
