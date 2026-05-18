---
sidebar_position: 4
---

# Command Reference

Complete reference for all Okhit commands

## /archive Command

Archive messages from Discord channels, threads, or forums into a structured `.txt` file.

### Usage

**Single channel:**
```
/archive source_channel: [channel] message_limit: [0-2000] export_name: [filename]
```

**Multiple channels:**
```
/archive source_channels: [channel1,channel2,...] message_limit: [0-2000] export_name: [filename]
```

### Required Permissions

- **Bot**: Must have access to the channel and permission to read message history
- **User**: Can use if:
  - The channel is in the `CHANNEL_IDS` whitelist, OR
  - User is the bot owner

### Options

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `source_channel` | Channel/Thread | Conditional | — | Single channel, thread, or forum to archive (required if `source_channels` not provided) |
| `source_channels` | String | Conditional | — | Comma-separated channel names/IDs (required if `source_channel` not provided) |
| `message_limit` | Integer | No | 500 | Maximum messages to archive (0-2000) |
| `export_name` | String | Yes | — | Filename for export without extension |
| `filter_user` | User | No | — | Filter messages by specific user (only their messages appear) |
| `include_replies` | Boolean | No | No | Include reply threads in archive |

### Description

The archive command:
1. Fetches messages from specified channel(s)
2. Optionally filters by user
3. Optionally includes reply threads
4. Formats messages with timestamps, usernames, channel names, and attachment URLs
5. Creates a `.txt` file with the formatted archive
6. Uploads the file to Discord as an attachment
7. Cleans up temporary local files

**Supported channel types:**
- Text channels
- Private threads (if bot has access)
- Forum posts (which are threads)
- Nested threads

**Message format:**
```
[YYYY-MM-DD HH:mm] [ChannelName] [AuthorName]: Message content [Attachment(s): url(s)]
```

### Examples

#### Archive a single channel

Archive the last 1,000 messages from #roleplay:

```
/archive source_channel: #roleplay message_limit: 1000 export_name: campaign-log
```

This creates `campaign-log.txt` with timestamps, usernames, and exact message content.

#### Archive multiple channels

Combine messages from several channels into one file:

```
/archive source_channels: #log1,#log2,#log3 message_limit: 500 export_name: week1-archive
```

Messages from all three channels are merged chronologically. The channel name on each line shows which channel the message came from.

#### Archive with user filter

Extract only messages from a specific user:

```
/archive source_channel: #rp message_limit: 2000 export_name: narrator-only filter_user: @Narrator
```

Only messages from the mentioned user appear. Use this to:
- Extract narrator actions from roleplay
- Compile one character's dialogue
- Focus on a specific person's contributions

#### Archive including replies

Include threaded replies in the output:

```
/archive source_channel: #discussion export_name: full-discussion include_replies: yes
```

Both top-level messages and threaded replies appear, preserving conversation structure. Without this flag, only top-level messages are included.

#### Archive a forum channel

Archive all posts from a forum:

```
/archive source_channel: #announcements export_name: forum-complete message_limit: 2000
```

Okhit automatically discovers all threads within the forum (both archived and active) and includes them in the archive. Thread names appear in the channel column.

#### Archive a specific thread

Archive a particular thread:

```
/archive source_channel: #my-thread export_name: specific-thread message_limit: 500
```

Use the thread's name as the channel parameter. Only messages in that thread are included.

#### Archive and filter by content

Create an archive, then manually filter it:

```
/archive source_channel: #campaigns message_limit: 2000 export_name: full-log filter_user: @GM
```

Only the GM's messages appear, useful for reviewing narrative decisions and plot points.

### Output Format

Messages are formatted consistently for easy parsing:

**Standard format:**
```
[YYYY-MM-DD HH:mm] [ChannelName] [AuthorName]: Message content [Attachment(s): url(s)]
```

**Example output:**
```
[2025-04-20 14:30] [roleplay] Alice: *carefully approaches the ancient door*
[2025-04-20 14:31] [roleplay] Bob: *blocks the passage* Hold up, let's scout first.
[2025-04-20 14:32] [narrator-log] Narrator: The air grows cold. You hear whispers... [Attachment(s): https://imgur.com/map.png]
[2025-04-20 14:35] [roleplay] Alice: I cast detect magic
[2025-04-20 14:36] [narrator-log] Narrator: The runes glow with faint blue light.
```

**Format breakdown:**

- `[YYYY-MM-DD HH:mm]` - Timestamp in UTC (24-hour format)
  - Example: `[2025-04-20 14:30]` = April 20, 2025 at 2:30 PM UTC
  
- `[ChannelName]` - Name of the Discord channel where the message was posted
  - Text channels: `[roleplay]`
  - Threads: `[parent-channel → thread-name]`
  - Forum posts: `[forum-name → post-title]`
  
- `[AuthorName]` - Display name of the message author
  - Server nicknames take priority if set
  - Falls back to username
  - Preserves spaces and special characters
  
- `Message content` - Exact text of the message as posted
  - Markdown formatting is preserved
  - Emojis are included as text (e.g., `:smile:`)
  - Links are preserved
  
