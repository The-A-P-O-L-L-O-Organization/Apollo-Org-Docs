# Nova Subsystem

> **Integrated into Apollo:** Nova is now a core subsystem of [A.P.O.L.L.O Discord Bot](./apollo/intro), integrated as a plugin. This page documents the Nova subsystem features available within Apollo.

Nova is a subsystem of the A.P.O.L.L.O Discord Bot that provides daily Na'vi word content via the [Reykunyu API](https://reykunyu.lu). It was originally a standalone Python/discord.py bot and was ported to a JavaScript plugin inside Apollo v2.

## Features

- **Daily Na'vi Word**: Automatically fetches and posts a random Na'vi word (with English translation) every day at 12:00 PM ET in a configured channel
- **Manual Trigger**: Owner-only `/navi` command to manually post the Na'vi word outside the scheduled time
- **Distributed Lock**: Uses Apollo's `withLock` pattern for safe multi-instance scheduling across gateway and workers
- **Graceful Fallback**: Daily scheduler waits 60s between checks, tracks last post date to avoid double-posting, and auto-disables if `NAVI_CHANNEL_ID` is not configured

## Commands

- **/navi** — Manually trigger a Na'vi word post (owner only)
  - Fetches from `https://reykunyu.lu/api/random?holpxay=1&fnel=n`
  - Posts a rich embed with Na'vi word and English translation to `NAVI_CHANNEL_ID`

## Configuration

Set `NAVI_CHANNEL_ID` in your environment variables to the Discord channel where daily Na'vi word embeds should be posted.

## History

Nova began as a standalone Python bot using discord.py with two commands (`/nova_embed`, `/trigger_navi`) and a daily scheduler using `pytz` and `asyncio.sleep`. In Apollo v2, the embed functionality was dropped as redundant (Apollo's `/embed` command already covers it), and the Na'vi word features were ported to Node.js as the `nova` plugin.

## Links

- [A.P.O.L.L.O Discord Bot](./apollo/intro)
- [Reykunyu API](https://reykunyu.lu)
- [Original Nova Repository](https://github.com/The-A-P-O-L-L-O-Organization/Nova-Discord-Bot)
