---
sidebar_position: 4
---

# Command Reference

Complete reference for all A.P.O.L.L.O commands.

## Nova Commands

### /navi

The primary Nova companion command for A.P.O.L.L.O. Use this to interact with Nova's core functionality.

**Usage:**
```
/navi [subcommand] [options]
```

**Required Permission:** None (basic user)

**Description:** Activates Nova, A.P.O.L.L.O's AI companion, for various tasks including information retrieval, analysis, and automation assistance.

**Example:**
```
/navi help
/navi search query:AI models
```

---

## Utility Commands

### /ping

Check the bot's response time and latency.

**Usage:**
```
/ping
```

**Options:** None

**Returns:** 
- Bot latency in milliseconds
- API response time

**Example:**
```
/ping
→ Pong! Latency: 150ms
```

### /help

Display available commands and help information.

**Usage:**
```
/help [command_name]
```

**Options:**
- `command_name` (optional): Specific command to get help for

**Returns:** Command list or specific command documentation

**Example:**
```
/help
/help ban
```

### /userinfo

Get detailed information about a Discord user.

**Usage:**
```
/userinfo [user]
```

**Options:**
- `user` (optional): Target user, defaults to command author

**Returns:**
- Username and discriminator
- User ID
- Account creation date
- Join date (if in server)
- Roles
- Status

**Example:**
```
/userinfo @username
/userinfo (self)
```

### /serverinfo

Get detailed information about the current server.

**Usage:**
```
/serverinfo
```

**Options:** None

**Returns:**
- Server name and ID
- Owner information
- Member count
- Channel count
- Role count
- Creation date
- Verification level

**Example:**
```
/serverinfo
→ Server: Apollo Hub | Members: 1,250 | Channels: 45
```

### /apollo

Get information about The A.P.O.L.L.O Organization and documentation.

#### /apollo info

Display information about The A.P.O.L.L.O Organization.

**Usage:**
```
/apollo info
```

**Required Permission:** Everyone

**Description:** Shows comprehensive information about The A.P.O.L.L.O Organization, including purpose, mission, GitHub organization link, and documentation link.

**Example:**
```
/apollo info
→ Displays embed with organization information, purpose, and links
```

#### /apollo docs

Get the direct link to Apollo Organization documentation.

**Usage:**
```
/apollo docs
```

**Required Permission:** Everyone

**Description:** Provides a quick link to the Apollo Organization documentation website.

**Example:**
```
/apollo docs
→ Posts embed with documentation link
```

### /avatar

Display a user's avatar image.

**Usage:**
```
/avatar [user]
```

**Options:**
- `user` (optional): Target user, defaults to command author

**Returns:** Avatar image with direct link

**Example:**
```
/avatar @username
/avatar (self)
```

### /banner

Display a user's banner image.

**Usage:**
```
/banner [user]
```

**Options:**
- `user` (optional): Target user, defaults to command author

**Returns:** Banner image with direct link

**Example:**
```
/banner @username
```

### /channelinfo

Get detailed information about a text channel.

**Usage:**
```
/channelinfo [channel]
```

**Options:**
- `channel` (optional): Target channel, defaults to current channel

**Returns:**
- Channel name and ID
- Topic
- Creation date
- Message count (approximate)
- Permissions summary

**Example:**
```
/channelinfo #announcements
/channelinfo (current)
```

### /roleinfo

Get detailed information about a server role.

**Usage:**
```
/roleinfo <role>
```

**Options:**
- `role` (required): Target role

**Returns:**
- Role name and ID
- Color
- Permissions (list)
- Member count with role
- Position in hierarchy

**Example:**
```
/roleinfo @Moderator
```

### /embed

Create and send a custom embed message.

**Usage:**
```
/embed [title] [description] [color]
```

**Options:**
- `title` (optional): Embed title
- `description` (optional): Embed description
- `color` (optional): Hex color code

**Returns:** Formatted embed message

**Example:**
```
/embed title:"Welcome" description:"Join our community" color:"#FF0000"
```

### /announcement

Create and broadcast an announcement to configured channels.

**Usage:**
```
/announcement <message> [channels]
```

**Options:**
- `message` (required): Announcement content
- `channels` (optional): Specific channels, defaults to all configured

**Returns:** Confirmation of announcement sent

**Example:**
```
/announcement "Server maintenance tomorrow at 2 AM"
```