- `[Attachment(s): urls]` - Optional; only appears if message contained files
  - Multiple attachments are comma-separated
  - URLs point to Discord CDN and remain valid as long as messages exist
  - Example: `[Attachment(s): https://cdn.discordapp.com/attachments/123/456/image.jpg, https://cdn.discordapp.com/attachments/123/456/image2.jpg]`

### Notes

- **Channel restrictions** - Archives respect the `CHANNEL_IDS` environment variable whitelist
- **Forum archives** - Automatically discover and include all threads (archived and active)
- **Thread names** - Included in forum archives with `→` notation for clarity
- **Performance** - Large archives (2000 messages) may take 15-60 seconds depending on message size
- **Sequential processing** - One archive at a time; subsequent commands wait for previous ones to finish
- **Private threads** - Can be archived if the bot has access to the parent channel
- **Reply structure** - When included, replies are shown on separate lines with thread context

## /help Command

Display information about available Okhit commands.

### Usage

```
/help
```

### Description

Shows an embedded message with:
- List of available commands
- Brief descriptions of what each command does
- Basic usage information
- Links to full documentation

### Example

```
/help
```

**Output:**
```
Okhit Commands

/archive - Archive messages from Discord channels into .txt files
  Usage: /archive source_channel: [channel] message_limit: [0-2000] export_name: [name]

/help - Show this help message
  Displays information about available commands
```

## Output Format Reference

### Complete Format Specification

All archived messages follow this pattern:

```
[YYYY-MM-DD HH:mm] [ChannelName] [AuthorName]: Message content [Attachment(s): url(s)]
```

### Field Descriptions

**Timestamp** `[YYYY-MM-DD HH:mm]`
- Format: ISO 8601 date with 24-hour time, UTC timezone
- Year: 4 digits (e.g., 2025)
- Month: 2 digits, zero-padded (01-12)
- Day: 2 digits, zero-padded (01-31)
- Hour: 2 digits, zero-padded (00-23)
- Minute: 2 digits, zero-padded (00-59)
- Seconds are not included
- This format sorts naturally in text editors

**Channel Name** `[ChannelName]`
- Discord channel name (without # prefix)
- For threads: `ParentChannel → ThreadName`
- For forum posts: `ForumName → ThreadTitle`
- Names with spaces are preserved exactly

**Author Name** `[AuthorName]`
- User's display name in Discord
- Server nicknames take priority
- Falls back to username if nickname not set
- Special characters preserved

**Message Content**
- Exact text of the message
- Markdown formatting preserved (**, *, ``, etc.)
- Code blocks preserved with formatting
- Emojis included as text
- Links preserved

**Attachments** `[Attachment(s): url(s)]`
- Only appears if the message contained files
- Discord CDN URLs (cdn.discordapp.com)
- Multiple attachments comma-separated
- URLs are long but remain valid
- Attachment names are not included (only URLs)

### Example Outputs

**Simple message:**
```
[2025-04-20 14:30] [general] Alice: Hey everyone!
```

**Message with formatting:**
```
[2025-04-20 14:31] [announcements] Admin: **Important**: Please read the rules in #rules
```

**Message with code block:**
```
[2025-04-20 14:32] [development] Dev: Here's the fix:
```
(followed by the code block content)

**Message with attachment:**
```
[2025-04-20 14:33] [media] Alice: Check this out [Attachment(s): https://cdn.discordapp.com/attachments/123456789/987654321/image.jpg]
```

**Multiple attachments:**
```
[2025-04-20 14:34] [submissions] Bob: Here are my files [Attachment(s): https://cdn.discordapp.com/attachments/123/1/file1.pdf, https://cdn.discordapp.com/attachments/123/2/file2.docx]
```

**Thread message:**
```
[2025-04-20 14:35] [general → off-topic] Charlie: This is a reply in a thread
```

**Forum post:**
```
[2025-04-20 14:36] [announcements → Server Updates] Admin: New feature released!
```

### Special Cases

**Deleted messages:**
- If a message is deleted from Discord, it won't appear in new archives
- Existing archives are unaffected
- The archive is a snapshot at the time it was created

**Edited messages:**
- Archives show the current content, not the original
- Edit history is not preserved
- The archive captures the state at archiving time

**Embeds and rich content:**
- Only plain text content is archived
- Embedded images, videos, and rich formatting are not captured
- Only attachment URLs are included
- Embed titles/descriptions are not included

**Very long messages:**
- Messages are included in full, even if very long
- No truncation occurs
- Each line in the archive still represents one message

**Messages with newlines:**
- Newlines within a message are preserved
- The message appears on a single archive line but may wrap in viewers
- Code blocks and formatting are preserved

**Mention format:**
- `@Username` mentions are preserved as text
- Actual mention formatting depends on Discord parsing at archive time
- Role mentions and channel mentions appear as text

### Sorting and Organization

Archives maintain **chronological order** by message timestamp:
- Newest messages at the bottom
- Oldest messages at the top
- Timestamps are in UTC
- Sorting works correctly when done alphabetically on timestamps
- All messages from all channels are merged by timestamp when archiving multiple channels
