---
sidebar_position: 2
---

# User Guide

Complete guide to using Okhit for archiving Discord content

## Setup & Permissions

### Bot Permissions

Okhit requires the following Discord permissions to function properly:

- **Read Messages/View Channels** - Access to channels you want to archive
- **Read Message History** - Retrieve historical messages from channels
- **Send Messages** - Post status updates and confirmations
- **Attach Files** - Upload archived `.txt` files to Discord
- **Manage Messages** - Clean up temporary files after upload (if enabled)

When adding the bot to your server, ensure these permissions are granted through the OAuth2 scope selection.

### Channel Restrictions

The `CHANNEL_IDS` environment variable controls which channels can be archived:

- **Empty/not set** - Only the bot owner can use archive commands (development mode)
- **Specific IDs** - Only listed channels can be archived; others will be blocked
- **Comma-separated** - Add multiple channel IDs: `123,456,789`

Channel IDs can be found by enabling Developer Mode in Discord and right-clicking channels.

### Who Can Use Commands

By default:
- **Bot Owner** - Can always use archive commands regardless of `CHANNEL_IDS`
- **Whitelisted Channels** - Anyone in these channels can use `/archive`
- **Outside Whitelist** - Users in other channels cannot execute archiving

No role-based restrictions are enforced — access is controlled at the channel level.

## Core Concepts

### What Archiving Does

When you run `/archive`, Okhit:
1. Connects to the specified channel(s)
2. Fetches the most recent messages (up to your limit)
3. Formats each message with timestamp, username, and content
4. Creates a `.txt` file with the archive
5. Uploads the file to Discord
6. Cleans up temporary local files

The original messages remain in Discord unchanged. Archiving is non-destructive and creates a snapshot at the time you run the command.

### Message Format and Timestamps

Each message in an archive appears on its own line:

```
[YYYY-MM-DD HH:mm] [ChannelName] [AuthorName]: Message content [Attachment(s): urls]
```

- **Timestamps** are in UTC and use 24-hour format
- **Channel names** are the Discord channel name (not ID)
- **Author names** are the user's display name at archive time
- **Content** is the exact message text
- **Attachments** are listed as URLs if present

### Supported Channel Types

Okhit can archive:

- **Text Channels** - Standard Discord channels
- **Threads** - Thread conversations within channels
- **Forum Posts** - Forum channel posts (threads within forums)
- **Private Threads** - If the bot has access

Each channel type is treated the same way — the archive contains all messages in order.

### Archives vs. Real-Time

Archives are snapshots. They capture messages at the moment you run the command:

- **Static** - Future messages won't be added to existing archives
- **Historical** - Each archive includes only recent messages (up to your limit)
- **Isolated** - Multiple archives of the same channel are independent

If you want ongoing updates, run `/archive` periodically with the same `export_name` to create new dated files.

## Archive Command Guide

### Basic Syntax

The `/archive` command has two main variants:

**Single Channel:**
```
/archive source_channel: [channel] message_limit: [0-2000] export_name: [filename]
```

**Multiple Channels:**
```
/archive source_channels: [channel1,channel2,...] message_limit: [0-2000] export_name: [filename]
```

### Single Channel Archiving

Archive messages from one channel, thread, or forum:

```
/archive source_channel: #roleplay message_limit: 1000 export_name: campaign-log
```

This creates a file named `campaign-log.txt` containing up to 1,000 recent messages from the #roleplay channel.

**Tips:**
- Use a descriptive `export_name` that identifies the channel and date
- Higher `message_limit` means slower archiving but more complete records
- Threads and forums are specified the same way as regular channels

### Multiple Channel Archiving

Combine messages from several channels into one archive:

```
/archive source_channels: #log1,#log2,#log3 message_limit: 500 export_name: week1-archive
```

Messages from all three channels are merged chronologically into a single `week1-archive.txt` file. The channel name appears on each line, so you can see which messages came from which channel.

**Tips:**
- Separate channel names with commas (no spaces after commas)
- All channels are merged by timestamp
- Total message count is the limit × number of channels

### Message Limits and Filtering

The `message_limit` parameter controls how many recent messages to include:

- **0** - No messages (rarely useful)
- **1-500** - Typical for focused archives
- **501-1000** - Medium-length sessions or discussions
- **1001-2000** - Full days of conversation or long campaigns

Higher limits take longer to process. A 2,000-message archive from a single channel may take 10-30 seconds depending on message size and bot load.

### User Filtering

Extract messages from a specific user:

```
/archive source_channel: #rp message_limit: 2000 export_name: narrator-log filter_user: @Narrator
```

Only messages from the mentioned user are included. Other users' messages are skipped. Use this to:
- Extract narrator descriptions from roleplay channels
- Compile one character's actions
- Focus on a specific person's contributions

**Note:** The filter is applied after fetching, so `message_limit` still controls how many total messages are scanned.

### Including/Excluding Replies

By default, replies to messages are not included. Enable them with:

```
/archive source_channel: #discussion export_name: full-discussion include_replies: yes
```

This includes both top-level messages and threaded replies, preserving conversation structure. When disabled (`no` or omitted), only top-level messages appear.

### Output Filenames

The `export_name` parameter becomes the filename:

```
export_name: my-archive  →  my-archive.txt
```

**Guidelines:**
- Use lowercase letters, numbers, and hyphens
- Avoid special characters (slashes, quotes, asterisks)
- Keep names under 50 characters
- Include dates or context: `2025-04-20-campaign` instead of `archive`
- The `.txt` extension is added automatically

