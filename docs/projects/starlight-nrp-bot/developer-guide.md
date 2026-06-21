---
sidebar_position: 3
---

# Developer Guide

Understand the Starlight NRP Bot codebase, set up a development environment, and extend the bot.

## Architecture Overview

Starlight NRP Bot is a Node.js application built with **discord.js v14** using slash commands and a **SQLite** database (via `better-sqlite3`). The bot uses a guild-commands model (commands registered to a specific Discord server rather than globally).

### Key Design Decisions

- **SQLite over MongoDB** — The bot uses SQLite for simplicity and zero-dependency deployment. The entire database is a single file, making backups trivial.
- **better-sqlite3 (synchronous)** — Unlike async database libraries, `better-sqlite3` provides synchronous queries, which simplifies the tick processing logic and avoids race conditions.
- **Singleton DB pattern** — The database connection is initialized once (`initDb()`) and accessed globally via `getDb()`. This avoids passing connection handles through every function.
- **Command routing** — All slash commands are registered at startup via `deploy-commands.ts` and routed through a `Collection` in `index.ts`.
- **Guild commands** — Commands are registered to a specific guild (not globally) for instant updates during development.

### Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js 20+ | Runtime |
| TypeScript | Language |
| discord.js 14 | Discord API wrapper |
| better-sqlite3 | SQLite database driver |
| node-cron | Tick scheduling |
| dotenv | Environment variable loading |
| Vitest | Testing framework |
| Docker / Docker Compose | Containerized deployment |

## Development Setup

### Prerequisites

- Node.js 20+
- pnpm 9+
- A Discord bot token
- A Discord server for testing

### Setup

1. **Clone and install:**
   ```bash
   git clone https://github.com/The-A-P-O-L-L-O-Organization/starlight-nrp-bot.git
   cd starlight-nrp-bot
   pnpm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Fill in DISCORD_TOKEN, GUILD_ID, TIMELINE_CHANNEL_ID, DB_PATH
   ```

3. **Register commands and run:**
   ```bash
   pnpm deploy
   pnpm dev
   ```

   The dev command uses `ts-node` for TypeScript execution. Any changes to source files require a restart (auto-reload can be added with `ts-node-dev` or `nodemon`).

### Testing

```bash
pnpm test          # Run once
pnpm test:watch    # Watch mode
pnpm test:coverage # With coverage report
```

Tests use an in-memory SQLite database — no `.env` file is needed for running tests.

## Project Structure

```
starlight-nrp-bot/
├── src/
│   ├── commands/              # Slash command handlers
│   │   ├── nation.ts          # Nation registration, view, list
│   │   ├── resource.ts        # Resource set, add, subtract, set-production-all
│   │   ├── resources.ts       # Player self-view of resources
│   │   ├── gm.ts              # Game master commands (part 1)
│   │   ├── gm2.ts             # Game master commands (part 2 — 25 subcommand limit)
│   │   ├── diplomacy.ts       # Alliance management
│   │   ├── trade.ts           # Player-to-player trade proposals
│   │   ├── market.ts          # Galactic market offers
│   │   └── map.ts             # Map image upload and viewing
│   ├── context-menus/
│   │   └── view-nation.ts     # User context menu for quick resource view
│   ├── db/
│   │   └── schema.ts          # SQLite schema, initialization, migrations, all queries
│   ├── utils/
│   │   ├── embeds.ts          # Discord embed builders for resource sheets
│   │   ├── permissions.ts     # GM and Map Guy role checks
│   │   └── scheduler.ts       # Cron-based tick scheduler with freeze/lock logic
│   ├── types.ts               # Resource types, status flags, game constants, interfaces
│   ├── index.ts               # Bot entrypoint — client init, interaction routing, error handling
│   └── deploy-commands.ts     # One-shot slash command registration script
├── tests/
│   ├── schema.test.ts         # DB function unit tests (nations, resources, ticks, years)
│   ├── scheduler.test.ts      # Tick scheduler unit tests (locking, freezing, announcements)
│   └── features.test.ts       # Integration tests for all gameplay systems
├── data/
│   ├── starlight.db           # SQLite database (created at runtime)
│   └── maps/                  # Map image storage
├── Dockerfile
├── docker-compose.yml
├── tsconfig.json
├── vitest.config.ts
└── package.json
```