### /poll

Create a poll with reaction options.

**Usage:**
```
/poll <question> [option1] [option2] [option3] [option4]
```

**Options:**
- `question` (required): Poll question
- `option1-4` (optional): Up to 4 poll options

**Returns:** Poll embed with reaction collectors

**Example:**
```
/poll "What should we stream next?" "Valorant" "League" "Elden Ring"
```

### /remind

Set a reminder for a future time.

**Usage:**
```
/remind <duration> <message>
```

**Options:**
- `duration` (required): Time (e.g., 1h, 30m, 2d)
- `message` (required): Reminder text

**Returns:** Confirmation with reminder time

**Example:**
```
/remind 1h "Team meeting at 3 PM"
/remind 30m "Check the announcements"
```

### /tag

Create or retrieve custom tags/quick responses.

**Usage:**
```
/tag [create|get|list|delete] [name] [content]
```

**Options:**
- `create`: Create a new tag
- `get`: Retrieve tag content
- `list`: List all available tags
- `delete`: Remove a tag

**Returns:** Tag content or confirmation

**Example:**
```
/tag create discord "Discord is a chat platform"
/tag get discord
/tag list
```

### /giveaway

Create a giveaway with automatic winner selection.

**Usage:**
```
/giveaway <duration> <winner_count> <prize> [requirements]
```

**Options:**
- `duration` (required): Giveaway duration
- `winner_count` (required): Number of winners
- `prize` (required): Prize description
- `requirements` (optional): Entry requirements

**Returns:** Giveaway embed with reaction collector

**Example:**
```
/giveaway 7d 3 "Steam Gift Card $50" "Must have role:Member"
```

### /report

Report a user or message to moderators.

**Usage:**
```
/report <target> <reason> [evidence]
```

**Options:**
- `target` (required): User or message to report
- `reason` (required): Report reason
- `evidence` (optional): Additional details

**Returns:** Confirmation, notifies moderation team

**Example:**
```
/report @username "Spamming" "Sent 5 messages in 10 seconds"
```

### /joke

Get a random joke from the joke database.

**Usage:**
```
/joke [category]
```

**Options:**
- `category` (optional): Joke category (general, programming, dark)

**Returns:** Random joke

**Example:**
```
/joke
/joke programming
```

### /roll

Roll dice or generate random numbers.

**Usage:**
```
/roll [dice] [range]
```

**Options:**
- `dice` (optional): Dice notation (e.g., 2d6, 1d20)
- `range` (optional): Number range (min-max)

**Returns:** Roll results and total

**Example:**
```
/roll 2d6
/roll 1-100
```

### /8ball

Get a Magic 8-Ball response.

**Usage:**
```
/8ball <question>
```

**Options:**
- `question` (required): Question to ask

**Returns:** Random 8-Ball response

**Example:**
```
/8ball "Will I pass my exam?"
→ It is certain.
```

### /invite

Generate a server invite or get invite information.

**Usage:**
```
/invite [max_uses] [max_age]
```

**Options:**
- `max_uses` (optional): Maximum uses (default: unlimited)
- `max_age` (optional): Expiration time (default: never)

**Returns:** Invite link or invite details

**Example:**
```
/invite
/invite max_uses:5 max_age:7d
```

### /leaderboard

Display server leaderboards (experience, messages, etc.).

**Usage:**
```
/leaderboard [type] [page]
```

**Options:**
- `type` (optional): Leaderboard type (xp, messages, activity)
- `page` (optional): Page number

**Returns:** Ranked leaderboard with user stats

**Example:**
```
/leaderboard xp
/leaderboard messages page:2
```

### /stats

Get personal or server statistics.

**Usage:**
```
/stats [user] [timeframe]
```

**Options:**
- `user` (optional): Target user, defaults to self
- `timeframe` (optional): Time period (week, month, all-time)

**Returns:** Statistics summary with charts

**Example:**
```
/stats
/stats @username month
```

---

## Moderation Commands

### /kick

Remove a user from the server.

**Usage:**
```
/kick <user> [reason]
```

**Options:**
- `user` (required): User to kick
- `reason` (optional): Kick reason

**Required Permission:** Kick Members

**Example:**
```
/kick @username "Disruptive behavior"
→ User kicked from server
```

**Notes:** User can rejoin via invite; logs recorded

