---
sidebar_position: 2
---

# User Guide

This guide covers how to use A.P.O.L.L.O commands in your Discord server.

## Permissions and Roles

A.P.O.L.L.O recognizes different user roles with varying permission levels:

- **Bot Owner** — Full access to all commands, including sensitive system operations
- **Everyone** — Access to utility commands like polls, info commands, and general tools
- **Administrators** — Full server management capabilities, moderation, and ticket system
- **Server Staff** — Moderation capabilities and ticket management without system-level access

## Command Categories

A.P.O.L.L.O commands are organized into logical groups to help you find what you need:

- **Nova Subsystem** — Voice channel management and navigation
- **Utility Commands** — General-purpose tools for information and interaction
- **Moderation Commands** — User management and server safety
- **Ticket System** — Support ticket creation and management
- **Admin Commands** — Server configuration and system management

## Nova Subsystem

### /navi

Summons the Nova navigation interface for voice channel management.

- **Description** — Displays an interactive interface to manage voice channel settings and user navigation

## Utility Commands

### /ping

Check the bot's response time and latency.

- **Response** — Shows bot latency in milliseconds

### /apollo

Get information about The A.P.O.L.L.O Organization and documentation.

#### /apollo info

Display information about The A.P.O.L.L.O Organization.

- **Response** — Shows organization purpose, mission, and links to GitHub and documentation

#### /apollo docs

Get the link to Apollo Organization documentation.

- **Response** — Shows a direct link to the Apollo Org Docs website

### /user

Display information about a user profile.

- **User** — The user to look up
- **Response** — Shows user ID, account creation date, and join date

### /server

Get detailed information about the current server.

- **Response** — Shows server statistics, member count, creation date, and owner information

### /roll

Roll dice with custom notation.

- **Notation** — Dice notation (e.g., `2d6+3`)
- **Response** — Shows individual rolls and total

### /flip

Flip a coin for random decision-making.

- **Response** — Heads or Tails with emoji

### /8ball

Consult the magic 8-ball for answers.

- **Question** — Your yes/no question
- **Response** — Random mystical answer

### /poll

Create an interactive poll with multiple options.

- **Question** — The poll question
- **Options** — Comma-separated list of voting options (up to 10)
- **Response** — Creates a message with reaction-based voting

### /remind

Set a reminder for a specific time.

- **Duration** — How long to wait (e.g., `1h`, `30m`)
- **Message** — What to remind you about

### /weather

Get current weather information.

- **Location** — City name or coordinates
- **Response** — Shows temperature, conditions, and forecast

### /define

Look up word definitions.

- **Word** — The word to define
- **Response** — Shows definition and usage examples

### /translate

Translate text between languages.

- **Text** — The text to translate
- **From** — Source language
- **To** — Target language

### /meme

Pull a random meme from the internet.

- **Response** — Shows a random meme image

### /cat

Get a random cat image.

- **Response** — Displays a cute cat photo

### /dog

Get a random dog image.

- **Response** — Displays an adorable dog photo

### /fact

Learn a random interesting fact.

- **Response** — Shows a fact about nature, science, or history

### /quote

Get an inspiring or thoughtful quote.

- **Response** — Displays a random quote with author

### /horoscope

Check your daily horoscope.

- **Zodiac Sign** — Your astrological sign
- **Response** — Today's horoscope reading

### /advice

Get random life advice.

- **Response** — Shows helpful or humorous advice

### /joke

Hear a random joke.

- **Response** — Delivers a programming or general joke

### /status

Check if a website is up or down.

- **URL** — The website to check
- **Response** — Shows current status and response time

### /stats

View bot statistics and usage information.

- **Response** — Shows uptime, commands run, servers, and member count

## Moderation Commands

### /kick

Remove a member from the server.

- **User** — The member to kick
- **Reason** — Why they were kicked (optional)
- **Response** — Confirmation and audit log entry

### /ban

Permanently ban a member from the server.

- **User** — The member to ban
- **Reason** — Why they were banned (optional)
- **Delete Days** — Messages to delete (0-7 days)

### /unban

Remove a ban on a member.

- **User ID** — The banned user's ID
- **Reason** — Why the ban was removed (optional)

### /mute

Silence a member temporarily.

- **User** — The member to mute
- **Duration** — How long to mute (e.g., `1h`, `1d`)
- **Reason** — Why they were muted (optional)

### /unmute

Remove a mute from a member.

- **User** — The muted member
- **Reason** — Why the mute was removed (optional)