## How Commands Work

### Adding a New Slash Command

1. **Create the command handler** in `src/commands/`:

   ```typescript
   import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

   export const data = new SlashCommandBuilder()
     .setName('mycommand')
     .setDescription('Does something cool');

   export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
     await interaction.reply('Done!');
   }
   ```

2. **Register it in `deploy-commands.ts`** — add a `require()` to the commands list.

3. **Add routing** in `index.ts` — add to the `slashCommands` Collection.

4. **Register with Discord:**
   ```bash
   pnpm deploy
   ```

### Command Structure

Commands follow a consistent pattern:

- `data` — A `SlashCommandBuilder` defining the command name, description, options, and subcommands
- `execute(interaction)` — The async handler that processes the interaction

For subcommand groups, use `addSubcommandGroup()` and `addSubcommand()` on the builder.

### Permission Checks

GM commands check permissions via `checkGmPermission()` from `src/utils/permissions.ts`:

```typescript
export function checkGmPermission(member: GuildMember): boolean {
  return (
    member.permissions.has('Administrator') ||
    member.roles.cache.some((r) => r.name === GM_ROLE_NAME)
  );
}
```

Map management commands use `canManageMap()`, which also checks the `MAP_ROLE_NAME` role.

## Database Layer

### Schema

The database has **13 tables** covering all gameplay systems. The full schema is in `src/db/schema.ts`:

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `game_state` | Singleton row for game-wide state | `current_year`, `tick_frozen` |
| `nations` | Player nations (1:1 with Discord users) | `discord_user_id`, `name` |
| `resources` | Per-nation, per-resource stockpile/production | `nation_id`, `resource_type`, `stockpile`, `production` |
| `nation_statuses` | Status flags on nations | `nation_id`, `status`, `label`, `metadata` |
| `production_modifiers` | Tick-expiring production multipliers | `nation_id`, `resource_type`, `multiplier`, `ticks_remaining` |
| `alliances` | Bilateral diplomatic agreements | `nation_a_id`, `nation_b_id` |
| `sanctions` | Trade/transfer blocks on nations | `target_nation_id`, `reason` |
| `tribute_agreements` | Recurring tick-based resource transfers | `payer_nation_id`, `receiver_nation_id`, `amount_per_tick` |
| `stockpile_caps` | Per-nation, per-resource maximum stockpiles | `nation_id`, `resource_type`, `cap` |
| `trade_proposals` | Player-to-player trade offers | `proposer_nation_id`, `status`, `expires_at` |
| `market_offers` | Public buy/sell offers | `nation_id`, `offer_type`, `amount`, `price_per_unit` |
| `audit_log` | Full action log | `nation_id`, `action`, `actor`, `details` |
| `map_data` | Singleton row for map filename | `map_url` |

### Key Patterns

**Singleton DB access:**
```typescript
import { getDb } from '../db/schema';
const db = getDb();
const row = db.prepare('SELECT * FROM nations WHERE id = ?').get(nationId);
```

**Transactions for atomicity** (used in tick processing, trades, transfers):
```typescript
const result = db.transaction(() => {
  db.prepare('UPDATE resources SET stockpile = stockpile + ? WHERE ...').run(amount, nationId);
  db.prepare('UPDATE resources SET stockpile = stockpile - ? WHERE ...').run(amount, otherNationId);
})();
```

