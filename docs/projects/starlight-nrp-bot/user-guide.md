---
sidebar_position: 2
---

# User Guide

Learn how to play Starlight NRP, manage your nation, and use all available features.

## Roles & Permissions

Starlight NRP Bot uses Discord's permission system and role-based access control.

### Player

Any member of the Discord server can use player commands after their nation is registered by a GM. Players can:
- View their own resources (`/resources`)
- View any nation's resource sheet (`/nation view`)
- List all registered nations (`/nation list`)
- View the galaxy map (`/map view`)
- Propose and manage trades (`/trade`)
- Post and fill market offers (`/market`)
- Form and dissolve alliances (`/diplomacy`)

### Game Master (GM)

GM access requires one of:
- The `Administrator` Discord permission
- The configured GM role (`Owner/GM` by default, configurable via `GM_ROLE_NAME`)

GMs can do everything players can, plus manage the game state, resources, nations, statuses, modifiers, sanctions, tributes, and view the audit log.

### Map Manager

Map management access requires one of:
- The `Administrator` Discord permission
- The configured GM role
- The configured Map Guy role (`Map Guy` by default, configurable via `MAP_ROLE_NAME`)

Map managers can upload and view map images.

## Game Concepts

### Resources

There are **9 resource types** divided into three categories:

| Category | Resources | Starting Stockpile | Default Production |
|----------|-----------|-------------------|--------------------|
| **Basic** | Energy Credits, Minerals, Food, Trade | 100 each | 10 each |
| **Advanced** | Alloys, Consumer Goods | 25 each | 5 each |
| **Research** | Physics, Society, Engineering | 0 (never accumulates) | 25 each |

Research resources represent an ongoing rate — their stockpile is always zero and does not accumulate during ticks. They are tracked for spending mechanics.

### Ticks

Each tick represents **25 years** of in-game time. During a tick:

1. Every non-research resource stockpile increases by `production_rate × 300` (25 years × 12 months)
2. Production modifiers are applied multiplicatively to the gain
3. Stockpile caps are enforced
4. Tribute agreements are processed (resources transferred from payer to receiver)
5. Production modifier tick counters are decremented; expired modifiers are removed
6. The in-game year advances by 25

Ticks run on a configurable cron schedule (default: midnight UTC daily). GMs can trigger ticks manually, freeze automatic progression, or set the in-game year.

### Nation Statuses

Nations can have status flags that modify their production:

| Status | Label | Production Effect |
|--------|-------|-------------------|
| `at_war` | At War | −15% |
| `in_recession` | In Recession | −20% |
| `golden_age` | Golden Age | +25% |
| `blockaded` | Blockaded | −10% (escalates each tick) |
| `in_civil_war` | In Civil War | −30% |
| `prosperous` | Prosperous | +10% |
| `custom` | Custom | 0% (GM-defined) |

Blockade severity escalates over time: each tick the penalty becomes more severe, making prolonged blockades increasingly impactful.

### Production Modifiers

GMs can apply temporary production modifiers to any nation. A modifier can target a specific resource or all non-research resources. Multiple modifiers stack **additively** — a +20% and −10% modifier result in a net +10% multiplier. The total multiplier is clamped to a minimum of 0 (no negative production).

Each modifier has a `ticks_remaining` counter that decrements each tick. When the counter reaches 0, the modifier is automatically removed.

### Stockpile Caps

Per-nation, per-resource maximum stockpile limits. During ticks, stockpiles are clamped to the cap. If no cap is set, the stockpile can grow without limit. Caps are managed by GMs.

### Tribute Agreements

Recurring resource transfers configured by GMs. Each tick, the specified amount is deducted from the payer's stockpile and credited to the receiver's stockpile. If the payer lacks sufficient stockpile, their stockpile can go negative (debt).

### Sanctions

Sanctions prevent a sanctioned nation from receiving resource transfers or trades from other nations. Sanctions can include a reason and record which nation imposed them.

### Alliances

