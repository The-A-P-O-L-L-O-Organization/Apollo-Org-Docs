---
sidebar_position: 4
---

# Command Reference

Complete documentation of all Starlight NRP Bot commands, options, and permissions.

## Player Commands

### `/resources`

View your own nation's resource stockpiles and production rates. Response is ephemeral (visible only to you).

**Permission:** Player with a registered nation

**Options:** None

**Example:**
```
/resources
```

**Output:** A formatted embed showing all 9 resource types with category labels, current stockpile, and production rate per month.

---

### `/nation view`

View any nation's resource sheet. If no player is specified, defaults to your own nation.

**Permission:** Any server member

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `player` | User | No | The player whose nation to view (defaults to yourself) |

**Example:**
```
/nation view player:@TerranFed
```

---

### `/nation list`

List all registered nations in the galaxy.

**Permission:** Any server member

**Options:** None

**Example:**
```
/nation list
```

---

### `/diplomacy propose-alliance`

Propose a formal alliance with another nation. The alliance is created immediately upon proposal.

**Permission:** Player with a registered nation

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `nation` | String | Yes | The name of the nation to ally with |

**Example:**
```
/diplomacy propose-alliance nation:"United Earth"
```

---

### `/diplomacy dissolve-alliance`

Dissolve an existing alliance with another nation. Either party can dissolve.

**Permission:** Player with a registered nation

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `nation` | String | Yes | The name of the nation to dissolve alliance with |

**Example:**
```
/diplomacy dissolve-alliance nation:"United Earth"
```

---

### `/diplomacy list-alliances`

View all active alliances in the galaxy.

**Permission:** Player with a registered nation

**Options:** None

**Example:**
```
/diplomacy list-alliances
```

---

### `/diplomacy status`

View your nation's diplomatic standing, including active alliances and any sanctions against your nation.

**Permission:** Player with a registered nation

**Options:** None

**Example:**
```
/diplomacy status
```

---

### `/trade propose`

Propose a resource trade with another nation. The proposal expires after 24 hours.

**Permission:** Player with a registered nation

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `player` | User | Yes | The player to trade with |
| `offer-type` | String (enum) | Yes | The resource you offer |
| `offer-amount` | Number | Yes | Amount of the offered resource |
| `request-type` | String (enum) | Yes | The resource you request |
| `request-amount` | Number | Yes | Amount of the requested resource |

**Resource options:** `energy_credits`, `minerals`, `food`, `trade`, `alloys`, `consumer_goods`

**Example:**
```
/trade propose player:@Ally offer-type:minerals offer-amount:500 request-type:food request-amount:300
```

---

### `/trade accept`

Accept an incoming trade proposal. Resources are exchanged atomically (both or neither succeed).

**Permission:** Player with a registered nation

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `trade-id` | Integer | Yes | The ID of the trade proposal to accept |

**Example:**
```
/trade accept trade-id:3
```

---

### `/trade reject`

Reject an incoming trade proposal.

**Permission:** Player with a registered nation

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `trade-id` | Integer | Yes | The ID of the trade proposal to reject |

**Example:**
```
/trade reject trade-id:3
```

---

### `/trade cancel`

Cancel one of your own pending trade proposals.

**Permission:** Player with a registered nation

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `trade-id` | Integer | Yes | The ID of the trade proposal to cancel |

**Example:**
```
/trade cancel trade-id:3
```

---

### `/trade list`

View all pending trade proposals involving your nation (both sent and received).

**Permission:** Player with a registered nation

**Options:** None

**Example:**
```
/trade list
```

---

### `/market post`

Post a buy or sell offer on the galactic market.

**Permission:** Player with a registered nation

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `type` | String (enum) | Yes | `sell` or `buy` |
| `resource` | String (enum) | Yes | The resource to trade |
| `amount` | Number | Yes | Amount of the resource |
| `price` | Number | Yes | Price per unit |
| `price-resource` | String (enum) | Yes | The resource used as currency |

