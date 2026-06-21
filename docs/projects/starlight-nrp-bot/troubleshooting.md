---
sidebar_position: 5
---

# Troubleshooting & FAQ

Common issues, solutions, and frequently asked questions for Starlight NRP Bot.

## Setup Issues

### Bot doesn't come online

**Symptoms:**
- Bot shows offline in Discord
- Bot process exits immediately

**Possible causes and solutions:**

1. **Invalid Discord token:**
   - Verify `DISCORD_TOKEN` in `.env` is correct
   - Tokens look like: `MTE5NzA4NzI4Mjk4NzQ3OTY4MA.GxYzZ_.xxxxxxxxxxxx`
   - Regenerate the token in Discord Developer Portal if needed

2. **Token not set:**
   - The bot validates on startup and exits if `DISCORD_TOKEN` is missing
   - Check that `.env` exists and has the variable set

3. **DNS / network issues:**
   - The bot has built-in retry logic for DNS failures (`EAI_AGAIN`, `ENOTFOUND`, `ECONNREFUSED`)
   - It retries login up to 3 times with exponential backoff
   - Check your network connection and DNS settings

4. **Missing intents:**
   - The bot requires `GatewayIntentBits.Guilds` (Server Members intent)
   - Verify this is enabled in Discord Developer Portal → Bot → Privileged Gateway Intents

### Slash commands not appearing

**Symptoms:**
- No commands show up when typing `/` in Discord
- Commands from previous version still show

**Solutions:**

1. **Register commands:**
   ```bash
   # Manual setup
   pnpm deploy

   # Docker setup
   docker compose run --rm bot pnpm deploy
   ```

2. **Wrong GUILD_ID:**
   - Verify `GUILD_ID` matches your Discord server ID
   - Enable Developer Mode in Discord → Right-click server → Copy ID

3. **Commands may take a few minutes** to appear after registration

4. **Discord cache:** Try restarting Discord or using Ctrl+R (Cmd+R on Mac)

### Database errors on startup

**Symptoms:**
- Error messages about database path or permissions
- `SQLITE_CANTOPEN` or similar errors

**Solutions:**

1. **Ensure the data directory exists:**
   ```bash
   mkdir -p data
   ```

2. **Check write permissions** on the `data/` directory

3. **Verify `DB_PATH`** in `.env` points to a valid location:
   - Default: `./data/starlight.db`
   - For Docker: `/app/data/starlight.db`
   - The parent directory must exist and be writable

4. **Docker volume mapping:**
   ```yaml
   volumes:
     - ./data:/app/data
   ```
   Ensure `./data` exists on the host.

### Docker build fails

**Symptoms:**
- `docker compose up -d` fails
- Build errors with native modules

**Solutions:**

1. **Check Docker is installed and running:**
   ```bash
   docker --version
   docker info
   ```

2. **Native module compilation:**
   - The Dockerfile installs `python3`, `make`, `g++` for `better-sqlite3`
   - If this fails, your Docker environment may lack build tools
   - Update Docker to the latest version

3. **pnpm version mismatch:**
   - The Dockerfile uses `pnpm@latest` via corepack
   - If you need a specific version, modify `corepack prepare pnpm@9 --activate`

## Commands Issues

### "You don't have permission" message

**Symptoms:**
- Commands return permission errors for GMs

**Solutions:**

1. **Check GM role:**
   - Default: `Owner/GM`
   - Verify the role name matches exactly (case-sensitive)
   - The user must have the role assigned in Discord server settings

2. **Check `GM_ROLE_NAME`** env var if you customized it

3. **Administrator permission** also grants GM access

4. **Map commands:** Require either GM role or `MAP_ROLE_NAME` (default: `Map Guy`)

### "You don't have a registered nation" message

**Solutions:**
- A GM must register you using `/nation register`
- Nations are 1:1 with Discord users — one nation per user

### Resource commands not working

**Symptoms:**
- Can't set, add, or subtract resources
- "Player has no nation" errors

