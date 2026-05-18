---
sidebar_position: 3
---

# Developer Guide

Guide for developers contributing to or extending Okhit

## Architecture Overview

Okhit is a lightweight Discord bot built on Discord.js with a simple, modular architecture. The bot listens for slash command interactions and routes them to appropriate handlers.

**Core Components:**

- **index.js** - Main bot entry point, initializes Discord client and event handlers
- **deploy-commands.js** - Registers slash commands with Discord's API
- **Command Handlers** - Separate logic for `/archive` and `/help` commands
- **Message Fetching** - Retrieves messages from channels, threads, and forums
- **File Generation** - Formats and writes messages to `.txt` files
- **Event System** - Listens for interactions and routes them appropriately

The bot follows a single-responsibility principle: each component handles one specific task, making the code easy to understand and extend.

## Development Setup

### Prerequisites

- **Node.js** 16.0.0 or higher (check with `node --version`)
- **pnpm** 7.0.0 or higher (install globally with `npm install -g pnpm`)
- **A Discord Server** for testing
- **Discord Bot Token** from the [Discord Developer Portal](https://discord.com/developers/applications)

### Clone and Install

```bash
git clone https://github.com/your-org/okhit.git
cd okhit
pnpm install
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_bot_client_id
GUILD_ID=your_test_server_id
CHANNEL_IDS=
ARCHIVE_OUTPUT_DIR=./archives
```

**Getting these values:**

1. **DISCORD_TOKEN** - Go to Discord Developer Portal → Your Application → Bot → Token (copy it)
2. **CLIENT_ID** - Found on the General Information tab
3. **GUILD_ID** - Enable Developer Mode in Discord, right-click your test server, click "Copy Server ID"
4. **CHANNEL_IDS** - Leave empty for development; the bot owner can always use commands
5. **ARCHIVE_OUTPUT_DIR** - Directory where temporary archives are created before upload

### Deploy Commands

Register slash commands with Discord:

```bash
pnpm run deploy
```

This makes `/archive` and `/help` available in your test server. Run this after changing command definitions.

### Running Locally

Start the bot in development mode:

```bash
pnpm start
```

The bot logs into Discord and begins listening for commands. You'll see console output showing:
- `Ready! Logged in as [BotName]`
- Command interactions as they arrive
- Archive progress updates
- Any errors or warnings

### Docker Setup

Build the Docker image:

```bash
docker build -t okhit .
```

Run in a container:

```bash
docker run --env-file .env -v $(pwd)/archives:/app/archives okhit
```

The `-v` flag mounts the archives directory so files persist outside the container.

## Project Structure

```
okhit/
├── index.js                 # Main bot file
├── deploy-commands.js       # Command registration script
├── .env                     # Environment variables (not in git)
├── .env.example            # Example environment template
├── package.json            # Dependencies and scripts
├── Dockerfile              # Container configuration
├── .dockerignore           # Files to exclude from Docker
├── .gitignore              # Files to exclude from git
├── archives/               # Output directory for exports (created at runtime)
└── README.md               # Project documentation
```

**Key files:**

- **index.js** - ~200-300 lines, contains all bot logic
- **deploy-commands.js** - ~50-100 lines, registers commands once
- **.env** - Configuration; never commit this file
- **package.json** - Specifies `discord.js` and `dotenv` dependencies

## Understanding the Code

### interactionCreate Event Handler

The main event listener in `index.js`:

```javascript
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return
  
  if (interaction.commandName === 'archive') {
    await handleArchiveCommand(interaction)
  } else if (interaction.commandName === 'help') {
    await handleHelpCommand(interaction)
  }
})
```

This routes slash commands to their handlers. Any new command would be added here.

### handleArchiveCommand Function Flow

The archive command follows this sequence:

1. **Validate Input** - Check that required parameters are provided
2. **Defer Response** - Tell Discord "I'm working on this" (needed for long operations)
3. **Fetch Messages** - Retrieve messages from specified channel(s)
4. **Format Messages** - Convert Discord message objects to archive format
5. **Write File** - Create a `.txt` file with formatted messages
6. **Upload to Discord** - Send the file as a message attachment
7. **Cleanup** - Delete the temporary local file
8. **Confirm** - Reply to the user with success confirmation

**Example pseudocode:**

```javascript
async function handleArchiveCommand(interaction) {
  // 1. Validate
  const sourceChannel = interaction.options.getChannel('source_channel')
  const messageLimit = interaction.options.getInteger('message_limit')
  const exportName = interaction.options.getString('export_name')
  
  if (!sourceChannel && !sourceChannels) {
    return interaction.reply('Specify a channel!')
  }
  
  // 2. Defer (tells Discord to wait for our response)
  await interaction.deferReply()
  
  // 3. Fetch messages
  const messages = await sourceChannel.messages.fetch({ limit: messageLimit })
  
  // 4. Format
  const formatted = messages.map(msg => 
    `[${timestamp}] [${channel}] [${author}]: ${content}`
  )
  
  // 5. Write file
  fs.writeFileSync(`${exportName}.txt`, formatted.join('\n'))
  
  // 6. Upload
  await interaction.editReply({
    files: [`${exportName}.txt`]
  })
  
  // 7. Cleanup
  fs.unlinkSync(`${exportName}.txt`)
  
  // 8. Confirm
  await interaction.followUp('Archive created!')
}
```

### handleHelpCommand Function

A simpler command that displays available commands:

```javascript
async function handleHelpCommand(interaction) {
  const helpEmbed = new EmbedBuilder()
    .setTitle('Okhit Commands')
    .addFields(
      { name: '/archive', value: 'Archive messages from channels' },
      { name: '/help', value: 'Show this help message' }
    )
  
  await interaction.reply({ embeds: [helpEmbed] })
}
```

### Message Fetching Process

Discord.js provides several methods to fetch messages:

```javascript
// Fetch from a channel
const messages = await channel.messages.fetch({ limit: 100 })

// Fetch from a thread
const messages = await thread.messages.fetch({ limit: 100 })

// Fetch from a forum post (which is a thread)
const messages = await forumPost.messages.fetch({ limit: 100 })
```

All return a Collection of Message objects that can be iterated:

```javascript
messages.forEach(msg => {
  const timestamp = msg.createdTimestamp
  const author = msg.author.displayName
  const content = msg.content
  // ... process message
})
```

### File Writing and Cleanup

Using Node.js `fs` module:

```javascript
const fs = require('fs')

// Write file
fs.writeFileSync(filePath, content)

// Upload to Discord
await interaction.editReply({
  files: [filePath]
})

// Delete file
fs.unlinkSync(filePath)
```

For large files, use `fs.createWriteStream()` to avoid memory issues:

```javascript
const stream = fs.createWriteStream(filePath)

messages.forEach(msg => {
  stream.write(`[${timestamp}] [${channel}] [${author}]: ${content}\n`)
})

stream.end()

// Wait for stream to finish
await new Promise((resolve, reject) => {
  stream.on('finish', resolve)
  stream.on('error', reject)
})
```

## Key Functions

### Archive Single Channel Logic

```javascript
async function archiveSingleChannel(channel, limit, filter, includeReplies) {
  // Fetch messages
  const messages = await channel.messages.fetch({ limit })
  
  // Filter by user if specified
  let filtered = messages
  if (filter) {
    filtered = messages.filter(msg => msg.author.id === filter.id)
  }
  
  // Format each message
  const lines = filtered.map(msg => formatMessage(msg, channel.name))
  
  return lines.join('\n')
}

function formatMessage(msg, channelName) {
  const timestamp = msg.createdAt.toISOString().slice(0, 16).replace('T', ' ')
  const author = msg.author.displayName
  const content = msg.content
  const attachments = msg.attachments.size > 0
    ? ` [Attachment(s): ${msg.attachments.map(a => a.url).join(', ')}]`
    : ''
  
  return `[${timestamp}] [${channelName}] [${author}]: ${content}${attachments}`
}
```

### Archive Multiple Channels Logic

```javascript
async function archiveMultipleChannels(channels, limit, filter, includeReplies) {
  const allMessages = []
  
  // Fetch from each channel
  for (const channel of channels) {
    const messages = await channel.messages.fetch({ limit })
    allMessages.push(...messages)
  }
  
  // Sort by timestamp
  allMessages.sort((a, b) => a.createdTimestamp - b.createdTimestamp)
  
  // Filter and format
  const lines = allMessages
    .filter(msg => !filter || msg.author.id === filter.id)
    .map(msg => formatMessage(msg, msg.channel.name))
  
  return lines.join('\n')
}
```

### Message Filtering

```javascript
function filterByUser(messages, userId) {
  return messages.filter(msg => msg.author.id === userId)
}

function includeReplies(messages) {
  // If messages are in threads, include the thread context
  return messages.map(msg => ({
    message: msg,
    thread: msg.channel.isThread() ? msg.channel : null
  }))
}
```

### Thread Handling

```javascript
async function archiveThread(thread, limit, filter) {
  // Threads have a messages property just like channels
  const messages = await thread.messages.fetch({ limit })
  
  return messages
    .filter(msg => !filter || msg.author.id === filter.id)
    .map(msg => formatMessage(msg, `${thread.parent.name} → ${thread.name}`))
    .join('\n')
}
```

### Forum Thread Discovery

```javascript
async function archiveForumChannel(forum, limit, filter) {
  // Get all archived and active threads in the forum
  const threads = await forum.threads.fetch({ archived: null })
  
  let allMessages = []
  
  for (const thread of threads.values()) {
    const messages = await thread.messages.fetch({ limit })
    allMessages.push(...messages)
  }
  
  // Sort by timestamp
  allMessages.sort((a, b) => a.createdTimestamp - b.createdTimestamp)
  
  return allMessages
    .filter(msg => !filter || msg.author.id === filter.id)
    .map(msg => formatMessage(msg, `${forum.name} → ${msg.channel.name}`))
    .join('\n')
}
```

### File Generation

```javascript
async function generateArchiveFile(content, exportName) {
  const filePath = path.join(process.env.ARCHIVE_OUTPUT_DIR, `${exportName}.txt`)
  
  // Ensure output directory exists
  if (!fs.existsSync(process.env.ARCHIVE_OUTPUT_DIR)) {
    fs.mkdirSync(process.env.ARCHIVE_OUTPUT_DIR, { recursive: true })
  }
  
  // Write content to file
  fs.writeFileSync(filePath, content, 'utf8')
  
  return filePath
}
```

## Adding Features

### Adding a New Command

1. **Define the command** in `deploy-commands.js`:

```javascript
{
  name: 'export',
  description: 'Export archives in a specific format',
  options: [
    {
      name: 'format',
      type: 3,
      description: 'json or csv',
      required: true
    }
  ]
}
```

2. **Add the handler** in `index.js`:

```javascript
client.on('interactionCreate', async (interaction) => {
  if (interaction.commandName === 'export') {
    await handleExportCommand(interaction)
  }
})

async function handleExportCommand(interaction) {
  const format = interaction.options.getString('format')
  // ... implementation
}
```

3. **Deploy** the commands:

```bash
pnpm run deploy
```

### Extending Message Filtering

Add a new filter parameter:

```javascript
// In command definition
{
  name: 'filter_contains',
  type: 3,
  description: 'Only include messages containing this text',
  required: false
}

// In handler
const filterText = interaction.options.getString('filter_contains')

const filtered = messages.filter(msg => 
  !filterText || msg.content.includes(filterText)
)
```

### Customizing Output Format

Modify the `formatMessage` function:

```javascript
function formatMessage(msg, channelName) {
  // Current format
  const timestamp = msg.createdAt.toISOString().slice(0, 16).replace('T', ' ')
  const author = msg.author.displayName
  const content = msg.content
  
  // Add custom fields
  const edited = msg.editedAt ? ` (edited)` : ''
  const reactions = msg.reactions.cache.size > 0 
    ? ` [Reactions: ${msg.reactions.cache.map(r => r.emoji.name).join(', ')}]`
    : ''
  
  return `[${timestamp}] [${channelName}] [${author}]${edited}: ${content}${reactions}`
}
```

### Adding New Data Fields

Include message metadata in archives:

```javascript
function formatMessageWithMetadata(msg, channelName) {
  const base = formatMessage(msg, channelName)
  
  const metadata = [
    `| ID: ${msg.id}`,
    `| URL: ${msg.url}`,
    `| Reactions: ${msg.reactions.cache.size}`,
    `| Replies: ${msg.thread?.messageCount || 0}`
  ]
  
  return base + '\n' + metadata.join('\n')
}
```

## Testing

### How to Test Locally

1. Create a test server on Discord
2. Add the bot to your test server (with all permissions)
3. Create test channels: #test-archive, #test-forum, etc.
4. Post test messages
5. Run `/archive source_channel: #test-archive message_limit: 10 export_name: test`
6. Verify the output format and file content

### Creating Test Scenarios

**Scenario 1: Simple archive**
- Create #test-channel
- Post 5-10 messages
- Run `/archive` with limit 10
- Verify all messages appear in order

**Scenario 2: User filtering**
- Post as multiple users in #test-channel
- Run `/archive` with `filter_user: @YourName`
- Verify only your messages appear

**Scenario 3: Multi-channel**
- Create #test-1, #test-2, #test-3
- Post messages in each
- Run `/archive source_channels: #test-1,#test-2,#test-3 message_limit: 5 export_name: multi`
- Verify messages from all channels appear chronologically

**Scenario 4: Forum archiving**
- Create a forum channel
- Create 2-3 forum threads with messages
- Run `/archive source_channel: [Forum] message_limit: 20 export_name: forum-test`
- Verify all threads appear with proper formatting

### Debugging Tips

**Enable verbose logging:**

```javascript
// In index.js, after client initialization
client.on('debug', info => console.log(`[DEBUG] ${info}`))
client.on('warn', info => console.log(`[WARN] ${info}`))
```

**Log message processing:**

```javascript
messages.forEach(msg => {
  console.log(`Processing: ${msg.author.displayName} - "${msg.content.slice(0, 50)}"`)
})
```

**Check permissions:**

```javascript
const permissions = interaction.member.permissions
console.log(`User has: ${permissions.bitfield}`)

// Verify bot can access channel
if (!interaction.guild.members.me.permissionIn(channel).has('ViewChannel')) {
  console.log('Bot cannot access this channel!')
}
```

**Test file writing:**

```javascript
const testPath = path.join(process.env.ARCHIVE_OUTPUT_DIR, 'test.txt')
fs.writeFileSync(testPath, 'Test content')
console.log(`File created at: ${testPath}`)
console.log(`File exists: ${fs.existsSync(testPath)}`)
```

## Contributing

### Code Style

- Use 2-space indentation
- Use semicolons at the end of statements
- Use async/await for asynchronous operations
- Use `const` for variables that don't change, `let` for ones that do
- Use descriptive function names: `archiveChannel` not `archive`

### Commit Conventions

Use conventional commits:

```
feat: add export formats support
fix: handle missing channel permissions
refactor: simplify message formatting
docs: update README with examples
test: add forum archiving tests
```

### Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and test thoroughly
3. Commit with conventional commits
4. Push to your fork: `git push origin feature/your-feature`
5. Create a pull request with a clear description
6. Link any related issues
7. Wait for review before merging