## Common Workflows

### Workflow 1: Archive a Single Channel

You want to save messages from #roleplay after a gaming session:

```
/archive source_channel: #roleplay message_limit: 500 export_name: 2025-04-20-session
```

This creates `2025-04-20-session.txt` with the 500 most recent messages from #roleplay, including timestamps and usernames.

### Workflow 2: Archive an Entire Forum

You want to save all posts from a forum with many threads:

```
/archive source_channel: [Forum Name] message_limit: 2000 export_name: forum-backup
```

Okhit automatically discovers and includes all threads within the forum, archiving them in chronological order.

### Workflow 3: Archive with User Filter

Extract only actions from the narrator in a roleplay channel:

```
/archive source_channel: #rp message_limit: 1000 export_name: narrative-log filter_user: @GM
```

Only the GM/narrator's messages appear in `narrative-log.txt`, useful for reviewing game decisions and plot progression.

### Workflow 4: Archive Multiple Channels

Combine logs from a multi-channel game session:

```
/archive source_channels: #action,#discussion,#narration message_limit: 800 export_name: session-complete
```

All messages from three channels are merged by timestamp, showing the full story of what happened across all channels.

### Workflow 5: Archive and Filter by Thread

Get just one specific conversation:

```
/archive source_channel: #thread-name message_limit: 200 export_name: specific-discussion
```

Use the thread's name as the channel parameter. Only messages in that thread are included.

### Workflow 6: Batch Processing Tips

Archiving multiple channels at once:

1. Use the same `message_limit` for consistency
2. Name files clearly: `session-01-action`, `session-01-discussion`
3. Archive high-activity channels more frequently
4. Test with a small `message_limit` first to verify format
5. Save archives to a versioned folder: `archives/2025-04/`

## Output Understanding

### Message Format Explanation

Each archived line follows this pattern:

```
[YYYY-MM-DD HH:mm] [ChannelName] [AuthorName]: Message content [Attachment(s): urls]
```

**Example breakdown:**
```
[2025-04-20 14:30] [roleplay] Alice: *carefully approaches the door*
```

- `[2025-04-20 14:30]` - April 20, 2025 at 2:30 PM (UTC)
- `[roleplay]` - Sent in the #roleplay channel
- `Alice` - Username of the sender
- `*carefully approaches the door*` - Exact message text
- (no attachments in this example)

### Timestamp Format

Timestamps are always UTC in `YYYY-MM-DD HH:mm` format:
- **YYYY** - 4-digit year
- **MM** - 2-digit month (01-12)
- **DD** - 2-digit day (01-31)
- **HH** - 2-digit hour (00-23, 24-hour format)
- **mm** - 2-digit minutes (00-59)

This format sorts naturally and is easy to parse with text tools.

### Author Names

Author names are the user's Discord display name at the time the message was archived:

- **Server nicknames** take priority if set
- **Username** is used if no nickname exists
- **Names with spaces** are preserved as-is
- **Special characters** are included exactly

### Attachment Handling

If a message contained files (images, documents, etc.), URLs appear at the end:

```
[2025-04-20 14:35] [roleplay] Alice: Check this out [Attachment(s): https://cdn.discordapp.com/image1.jpg, https://cdn.discordapp.com/image2.jpg]
```

Multiple attachments are comma-separated. Discord CDN URLs point to the actual files and remain valid as long as the messages exist in Discord.

### Thread Information

When archiving threads or including replies:

```
[2025-04-20 14:30] [#channel → thread-name] Alice: Starting a thread
[2025-04-20 14:31] [#channel → thread-name] Bob: Responding in thread
```

The `→` indicator shows the thread context. When `include_replies: no`, only top-level messages appear.

## Tips & Tricks

### Message Limits and Performance

- **Small archives (1-200 messages)** - Nearly instant
- **Medium archives (200-1000 messages)** - 5-15 seconds
- **Large archives (1000-2000 messages)** - 15-60 seconds depending on message complexity

Start with smaller limits and increase if needed.

### Forum Archiving Best Practices

Forums organize threads differently than regular channels. To archive forums effectively:

1. Use `source_channel: [Forum Name]` - Okhit auto-discovers all threads
2. Set `message_limit` high (1000-2000) to capture full threads
3. Archive periodically as new threads are created
4. Use descriptive names: `forum-backup-2025-04-20`

### Filtering for Specific Content

Combine parameters strategically:

- **User filter + message limit** - Get the last 500 messages, then keep only one user's
- **Multiple channels + message limit** - Balance coverage across channels evenly
- **Thread + replies** - Get complete discussion threads for analysis

### Naming Conventions for Exports

Use consistent naming to stay organized:

- **By date:** `2025-04-20-session`
- **By session:** `campaign-chapter-3`
- **By topic:** `combat-log-encounter-1`
- **By channel:** `roleplay-archive`, `discussion-archive`

Avoid generic names like `archive.txt` or `export.txt` — you'll get confused when you have multiple files.

### Handling Large Archives

For very large archives (2000+ messages across multiple channels):

1. Break into smaller batches: `session-part-1`, `session-part-2`
2. Use higher `message_limit` per batch (1500-2000)
3. Monitor archive upload time (should be under 5 minutes)
4. Consider running during off-peak hours to reduce server load
5. Store archives in dated folders for organization