**Resource options:** `energy_credits`, `minerals`, `food`, `trade`, `alloys`, `consumer_goods`, `physics`, `society`, `engineering`

**Example:**
```
/market post type:sell resource:alloys amount:100 price:50 price-resource:energy_credits
```

---

### `/market fill`

Fill an open market offer. Resources and payment are exchanged automatically.

**Permission:** Player with a registered nation

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `offer-id` | Integer | Yes | The ID of the market offer to fill |

**Example:**
```
/market fill offer-id:5
```

---

### `/market cancel`

Cancel one of your own open market offers.

**Permission:** Player with a registered nation

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `offer-id` | Integer | Yes | The ID of the market offer to cancel |

**Example:**
```
/market cancel offer-id:5
```

---

### `/market list`

Browse all open market offers.

**Permission:** Player with a registered nation

**Options:** None

**Example:**
```
/market list
```

---

### `/map view`

View the current public galaxy map.

**Permission:** Any server member

**Options:** None

**Example:**
```
/map view
```

## GM Commands

### `/nation register`

Register a new nation for a Discord user.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `player` | User | Yes | The Discord user to register |
| `name` | String | Yes | The nation name |

**Example:**
```
/nation register player:@User name:"Terran Federation"
```

---

### `/resource set`

Set a specific resource field (stockpile or production) for a nation.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `player` | User | Yes | The player whose nation to modify |
| `type` | String (enum) | Yes | The resource type |
| `field` | String (enum) | Yes | `stockpile` or `production` |
| `amount` | Number | Yes | The value to set (use 0 to clear) |

**Example:**
```
/resource set player:@User type:minerals field:stockpile amount:1000
```

---

### `/resource set-production-all`

Set all 9 resource production rates to the same value.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `player` | User | Yes | The player whose nation to modify |
| `amount` | Number | Yes | The production rate to apply to all resources |

**Example:**
```
/resource set-production-all player:@User amount:10
```

---

### `/resource add`

Add an amount to a nation's resource stockpile.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `player` | User | Yes | The player whose nation to modify |
| `type` | String (enum) | Yes | The resource type |
| `amount` | Number | Yes | The amount to add (positive or negative) |

**Example:**
```
/resource add player:@User type:energy_credits amount:5000
```

---

### `/resource subtract`

Subtract an amount from a nation's resource stockpile (amount must be ≥ 0).

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `player` | User | Yes | The player whose nation to modify |
| `type` | String (enum) | Yes | The resource type |
| `amount` | Number | Yes | The amount to subtract (must be ≥ 0) |

**Example:**
```
/resource subtract player:@User type:food amount:200
```

---

### `/gm view-nation`

View a nation's full resource sheet. Response is ephemeral.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `player` | User | No | The player to view (defaults to yourself) |

**Example:**
```
/gm view-nation player:@User
```

---

### `/gm overview`

View a summary of all nations' production rates and stockpiles.

**Permission:** GM

**Options:** None

**Example:**
```
/gm overview
```

---

### `/gm delete-nation`

Permanently delete a nation and all associated data (resources, statuses, modifiers, alliances, trade history, market offers).

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `player` | User | Yes | The player whose nation to delete |

**Example:**
```
/gm delete-nation player:@User
```

---

### `/gm rename-nation`

Rename a nation.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `player` | User | Yes | The player whose nation to rename |
| `name` | String | Yes | The new nation name |

**Example:**
```
/gm rename-nation player:@User name:"United Earth"
```

---

### `/gm reset-stockpiles`

Zero out all stockpiles for a nation. Production rates are preserved.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `player` | User | Yes | The player whose nation to reset |

**Example:**
```
/gm reset-stockpiles player:@User
```

---

### `/gm set-year`

Override the current in-game year.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `year` | Integer | Yes | The year to set (e.g., 2200) |