**Solutions:**
1. Verify the target player has a registered nation (`/nation list`)
2. Check you're using the correct resource type name (lowercase, snake_case)
3. Valid types: `energy_credits`, `minerals`, `food`, `trade`, `alloys`, `consumer_goods`, `physics`, `society`, `engineering`

### Trade or market commands fail

**Symptoms:**
- Can't propose trades or fill market offers
- "Insufficient resources" error

**Solutions:**
1. **Insufficient stockpile:** Check your resources with `/resources`
2. **Sanctioned:** If you're sanctioned, you cannot receive transfers or trades
3. **Own offer:** You cannot fill your own market offers
4. **Trade expired:** Trade proposals expire after 24 hours — create a new one

### Map commands fail

**Symptoms:**
- `/map view` shows no map
- Upload fails

**Solutions:**
1. **No map uploaded:** Upload one with `/map upload`
2. **Permission:** Upload commands require GM or Map Guy role
3. **File format:** Supported image formats: PNG, JPG, JPEG, GIF, WebP
4. **File size:** Discord has file size limits; keep images reasonable

## Game Management Issues

### Tick not running

**Symptoms:**
- No tick announcements in timeline channel
- Year hasn't advanced

**Solutions:**

1. **Check `TIMELINE_CHANNEL_ID`** — verify it's correct and the bot has access to that channel

2. **Check if tick is frozen:**
   ```
   /gm unfreeze-tick
   ```

3. **Force a tick manually:**
   ```
   /gm force-tick
   ```

4. **Verify cron expression** in `TICK_CRON`:
   - Default: `0 0 * * *` (midnight UTC every day)
   - Use [crontab.guru](https://crontab.guru) to test your expression

5. **Check bot logs** for scheduler errors

### Tick ran twice or stockpiles doubled

**Symptoms:**
- Stockpiles are higher than expected
- Year advanced too far

**Solutions:**
1. Tick locking prevents concurrent ticks, but if the bot restarted during a tick, the year might have advanced without production crediting (or vice versa)
2. Use `/gm set-year` to correct the year
3. Manually adjust stockpiles with `/resource add` or `/resource set`

### Production modifiers not applying

**Symptoms:**
- Modifier was set but production didn't change

**Solutions:**
1. Modifiers apply during ticks, not instantly. Force a tick to see the effect
2. Check the modifier is still active (has `ticks_remaining > 0`)
3. The total multiplier is clamped to minimum 0 — if the sum of all modifiers and status effects is below 0, production is zero, not negative
4. Research resources are excluded from stockpile accumulation regardless of modifiers

### Stockpile cap not working

**Solutions:**
1. Caps are enforced during ticks, not on manual adjustments
2. Use `/gm force-tick` to trigger cap enforcement
3. Verify the cap is set for the correct resource

## Data Issues

### Wrong starting year

The default starting year is **2200**. If the game_state has a different value, you can:

1. Use `/gm set-year year:2200` to correct it
2. The year advances by 25 each tick

### Lost data after restart

SQLite data persists in the database file. If data is lost:

1. Check that `DB_PATH` points to the same file as before
2. For Docker, verify the volume mount is correct:
   ```yaml
   volumes:
     - ./data:/app/data
   ```
3. Check that the `data/` directory wasn't deleted or recreated empty

### How to backup data

1. **Manual backup:** Copy the SQLite database file:
   ```bash
   cp ./data/starlight.db ./data/starlight.backup.db
   ```

2. **Export game state:** Use `/gm2 export-state` to get a JSON snapshot

3. **Docker volumes:** Back up the `./data/` directory on the host

### How to reset everything for a new game

Use `/gm2 new-season` with a label and optional starting year:
```
/gm2 new-season label:"Season 2" start-year:2200
```

This archives the current season data and wipes all gameplay tables.

## Navigation

- **[Getting Started](./intro.md)** — Setup and configuration
- **[User Guide](./user-guide.md)** — Gameplay and workflows
- **[Command Reference](./command-reference.md)** — All commands
- **[Developer Guide](./developer-guide.md)** — Codebase and extension
