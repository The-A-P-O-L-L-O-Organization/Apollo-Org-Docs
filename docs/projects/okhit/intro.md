---
sidebar_position: 1
---

# Getting Started

Your guide to setting up Okhit Discord Archive Bot

## What is Okhit

Okhit is a Discord archive bot designed for archiving public roleplay actions and conversations into structured `.txt` files. Built for geopolitical analysis and roleplay communities, Okhit transforms your Discord conversations into organized, timestamped archives that are easy to parse and analyze.

The bot exports Discord messages with metadata including timestamps, usernames, and attachment URLs in a clean, readable format. This makes it ideal for campaigns, historical record-keeping, content backup, and post-event analysis. Whether you're running a long-form roleplay campaign or need to preserve important discussion threads, Okhit handles the archiving workflow seamlessly.

## Key Features

- **Single and Batch Archiving** - Archive one channel or combine multiple channels into a single file
- **Thread & Forum Support** - Archive Discord threads and forum posts with full thread hierarchy
- **User Filtering** - Extract messages from specific users for targeted analysis
- **Reply Threading** - Optionally include reply threads in your archives for complete context
- **Progress Tracking** - Real-time updates during archiving for large operations
- **Configurable Limits** - Archive from 1 to 2,000 messages per operation
- **Structured Output** - Timestamps, usernames, and attachment URLs in consistent format
- **Channel Whitelisting** - Restrict archiving to specific channels via environment configuration

## Use Cases

**Campaign Archiving** - Archive roleplay campaigns chapter by chapter, preserving the narrative for future reference and analysis.

**Historical Record Keeping** - Maintain an organized archive of important community decisions, discussions, and events for institutional memory.

**Content Backup** - Create backups of valuable Discord discussions before channels are deleted or communities evolve.

**Analysis and Research** - Export conversations for linguistic analysis, pattern recognition, or historical research with clean, parseable output.

## Requirements

- **Node.js** 16 or higher
- **pnpm** or npm for dependency management
- **Discord Bot Token** from the Discord Developer Portal
- **Docker** (optional, for containerized deployment)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/okhit.git
cd okhit
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_server_id_here
CHANNEL_IDS=channel1_id,channel2_id
ARCHIVE_OUTPUT_DIR=./archives
```

### 4. Deploy Commands

Register slash commands with Discord:

```bash
pnpm run deploy
```

### 5. Start the Bot

```bash
pnpm start
```

Your bot should now be online and ready to receive archive commands.

## Configuration

Configure Okhit using environment variables in your `.env` file:

| Variable | Description | Example |
|----------|-------------|---------|
| `DISCORD_TOKEN` | Your bot's authentication token | `ODk3NZIJ...` |
| `CLIENT_ID` | Your bot's client ID | `897654321...` |
| `GUILD_ID` | Your Discord server ID | `123456789...` |
| `CHANNEL_IDS` | Comma-separated list of allowed channel IDs | `123,456,789` |
| `ARCHIVE_OUTPUT_DIR` | Directory for archive files | `./archives` |

**CHANNEL_IDS** restricts which channels can be archived. If empty, only the bot owner can use archive commands. Leave it empty for development and add specific channel IDs for production.

## Output Format

Okhit archives messages in a clean, timestamped format designed for easy parsing and analysis:

```
[YYYY-MM-DD HH:mm] [ChannelName] [AuthorName]: Message content [Attachment(s): url(s)]
```

### Example Archive

```
[2025-04-20 14:30] [roleplay] Alice: *carefully approaches the ancient door*
[2025-04-20 14:31] [roleplay] Bob: *blocks the passage* Hold up, let's scout first.
[2025-04-20 14:32] [roleplay] Narrator: The air grows cold. You hear whispers...
[2025-04-20 14:35] [roleplay] Alice: I cast detect magic [Attachment(s): https://imgur.com/spell.png]
[2025-04-20 14:36] [narrator-log] Narrator: Session ended after 2 hours of gameplay
```

Each line contains a complete message with:
- **Timestamp** in `[YYYY-MM-DD HH:mm]` format (UTC)
- **Channel name** for context
- **Author username**
- **Message content** as posted
- **Attachment URLs** if the message contained files

This format preserves all essential information while remaining human-readable and easy to import into analysis tools.