### /ban

Ban a user from the server.

**Usage:**
```
/ban <user> [reason] [prune_days]
```

**Options:**
- `user` (required): User to ban
- `reason` (optional): Ban reason
- `prune_days` (optional): Days of messages to delete (0-7)

**Required Permission:** Ban Members

**Example:**
```
/ban @username "Spam" prune_days:7
→ User banned permanently
```

**Notes:** User cannot rejoin without unban

### /unban

Unban a previously banned user.

**Usage:**
```
/unban <user_id> [reason]
```

**Options:**
- `user_id` (required): ID of banned user
- `reason` (optional): Unban reason

**Required Permission:** Ban Members

**Example:**
```
/unban 123456789 "Appeal granted"
→ User unbanned
```

### /mute

Mute a user (prevent sending messages).

**Usage:**
```
/mute <user> <duration> [reason]
```

**Options:**
- `user` (required): User to mute
- `duration` (required): Mute duration (e.g., 1h, 1d)
- `reason` (optional): Mute reason

**Required Permission:** Moderate Members

**Example:**
```
/mute @username 1h "Spam warnings"
→ User muted for 1 hour
```

### /unmute

Remove mute from a user.

**Usage:**
```
/unmute <user> [reason]
```

**Options:**
- `user` (required): User to unmute
- `reason` (optional): Unmute reason

**Required Permission:** Moderate Members

**Example:**
```
/unmute @username
→ User unmuted
```

### /warn

Issue a warning to a user.

**Usage:**
```
/warn <user> <reason>
```

**Options:**
- `user` (required): User to warn
- `reason` (required): Warning reason

**Required Permission:** Moderate Members

**Example:**
```
/warn @username "Disrespectful language"
→ Warning issued (2/3)
```

**Notes:** Automatic actions after threshold warnings

### /warnings

Check warning history for a user.

**Usage:**
```
/warnings [user]
```

**Options:**
- `user` (optional): Target user, defaults to self

**Required Permission:** Moderate Members

**Returns:**
- Warning count
- Individual warning records
- Dates and reasons

**Example:**
```
/warnings @username
→ Total Warnings: 2
  1. "Spam" - 2 days ago
  2. "Offensive content" - 5 days ago
```

### /clear-warnings

Clear all or specific warnings for a user.

**Usage:**
```
/clear-warnings <user> [warning_id]
```

**Options:**
- `user` (required): Target user
- `warning_id` (optional): Specific warning to clear

**Required Permission:** Manage Messages

**Example:**
```
/clear-warnings @username
→ All warnings cleared for user
```

### /purge

Delete multiple messages from a channel.

**Usage:**
```
/purge <count> [filter]
```

**Options:**
- `count` (required): Number of messages to delete (1-100)
- `filter` (optional): Filter by user, bot, links, etc.

**Required Permission:** Manage Messages

**Example:**
```
/purge 50
/purge 30 filter:bot
/purge 20 user:@username
```

**Notes:** Only can delete messages within 14 days

### /nickname

Change a user's server nickname.

**Usage:**
```
/nickname <user> <nickname>
```

**Options:**
- `user` (required): Target user
- `nickname` (required): New nickname (max 32 characters)

**Required Permission:** Manage Nicknames

**Example:**
```
/nickname @username "Cool Guy"
→ Nickname updated
```

### /slowmode

Set message slowmode for a channel.

**Usage:**
```
/slowmode [duration]
```

**Options:**
- `duration` (optional): Slowmode duration (0 = off, max 21600s)

**Required Permission:** Manage Channels

**Example:**
```
/slowmode 5s
→ Slowmode set to 5 seconds
```

---

## Ticket Commands

### /ticket

Create a new support ticket.

**Usage:**
```
/ticket [category]
```

**Options:**
- `category` (optional): Ticket category

**Returns:** Private ticket channel created

**Actions:**
- Creates private channel
- Assigns ticket number
- Notifies support team

**Example:**
```
/ticket
/ticket "Account Issues"
```

### /ticket setup

Configure ticket system for the server.

**Usage:**
```
/ticket setup [category_channel] [support_role]
```

**Options:**
- `category_channel` (required): Category for ticket channels
- `support_role` (required): Role for support staff

**Required Permission:** Manage Guild

**Actions:**
- Configures ticket creation channel
- Sets up support role
- Enables ticket reactions