**Example:**
```
/gm set-year year:2250
```

---

### `/gm force-tick`

Immediately trigger a production tick, advancing the in-game calendar by 25 years and crediting all stockpiles. If a tick is already running, this command is skipped.

**Permission:** GM

**Options:** None

**Example:**
```
/gm force-tick
```

---

### `/gm freeze-tick`

Freeze the automatic tick scheduler. While frozen, cron-triggered ticks are skipped, but manual `/gm force-tick` still works.

**Permission:** GM

**Options:** None

**Example:**
```
/gm freeze-tick
```

---

### `/gm unfreeze-tick`

Unfreeze the automatic tick scheduler to resume cron-triggered ticks.

**Permission:** GM

**Options:** None

**Example:**
```
/gm unfreeze-tick
```

---

### `/gm transfer`

Transfer a resource stockpile from one nation to another.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `from` | User | Yes | The source nation's player |
| `to` | User | Yes | The destination nation's player |
| `type` | String (enum) | Yes | The resource type |
| `amount` | Number | Yes | The amount to transfer |

**Example:**
```
/gm transfer from:@NationA to:@NationB type:alloys amount:100
```

---

### `/gm backfill-defaults`

Apply default production rates and starting stockpiles to any resource that currently has zero values. Useful when adding new nations or recovering from data inconsistencies.

**Permission:** GM

**Options:** None

**Example:**
```
/gm backfill-defaults
```

---

### `/gm bulk-adjust`

Add or subtract a resource stockpile across all nations at once. Stockpiles cannot go below zero.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `type` | String (enum) | Yes | The resource type |
| `amount` | Number | Yes | The amount to add (negative to subtract) |

**Example:**
```
/gm bulk-adjust type:food amount:-500
```

---

### `/gm set-status`

Apply a status flag to a nation. Statuses affect production rates and can have additional metadata (e.g., blockade direction).

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `player` | User | Yes | The player whose nation to modify |
| `status` | String (enum) | Yes | The status to apply |
| `direction` | String | No | Optional direction for blockades (overland, naval, total) |

**Status options:** `at_war`, `in_recession`, `golden_age`, `blockaded`, `in_civil_war`, `prosperous`, `custom`

**Example:**
```
/gm set-status player:@User status:golden_age
/gm set-status player:@User status:blockaded direction:total
```

---

### `/gm remove-status`

Remove a status flag from a nation.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `player` | User | Yes | The player whose nation to modify |
| `status` | String (enum) | Yes | The status to remove |

**Example:**
```
/gm remove-status player:@User status:at_war
```

---

### `/gm set-modifier`

Add a temporary production multiplier to a nation. The modifier lasts for a specified number of ticks and auto-expires. Multipliers stack additively with other modifiers and status effects.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `player` | User | Yes | The player whose nation to modify |
| `resource` | String (enum) | No | Specific resource (omit for all non-research) |
| `multiplier` | Number | Yes | Production multiplier (1.0 = no change, 1.5 = +50%, 0.5 = −50%) |
| `label` | String | Yes | A descriptive label for the modifier |
| `ticks` | Integer | Yes | Number of ticks before auto-expiry |

**Example:**
```
/gm set-modifier player:@User resource:alloys multiplier:1.5 label:"Alloy Foundry Bonus" ticks:3
/gm set-modifier player:@User multiplier:0.8 label:"Economic Downturn" ticks:5
```

---

### `/gm remove-modifier`

Remove a production modifier by its ID.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `modifier-id` | Integer | Yes | The ID of the modifier to remove |

**Example:**
```
/gm remove-modifier modifier-id:7
```

---

### `/gm set-cap`

Set a maximum stockpile cap for a nation's resource. During ticks, the stockpile will not exceed this cap.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `player` | User | Yes | The player whose nation to modify |
| `resource` | String (enum) | Yes | The resource type |
| `cap` | Number | Yes | The maximum stockpile value |