Formal bilateral agreements between two nations. Alliances are proposed by one nation and automatically accepted (there is no separate accept step). Once formed, alliances are recorded in the game state and visible via `/diplomacy list-alliances`. Either party can dissolve the alliance.

### Trade Proposals

Player-to-player resource exchange system:

1. **Propose** — A player creates a trade specifying what they offer and what they request
2. **Accept** — The target nation accepts the trade; resources are exchanged atomically
3. **Reject** — The target nation rejects the trade
4. **Cancel** — The proposer cancels a pending trade

Trades expire after 24 hours if not accepted. If either party lacks sufficient resources during acceptance, the trade fails.

### Galactic Market

An open market where players can post buy and sell offers:

1. **Post** — List an offer specifying type (buy/sell), resource, amount, price per unit, and price resource type
2. **Fill** — Accept an open offer; resources and payment are exchanged
3. **Cancel** — Remove your own open offer
4. **List** — Browse all open market offers

Players cannot fill their own offers. A nation with sanctions cannot receive resources through market fills.

## Player Workflows

### Managing Your Nation

1. **Check your resources:**
   ```
   /resources
   ```
   This shows all 9 resource types with current stockpile and production rate (ephemeral, visible only to you).

2. **View another nation:**
   ```
   /nation view player:@PlayerName
   ```
   Shows the target player's resource sheet publicly.

3. **List all nations:**
   ```
   /nation list
   ```

4. **Quick view via context menu:**
   Right-click any user → **Apps** → **View Nation Resources**

### Trading with Other Players

1. **Propose a trade:**
   ```
   /trade propose player:@PlayerName offer-type:minerals offer-amount:500 request-type:food request-amount:300
   ```
   A trade proposal is created with a 24-hour expiration.

2. **View pending trades:**
   ```
   /trade list
   ```

3. **Accept a trade:**
   ```
   /trade accept trade-id:1
   ```
   Resources are exchanged if both parties have sufficient stockpiles.

4. **Reject or cancel:**
   ```
   /trade reject trade-id:1
   /trade cancel trade-id:1
   ```

### Using the Galactic Market

1. **Post a sell offer:**
   ```
   /market post type:sell resource:alloys amount:100 price:50 price-resource:energy_credits
   ```

2. **Post a buy offer:**
   ```
   /market post type:buy resource:minerals amount:200 price:2 price-resource:consumer_goods
   ```

3. **Browse offers:**
   ```
   /market list
   ```

4. **Fill an offer:**
   ```
   /market fill offer-id:5
   ```

5. **Cancel your offer:**
   ```
   /market cancel offer-id:5
   ```

### Diplomacy

1. **Propose an alliance:**
   ```
   /diplomacy propose-alliance nation:@AllyName
   ```

2. **Dissolve an alliance:**
   ```
   /diplomacy dissolve-alliance nation:@AllyName
   ```

3. **View your diplomatic standing:**
   ```
   /diplomacy status
   ```

4. **List all alliances:**
   ```
   /diplomacy list-alliances
   ```

### Viewing the Map

```
/map view
```

Shows the current public galaxy map. For the full map (GM/Map Guy only):
```
/map view-full
```

## GM Workflows

### Managing Nations

1. **Register a nation:**
   ```
   /nation register player:@User name:"Terran Federation"
   ```

2. **Rename:**
   ```
   /gm rename-nation player:@User name:"United Earth"
   ```

3. **Delete:**
   ```
   /gm delete-nation player:@User
   ```
   **Warning:** This permanently deletes the nation and all associated data (resources, statuses, modifiers, alliances, trade history).

### Managing Resources

1. **Set a specific resource:**
   ```
   /gm resource set player:@User type:minerals field:stockpile amount:500
   ```

2. **Set all production rates:**
   ```
   /resource set-production-all player:@User amount:10
   ```

3. **Add or subtract:**
   ```
   /resource add player:@User type:energy_credits amount:1000
   /resource subtract player:@User type:food amount:200
   ```