**Example:**
```
/ticket setup category:#tickets role:@Support
```

### /ticket close

Close a ticket and archive it.

**Usage:**
```
/ticket close [reason]
```

**Options:**
- `reason` (optional): Closure reason

**Actions:**
- Archives ticket transcript
- Removes channel
- Logs closure

**Example:**
```
/ticket close "Issue resolved"
```

### /ticket add

Add a user to an existing ticket.

**Usage:**
```
/ticket add <user>
```

**Options:**
- `user` (required): User to add

**Actions:**
- Grants user access to ticket
- Notifies added user

**Example:**
```
/ticket add @username
```

### /ticket remove

Remove a user from a ticket.

**Usage:**
```
/ticket remove <user>
```

**Options:**
- `user` (required): User to remove

**Actions:**
- Revokes user access
- Notifies removed user

**Example:**
```
/ticket remove @username
```

---

## Admin Commands

### /system

View and configure system settings.

**Usage:**
```
/system [setting] [value]
```

**Options:**
- `setting` (optional): Setting to view/configure
- `value` (optional): New value for setting

**Required Permission:** Administrator

**Returns:**

| Setting | Type | Purpose |
|---------|------|---------|
| prefix | string | Command prefix |
| language | enum | Server language |
| timezone | enum | Server timezone |
| log_channel | channel | Moderation logs |
| welcome_channel | channel | New member welcome |
| moderation_role | role | Moderator role |

**Example:**
```
/system
/system prefix "!"
/system log_channel #moderation-logs
```

### /queue

Manage the bot command queue and processing.

**Usage:**
```
/queue [view|clear|priority]
```

**Options:**
- `view`: Show current queue status
- `clear`: Clear pending commands
- `priority`: Set command priority

**Required Permission:** Administrator

**Returns:** Queue statistics and pending commands

**Example:**
```
/queue view
→ Queue Length: 23 | Processing: 2/5
```

### /migrate

Migrate settings from another bot.

**Usage:**
```
/migrate <source_bot> [options]
```

**Options:**
- `source_bot` (required): Bot to migrate from
- `options` (optional): What to migrate (roles, messages, settings)

**Required Permission:** Administrator

**Actions:**
- Transfers configurations
- Maps existing data
- Logs migration process

**Example:**
```
/migrate SourceBot roles,settings
```

### /plugin

Manage bot plugins and extensions.

**Usage:**
```
/plugin [subcommand] [options]
```

**Required Permission:** Administrator

**Subcommands:**

#### /plugin install

Install a plugin to the server.

**Usage:**
```
/plugin install <plugin_name> [version]
```

**Options:**
- `plugin_name` (required): Plugin identifier
- `version` (optional): Specific version

**Example:**
```
/plugin install level-system
/plugin install custom-commands v2.1.0
```

#### /plugin enable

Enable a disabled plugin.

**Usage:**
```
/plugin enable <plugin_name>
```

**Example:**
```
/plugin enable level-system
```

#### /plugin disable

Disable an active plugin.

**Usage:**
```
/plugin disable <plugin_name>
```

**Example:**
```
/plugin disable level-system
```

#### /plugin reload

Reload plugin configuration without restart.

**Usage:**
```
/plugin reload <plugin_name>
```

**Example:**
```
/plugin reload level-system
```

#### /plugin uninstall

Completely remove a plugin.

**Usage:**
```
/plugin uninstall <plugin_name>
```

**Example:**
```
/plugin uninstall level-system
```

#### /plugin search

Search available plugins in the repository.

**Usage:**
```
/plugin search [query]
```

**Options:**
- `query` (optional): Search term

**Returns:** List of matching plugins with descriptions

**Example:**
```
/plugin search moderation
→ Found 5 plugins
  - moderation-suite v3.2.1
  - auto-mod-pro v2.0.0
  - ...
```

#### /plugin update

Update a plugin to the latest version.

**Usage:**
```
/plugin update <plugin_name> [version]
```

**Example:**
```
/plugin update level-system
/plugin update custom-commands v2.5.0
```

---

## Related Topics

- [User Guide](./user-guide.md) - End-user documentation
- [Developer Guide](./developer-guide.md) - Development and custom commands
- [Introduction](./intro.md) - Apollo Bot overview
- [Configuration Guide](../configuration.md) - Server setup and configuration