**Example:**
```
/gm set-cap player:@User resource:consumer_goods cap:10000
```

---

### `/gm remove-cap`

Remove a stockpile cap from a nation's resource, allowing unlimited accumulation.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `player` | User | Yes | The player whose nation to modify |
| `resource` | String (enum) | Yes | The resource type |

**Example:**
```
/gm remove-cap player:@User resource:consumer_goods
```

---

### `/gm audit`

View the audit log. All GM actions, trade events, tick processing, and system changes are recorded. Optionally filter to a specific nation.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `player` | User | No | Filter to a specific nation |

**Example:**
```
/gm audit
/gm audit player:@User
```

## Extended GM Commands (`/gm2`)

Due to Discord's 25 subcommand limit, additional GM commands are in the `/gm2` command group.

### `/gm2 tributes`

List all active tribute agreements in the galaxy.

**Permission:** GM

**Options:** None

**Example:**
```
/gm2 tributes
```

---

### `/gm2 add-tribute`

Create a recurring tribute agreement. Each tick, the specified amount is transferred from the payer to the receiver.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `payer` | User | Yes | The nation paying the tribute |
| `receiver` | User | Yes | The nation receiving the tribute |
| `resource` | String (enum) | Yes | The resource type |
| `amount` | Number | Yes | Amount transferred per tick |
| `label` | String | No | Optional description |

**Example:**
```
/gm2 add-tribute payer:@NationA receiver:@NationB resource:energy_credits amount:100 label:"Trade Deal"
```

---

### `/gm2 remove-tribute`

Remove a tribute agreement by its ID.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `tribute-id` | Integer | Yes | The ID of the tribute to remove |

**Example:**
```
/gm2 remove-tribute tribute-id:3
```

---

### `/gm2 sanctions-list`

List all active sanctions in the galaxy.

**Permission:** GM

**Options:** None

**Example:**
```
/gm2 sanctions-list
```

---

### `/gm2 add-sanction`

Sanction a nation. Sanctioned nations cannot receive resource transfers or trades from other nations.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `target` | User | Yes | The nation to sanction |
| `reason` | String | No | The reason for the sanction |

**Example:**
```
/gm2 add-sanction target:@NationB reason:"Violated Galactic Treaty"
```

---

### `/gm2 remove-sanction`

Lift a sanction by its ID.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `sanction-id` | Integer | Yes | The ID of the sanction to remove |

**Example:**
```
/gm2 remove-sanction sanction-id:1
```

---

### `/gm2 export-state`

Export the entire current game state as a JSON file. Includes nations, resources, statuses, modifiers, caps, alliances, sanctions, and tributes.

**Permission:** GM

**Options:** None

**Example:**
```
/gm2 export-state
```

---

### `/gm2 new-season`

Archive the current game season and reset all data for a new season. All gameplay data is wiped.

**Permission:** GM

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `label` | String | Yes | A label for the season archive |
| `start-year` | Integer | No | Starting year for the new season (default: 2200) |

**Example:**
```
/gm2 new-season label:"Season 2" start-year:2200
```

## Map Commands

### `/map view-full`

View the full galaxy map. Response is ephemeral.

**Permission:** GM or Map Guy

**Options:** None

**Example:**
```
/map view-full
```

---

### `/map upload`

Upload a new public map image. Replaces the current map.

**Permission:** GM or Map Guy

**Options:** None (attach an image file to the command)

**Example:** Attach an image to `/map upload`

---

### `/map upload-full`

Upload a new full map image (for GM/Map Guy viewing). Replaces the current full map.

**Permission:** GM or Map Guy

**Options:** None (attach an image file to the command)

**Example:** Attach an image to `/map upload-full`

## Context Menu

### View Nation Resources

Right-click any user → **Apps** → **View Nation Resources**

Shows the target user's nation resource sheet. Works for any server member.

**Permission:** Any server member