### /warn

Issue a warning to a member for rule violations.

- **User** — The member to warn
- **Reason** — The violation reason
- **Response** — Tracks the warning; automatic actions at thresholds

### /clearwarns

Remove warnings from a member.

- **User** — The member
- **Count** — Number of warnings to clear
- **Response** — Confirmation and updated warning count

### /warnings

Check how many warnings a member has.

- **User** — The member to look up
- **Response** — Shows warning history and timestamps

### /lock

Prevent members from sending messages in a channel.

- **Channel** — Channel to lock (optional, uses current)
- **Duration** — How long to lock (optional)

### /unlock

Re-enable messaging in a locked channel.

- **Channel** — Channel to unlock (optional, uses current)

### /slowmode

Enable slow mode to prevent spam in a channel.

- **Channel** — Target channel (optional, uses current)
- **Delay** — Seconds between messages (0-21600)

## Warning Thresholds and Automatic Actions

| Warnings | Action |
|----------|--------|
| 1 | No action, logged |
| 2 | Automatic mute (1 hour) |
| 3 | Automatic mute (6 hours) |
| 4 | Automatic mute (24 hours) |
| 5+ | Automatic ban |

## Ticket System

### /ticket create

Open a new support ticket.

- **Response** — Creates a private channel for your issue

### /ticket close

Close your ticket when resolved.

- **Response** — Archives the ticket and notifies staff

### /ticket add

Add a member to your ticket.

- **User** — The member to add
- **Response** — Grants them access to the ticket channel

### /ticket remove

Remove a member from your ticket.

- **User** — The member to remove
- **Response** — Revokes their access

### /ticket transcript

Get a transcript of the ticket conversation.

- **Response** — Saves a transcript file

## Admin Commands

### /system

Manage A.P.O.L.L.O system settings.

- **Setting** — The configuration option to change
- **Value** — New value for the setting
- **Response** — Confirmation of update

### /queue

Manage command execution queue settings.

- **Priority** — Queue priority level
- **Timeout** — Command timeout duration

### /migrate

Migrate server data to new structures.

- **Response** — Shows migration status and progress

### /plugin

Manage installed plugins and extensions.

- **Subcommands:**
  - `list` — Show all installed plugins
  - `enable <name>` — Enable a plugin
  - `disable <name>` — Disable a plugin
  - `config <name>` — Configure a plugin

## Common Workflows

### Create a Poll

To gather opinions from your server members:

```
/poll question:"What's our favorite game?" options:"Valorant, Minecraft, CS2, Among Us"
```

Members click the reactions to vote. Results are tallied automatically.

### Issue a Warning and Track

To warn a member for spam:

```
/warn user:@SpamBot reason:"Spamming in general chat"
```

Check their warning count anytime:

```
/warnings user:@SpamBot
```

The system automatically enforces consequences at 2, 3, 4, and 5 warnings.

### Manage Moderation

Escalate from warnings to mute to ban:

```
/mute user:@TrollingMember duration:1h reason:"Abusive language"
```

If behavior continues:

```
/ban user:@TrollingMember reason:"Continued harassment after warning and mute"
```

### Set Up Tickets

Members create support tickets:

```
/ticket create
```

Staff adds themselves if needed:

```
/ticket add user:@SupportStaff
```

Once resolved:

```
/ticket close
```

## Tips and Best Practices

- **Use descriptive reasons** — Always provide clear reasons for moderation actions; it helps staff review decisions later
- **Leverage the warning system** — Give members multiple chances before bans; three warnings is usually fair
- **Keep channels organized** — Use `/lock` and `/unlock` to control channel activity during announcements or sensitive discussions
- **Monitor polls** — Check poll results in real-time to gauge server sentiment and guide decisions
- **Review ticket transcripts** — Save transcripts of important support interactions for documentation and training purposes

## Frequently Asked Questions

**Q: Can I customize the poll emoji reactions?**

A: A.P.O.L.L.O uses default emoji reactions (1️⃣, 2️⃣, etc.). Custom emoji reactions are not currently supported, but you can use `/poll` with up to 10 text options.

**Q: How do I make announcements visible to everyone?**

A: Create your message in a dedicated #announcements channel and use `/lock` to prevent replies, then unlock afterward. Alternatively, post without the lock — members can still see it in the channel history.

**Q: What happens if a member reaches 5 warnings?**

A: The system automatically bans them. This can be overridden with `/unban` if you believe the ban was a mistake. Review the warning history with `/warnings` before unbanning.