4. **Transfer between nations:**
   ```
   /gm transfer from:@NationA to:@NationB type:alloys amount:100
   ```

5. **Backfill defaults:**
   ```
   /gm backfill-defaults
   ```
   Applies default production rates and starting stockpiles to nations with zero values.

### Running the Game

1. **Force a tick:**
   ```
   /gm force-tick
   ```
   Immediately triggers a production cycle, advancing 25 years.

2. **Freeze/unfreeze ticks:**
   ```
   /gm freeze-tick
   /gm unfreeze-tick
   ```

3. **Set the year:**
   ```
   /gm set-year year:2250
   ```

4. **Bulk adjust across all nations:**
   ```
   /gm bulk-adjust type:food amount:-500
   ```
   Useful for galaxy-wide events (e.g., famine, resource discovery).

### Managing Statuses & Modifiers

1. **Set a nation status:**
   ```
   /gm set-status player:@User status:golden_age
   ```

2. **Remove a status:**
   ```
   /gm remove-status player:@User status:at_war
   ```

3. **Apply a production modifier:**
   ```
   /gm set-modifier player:@User resource:alloys multiplier:1.5 label:"Alloy Foundry Bonus" ticks:3
   ```
   Multiplier of 1.5 = +50% production. Omit resource to affect all non-research types.

4. **Remove a modifier:**
   ```
   /gm remove-modifier modifier-id:7
   ```

### Managing Economy Rules

1. **Set a stockpile cap:**
   ```
   /gm set-cap player:@User resource:consumer_goods cap:10000
   ```

2. **Remove a cap:**
   ```
   /gm remove-cap player:@User resource:consumer_goods
   ```

3. **Add a tribute agreement:**
   ```
   /gm2 add-tribute payer:@NationA receiver:@NationB resource:energy_credits amount:100 label:"Trade Deal"
   ```

4. **Remove a tribute:**
   ```
   /gm2 remove-tribute tribute-id:3
   ```

5. **Add a sanction:**
   ```
   /gm2 add-sanction target:@NationB reason:"Violated Treaty"
   ```

6. **Remove a sanction:**
   ```
   /gm2 remove-sanction sanction-id:1
   ```

### Auditing & Administration

1. **View the audit log:**
   ```
   /gm audit
   ```
   Optionally filter by nation.

2. **Export game state:**
   ```
   /gm2 export-state
   ```
   Produces a JSON file with all nations, resources, statuses, modifiers, caps, alliances, sanctions, and tributes.

3. **Start a new season:**
   ```
   /gm2 new-season label:"Season 2" start-year:2200
   ```
   Archives the current season data and wipes all tables for a fresh start.

### Uploading Maps

1. **Upload the public map:**
   ```
   /map upload
   ```
   Attach an image file to the command.

2. **Upload the full (GM) map:**
   ```
   /map upload-full
   ```

## Best Practices

### For GMs

- **Use statuses for flavor** — Status flags provide narrative context alongside mechanical effects. A nation "At War" has its production reduced, reflecting wartime economic strain.
- **Prefer modifiers over manual edits** — Instead of manually adjusting stockpiles to simulate a bonus, use production modifiers. They auto-expire and are audited.
- **Regular audits** — Run `/gm audit` periodically to review all GM actions and ensure accountability.
- **Use bulk-adjust for events** — Galaxy-wide events (meteor storms, galactic festivals) are cleaner with `/gm bulk-adjust` than editing nations individually.
- **Start small** — When testing new mechanics (modifiers, tributes, caps), test on a single nation before applying galaxy-wide.

### For Players

- **Trade strategically** — The market allows for complex resource conversion. Trade surplus resources for ones you need.
- **Monitor your production** — Use `/resources` to track stockpile trends and plan your trades accordingly.
- **Form alliances** — Allies provide diplomatic support and can be trusted trading partners.
- **Watch for sanctions** — Sanctions block incoming transfers and trades. Resolve disputes diplomatically.