**Migrations** are run on every startup in `initDb()` — new columns are added with `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` (simulated via error catching since SQLite doesn't support `IF NOT EXISTS` for columns).

### Adding Database Functionality

1. Define any new tables/columns in `initDb()` with `CREATE TABLE IF NOT EXISTS`
2. Add migration logic if adding columns to existing tables
3. Write query functions that take `db` from `getDb()`
4. Write tests using the in-memory database pattern

## Tick Processing

The scheduler in `src/utils/scheduler.ts` handles automatic game ticks:

### Flow

1. **Cron trigger** — `node-cron` fires based on `TICK_CRON` (default: midnight UTC)
2. **Lock check** — If `tickRunning` is true (another tick in progress), skip
3. **Freeze check** — If `game_state.tick_frozen` is true, skip
4. **Apply tick:**
   - Iterate all nations and non-research resources
   - Calculate base gain: `production × 300`
   - Calculate total multiplier: start at 1.0, apply status effects additively, apply production modifiers additively, clamp to minimum 0
   - Apply gain: `MIN(cap, stockpile + gain)` if cap exists, otherwise `stockpile + gain`
   - Process all tribute agreements (payer → receiver)
   - Decrement `ticks_remaining` on modifiers, remove expired ones
5. **Advance year** — `current_year += 25`
6. **Post announcement** — Send embed to `TIMELINE_CHANNEL_ID`
7. **Release lock**

### Tick Locking

The `tickRunning` boolean flag prevents concurrent ticks. This is important because:
- Automatic ticks and manual `/gm force-tick` could overlap
- A long-running tick should not be interrupted
- The lock is always released in a `finally` block

### Tick Freezing

The `tick_frozen` column in `game_state` allows GMs to pause automatic tick progression without stopping the bot. `/gm freeze-tick` sets this flag; `/gm unfreeze-tick` clears it. Manual `/gm force-tick` still works while frozen.

## Types Reference

### Resource Types

```typescript
type ResourceType = 'energy_credits' | 'minerals' | 'food' | 'trade'
                  | 'alloys' | 'consumer_goods'
                  | 'physics' | 'society' | 'engineering';
```

### Status Flags

```typescript
type StatusFlag = 'at_war' | 'in_recession' | 'golden_age' | 'blockaded'
                | 'in_civil_war' | 'prosperous' | 'custom';
```

### Audit Actions

All GM actions, trades, tick events, and system changes are recorded with these action types:

```typescript
type AuditAction = 'resource_set' | 'resource_add' | 'resource_subtract' | 'gm_transfer'
                 | 'player_trade' | 'market_fill' | 'tribute_payment' | 'tick'
                 | 'season_reset' | 'status_set' | 'status_removed' | 'modifier_set'
                 | 'cap_set' | 'sanction_added' | 'sanction_removed' | 'alliance_formed'
                 | 'alliance_dissolved' | 'tribute_added' | 'tribute_removed' | 'tick_freeze';
```

## Error Handling

The bot has layered error handling:

1. **Unknown interaction errors** (Discord code 10062) — Caught globally, silently ignored
2. **Network errors** (`UND_ERR_CONNECT_TIMEOUT`, `UND_ERR_CONNECT`, `ETIMEDOUT`, `ABORT_ERR`) — Caught and user is notified of network issues
3. **Login retry** — `loginWithRetry()` retries Discord login up to 3 times with exponential backoff on DNS errors (`EAI_AGAIN`, `ENOTFOUND`, `ECONNREFUSED`)
4. **General errors** — Caught in interaction handler and reported as ephemeral replies

## Contributing

### Guidelines

- Follow the existing code style (TypeScript, consistent formatting)
- Match the established patterns for commands, database queries, and error handling
- Add tests for new functionality
- Run the full test suite before submitting: `pnpm test`

### Testing Conventions

- Tests use `beforeEach` to create a fresh in-memory SQLite database
- The DB schema initialization is called in `beforeAll` or `beforeEach`
- Tests should clean up after themselves or use fresh databases
- Feature tests should verify both success and error paths

### Building for Production

```bash
pnpm build
pnpm start
```

The build output goes to `dist/`. Production runs compiled JavaScript directly with Node.js.
