---
sidebar_position: 4
---

# Command Reference

Complete reference for all Nikolai-Bot commands

This page provides comprehensive documentation for every command in Nikolai-Bot, organized by category. Each command shows its syntax, permissions, parameters, and usage examples.

## Nation Commands

Commands for creating and managing your nation.

### /nation create

Creates a new nation in the game world.

**Usage:** `/nation create [name] [population] [capital]`

**Required Permission:** Any Discord user (must not already lead a nation)

**Description:** Establish a new nation with initial population and capital. Once created, you become the nation leader with full control.

**Parameters:**
- `name` (string, required) - Your nation's name (2-50 characters, must be unique)
- `population` (integer, required) - Initial population (minimum 100,000)
- `capital` (string, required) - Your capital city name (2-30 characters)

**Example:**
```
/nation create name:"United Republics" population:500000 capital:"Unity City"
```

**Notes:**
- Each Discord user can lead only one nation
- Initial budget and GDP calculated from population
- Nation created with neutral government type (must be set with `/nation government`)

### /nation profile

View detailed statistics and information about any nation.

**Usage:** `/nation profile [nation_name]`

**Required Permission:** Any Discord user (view only)

**Description:** Display comprehensive nation information including economic, military, and diplomatic statistics.

**Parameters:**
- `nation_name` (string, required) - Name of the nation to view

**Example:**
```
/nation profile nation_name:"United Republics"
```

**Notes:**
- Shows all public information
- Hidden information depends on fog of war settings
- Includes leader name and alliance status

### /nation government

Set your nation's government type with associated bonuses.

**Usage:** `/nation government [type]`

**Required Permission:** Nation Leader

**Description:** Choose your governmental structure, which grants unique mechanical bonuses and penalties. Changing government requires political stability above 30%.

**Parameters:**
- `type` (choice, required) - Government type: democracy, monarchy, oligarchy, authoritarian, theocracy, militarism

**Example:**
```
/nation government type:monarchy
```

**Government Types:**
- **Democracy**: +10% happiness, -5% military effectiveness
- **Monarchy**: +5% GDP, -3% happiness
- **Oligarchy**: +5% economic output, ±0% happiness
- **Authoritarian**: +10% military effectiveness, -15% happiness
- **Theocracy**: +5% stability, +5% population growth
- **Militarism**: +20% military effectiveness, -10% economic output

### /nation statistics

View your nation's current statistics and trends.

**Usage:** `/nation statistics`

**Required Permission:** Nation Leader or Nation Member

**Description:** Display economic, military, and diplomatic metrics with historical trends.

**Example:**
```
/nation statistics
```

**Displayed Metrics:**
- Population (current and growth trend)
- GDP (current and growth trend)
- Treasury balance
- Stability rating
- Infrastructure level
- Happiness index
- Military strength
- Diplomatic reputation

### /spirits

Assign and manage national spirits (traits/ideologies).

**Usage:** `/spirits assign [spirit_name]`

**Required Permission:** Nation Leader

**Description:** Apply a national spirit that provides permanent bonuses or effects. Limited to 3 active spirits per nation.

**Parameters:**
- `spirit_name` (choice, required) - Spirit to assign: imperial_ambitions, ideological_fervor, mercantile_focus, militaristic_tradition, scholarly_pursuit, religious_devotion

**Example:**
```
/spirits assign spirit_name:"mercantile_focus"
```

**Available Spirits:**
- **Imperial Ambitions**: +15% military unit production speed
- **Ideological Fervor**: +10% population growth, -5% foreign trade
- **Mercantile Focus**: +20% trade benefits, -5% military production
- **Militaristic Tradition**: +10% military effectiveness
- **Scholarly Pursuit**: +15% research speed, -10% military production
- **Religious Devotion**: +10% stability, +5% happiness

## Economy Commands

Commands for managing your nation's finances and economy.

### /economy view

Display your nation's complete economic status.

**Usage:** `/economy view`

**Required Permission:** Nation Leader or Nation Member

**Description:** View budget, income sources, expenses, and economic forecasts.

**Example:**
```
/economy view
```

**Displayed Information:**
- Current budget
- Monthly income breakdown
- Monthly expenses breakdown
- GDP and production capacity
- Active trade agreements
- Outstanding loans
- Economic growth trend

### /economy budget

Allocate your budget across categories.

**Usage:** `/economy budget [military] [infrastructure] [research] [reserves]`

**Required Permission:** Nation Leader

**Description:** Distribute your monthly budget between military, infrastructure, research, and reserves. Total must equal your available budget.

**Parameters:**
- `military` (integer, required) - Monthly military spending
- `infrastructure` (integer, required) - Monthly infrastructure investment
- `research` (integer, required) - Monthly research funding
- `reserves` (integer, required) - Monthly reserve accumulation

**Example:**
```
/economy budget military:50000 infrastructure:30000 research:20000 reserves:10000
```

**Notes:**
- All amounts must be non-negative
- Sum of allocations must equal available budget
- Budget resets each turn

### /transfer

Send currency to another nation.

**Usage:** `/transfer [target_nation] [amount]`

**Required Permission:** Nation Leader

**Description:** Transfer funds to another nation. Receiver will be notified and can accept or decline the transfer.

**Parameters:**
- `target_nation` (string, required) - Recipient nation name
- `amount` (integer, required) - Transfer amount (minimum 1000)

**Example:**
```
/transfer target_nation:"Allied Kingdom" amount:50000
```

**Notes:**
- Transfers are immediate and irreversible
- Large transfers generate audit log entries
- Sender's treasury must have sufficient funds

### /transactions

View your nation's transaction history.

**Usage:** `/transactions history [days]`

**Required Permission:** Nation Leader or Nation Member

**Description:** Display audit log of all financial transactions for your nation.

**Parameters:**
- `days` (integer, optional) - Number of days to show (default: 30)

**Example:**
```
/transactions history days:7
```

**Notes:**
- Shows sender, receiver, amount, timestamp
- Filtered by nation for security
- Admin can see all transactions with `/admin transactions`

### /loan

Request or manage loans.

**Usage:** `/loan request [amount]` or `/loan repay [amount]`

**Required Permission:** Nation Leader

**Description:** Borrow funds at interest rates determined by your nation's creditworthiness. Interest increases with higher debt-to-GDP ratios.

**Parameters:**
- `amount` (integer, required for request) - Loan amount
- `amount` (integer, required for repay) - Repayment amount

**Example:**
```
/loan request amount:100000
/loan repay amount:50000
```

**Notes:**
- Base interest rate 5% per turn
- Interest increases 1% for every 10% debt-to-GDP above 50%
- Loans must be repaid before end of game
- Default on loans causes penalties and loss of prestige

### /trade

Establish or manage trade routes.

**Usage:** `/trade propose [target_nation] [your_resources] [their_resources]`

**Required Permission:** Nation Leader

**Description:** Propose bilateral trade agreement with another nation. Both nations benefit from regular resource exchanges.

**Parameters:**
- `target_nation` (string, required) - Nation to trade with
- `your_resources` (string, required) - Resources you provide (comma-separated)
- `their_resources` (string, required) - Resources you want (comma-separated)

**Example:**
```
/trade propose target_nation:"Mining Kingdom" your_resources:"grain,coal" their_resources:"steel,iron"
```

**Notes:**
- Trade happens automatically each turn
- Both nations must accept the agreement
- Trade can be canceled by either party with 2-turn notice
- Trade provides income to both nations

### /sanction

Impose economic sanctions on a nation.

**Usage:** `/sanction impose [target_nation] [duration]`

**Required Permission:** Nation Leader or Game Master

**Description:** Prevent trade with a nation and reduce their economic output. Requires justification for audit logs.

**Parameters:**
- `target_nation` (string, required) - Nation to sanction
- `duration` (integer, required) - Duration in turns (minimum 1)

**Example:**
```
/sanction impose target_nation:"Enemy Empire" duration:5
```

**Notes:**
- Sanctioned nation loses all trade agreements
- Target nation's GDP reduced by 10% per sanction
- Sanctions visible to all nations (reputation impact)
- GM can revoke sanctions early

### /exchange

Convert currency between nations at market rates.

**Usage:** `/exchange [from_currency] [to_currency] [amount]`

**Required Permission:** Nation Leader

**Description:** Exchange one nation's currency for another at current market exchange rates.

**Parameters:**
- `from_currency` (string, required) - Currency to exchange from
- `to_currency` (string, required) - Currency to exchange to
- `amount` (integer, required) - Amount to exchange

**Example:**
```
/exchange from_currency:"URP" to_currency:"AKC" amount:10000
```

**Notes:**
- Exchange rates fluctuate based on supply and demand
- 2% transaction fee applied
- Rates updated each turn

### /econcrisis

Handle economic crises and special events.

**Usage:** `/econcrisis view` or `/econcrisis resolve [action]`

**Required Permission:** Nation Leader (for resolution)

**Description:** View active economic crises and take actions to mitigate them.

**Parameters:**
- `action` (choice, optional) - crisis_aid, increase_taxes, reduce_spending, emergency_loan

**Example:**
```
/econcrisis view
/econcrisis resolve action:reduce_spending
```

**Crisis Types:**
- Recession: -20% income, lasts 3 turns
- Inflation: -5% buying power per turn
- Market Crash: -30% budget available
- Currency Collapse: -50% foreign trade value

## Military Commands

Commands for building and managing your military forces.

### /military view

Display your military forces and production.

**Usage:** `/military view`

**Required Permission:** Nation Leader or Nation Member

**Description:** View all army, navy, and air force units with deployment status and readiness.

**Example:**
```
/military view
```

**Displayed Information:**
- Army units (count, morale, location)
- Navy vessels (count, morale, deployment)
- Air force squadrons (count, morale, deployment)
- Total military strength rating
- Unit maintenance cost per turn
- Production queue status

### /military produce

Queue new military units for production.

**Usage:** `/military produce [type] [quantity]`

**Required Permission:** Nation Leader

**Description:** Add units to production queue. Units complete based on production capacity and GDP.

**Parameters:**
- `type` (choice, required) - army, navy, airforce
- `quantity` (integer, required) - Number of units (minimum 1)

**Example:**
```
/military produce type:army quantity:5
/military produce type:navy quantity:2
```

**Production Times:**
- Army unit: 3 turns
- Navy vessel: 5 turns
- Air force squadron: 4 turns

**Notes:**
- Production requires budget allocation
- Multiple units can be in queue
- High infrastructure reduces production time
- Production can be canceled (refunds 50% of cost)

### /military queue

View and manage your production queue.

**Usage:** `/military queue [action]`

**Required Permission:** Nation Leader

**Description:** Display active production orders and manage queue priority.

**Parameters:**
- `action` (choice, optional) - list, prioritize, cancel

**Example:**
```
/military queue action:list
/military queue action:cancel
```

**Notes:**
- Shows estimated completion time for each unit
- Can reorder queue priority
- Canceling units refunds 50% of production cost

### /battle

Simulate a battle between military forces.

**Usage:** `/battle simulate [attacker] [defender] [location]`

**Required Permission:** Nation Leader or Game Master

**Description:** Calculate battle outcome before declaring war. Uses realistic combat simulation based on unit types, terrain, and military doctrine.

**Parameters:**
- `attacker` (string, required) - Attacking nation
- `defender` (string, required) - Defending nation
- `location` (string, optional) - Battle location (affects terrain modifiers)

**Example:**
```
/battle simulate attacker:"United Republics" defender:"Enemy Empire" location:"Northern Mountains"
```

**Notes:**
- Shows predicted casualties and victory probability
- Does not execute the battle, only simulates
- Actual results may vary based on randomness
- Results based on current unit strength and doctrine

### /doctrine

Assign military doctrine to your forces.

**Usage:** `/doctrine set [type]`

**Required Permission:** Nation Leader

**Description:** Choose a military doctrine that modifies how your units fight. Each doctrine provides different bonuses and penalties.

**Parameters:**
- `type` (choice, required) - offensive, defensive, balanced, blitzkrieg, attrition

**Example:**
```
/doctrine set type:blitzkrieg
```

**Doctrine Types:**
- **Offensive**: +20% attack damage, -10% defense
- **Defensive**: +30% defense, -15% attack damage
- **Balanced**: +10% both attack and defense
- **Blitzkrieg**: +25% speed, +5% attack, -20% sustainability
- **Attrition**: +50% defensive wars, -10% offensive effectiveness

### /occupation

Manage occupied territories after winning wars.

**Usage:** `/occupation manage [territory] [policy]`

**Required Permission:** Nation Leader

**Description:** Set occupation policy for conquered territories. Policies affect stability, resources, and costs.

**Parameters:**
- `territory` (string, required) - Territory name
- `policy` (choice, required) - harsh, moderate, lenient, military_control, economic_integration

**Example:**
```
/occupation manage territory:"Eastern Province" policy:moderate
```

**Occupation Policies:**
- **Harsh**: +resources, -stability, higher rebel chance
- **Moderate**: Balanced resources and stability
- **Lenient**: -resources, +stability, lower costs
- **Military Control**: High defense, -civilian benefits
- **Economic Integration**: High resources, integration with main nation

### /armstreaty

Negotiate arms limitation treaties.

**Usage:** `/armstreaty propose [target] [limits]`

**Required Permission:** Nation Leader or Game Master

**Description:** Propose bilateral arms control treaties limiting military spending or unit types.

**Parameters:**
- `target` (string, required) - Target nation
- `limits` (choice, required) - reduce_30, reduce_50, unit_limit_500, unit_limit_1000

**Example:**
```
/armstreaty propose target:"Rival Nation" limits:reduce_30
```

**Notes:**
- Both nations must agree to treaty terms
- Violations trigger automatic sanctions
- Compliance verified each turn automatically

## Diplomacy Commands

Commands for managing relationships and diplomatic actions.

### /war declare

Declare war on another nation.

**Usage:** `/war declare [target_nation] [casus_belli]`

**Required Permission:** Nation Leader

**Description:** Declare war and begin hostile actions. War ends through treaty or one nation's elimination.

**Parameters:**
- `target_nation` (string, required) - Nation to declare war on
- `casus_belli` (string, optional) - Justification for the war (affects prestige impact)

**Example:**
```
/war declare target_nation:"Enemy Empire" casus_belli:"Territorial dispute"
```

**Notes:**
- Declaring war without justification damages prestige
- War lasts until peace treaty signed
- All trade agreements suspended during war
- Military units can be deployed to enemy territory

### /alliance

Create or manage alliances between nations.

**Usage:** `/alliance create [name]` or `/alliance join [alliance_name]`

**Required Permission:** Nation Leader

**Description:** Form multi-nation blocs for mutual defense and coordinated action.

**Parameters:**
- `name` (string, required) - Alliance name
- `alliance_name` (string, required) - Name of alliance to join

**Example:**
```
/alliance create name:"Western Coalition"
/alliance join alliance_name:"Western Coalition"
```

**Notes:**
- Alliance leader can invite/remove members
- Members provide mutual defense bonuses
- Alliance treasury can be contributed to
- Alliances visible on rankings

### /treaty

Propose or negotiate treaties with other nations.

**Usage:** `/treaty propose [target] [type]`

**Required Permission:** Nation Leader

**Description:** Establish formal diplomatic agreements with binding terms.

**Parameters:**
- `target` (string, required) - Target nation
- `type` (choice, required) - non_aggression, defensive_alliance, economic_union, research_pact, territorial_guarantee

**Example:**
```
/treaty propose target:"Friend Nation" type:non_aggression
```

**Treaty Types:**
- **Non-Aggression**: Prevents war declaration
- **Defensive Alliance**: Automatic war if either attacked
- **Economic Union**: Increased trade benefits
- **Research Pact**: Shared technology benefits
- **Territorial Guarantee**: Defend ally territory

### /espionage

Conduct intelligence operations against rival nations.

**Usage:** `/espionage operation [target] [type]`

**Required Permission:** Nation Leader

**Description:** Gather intelligence or conduct sabotage operations against other nations. High-risk, high-reward actions.

**Parameters:**
- `target` (string, required) - Target nation
- `type` (choice, required) - intelligence_gather, economic_sabotage, military_sabotage, coup_support

**Example:**
```
/espionage operation target:"Enemy Empire" type:intelligence_gather
```

**Operation Success Rates:**
- Intelligence Gather: 70% (gathers military/economic info)
- Economic Sabotage: 50% (reduces target GDP 10%)
- Military Sabotage: 40% (reduces unit strength 15%)
- Coup Support: 30% (may trigger coup attempt)

**Notes:**
- Failed operations damage reputation
- Detected spies cause major prestige loss
- Each nation has limited spy capacity based on GDP

### /coup

Attempt to overthrow a nation's government.

**Usage:** `/coup attempt [target]`

**Required Permission:** Nation Leader or Game Master

**Description:** Use internal instability to trigger government overthrow. Success depends on target stability and your espionage capability.

**Parameters:**
- `target` (string, required) - Target nation

**Example:**
```
/coup attempt target:"Unstable Kingdom"
```

**Success Factors:**
- Target stability below 50%: +20% success
- Your espionage capability: +1% per point
- Target population size: -0.1% per million
- Success rate ranges 5-85%

**Notes:**
- Failed coups damage relations
- Successful coup changes government
- Deposed leaders can flee to other nations

## Research Commands

Commands for technology development and research.

### /research tree

View your nation's technology tree and progress.

**Usage:** `/research tree [filter]`

**Required Permission:** Nation Leader or Nation Member

**Description:** Display available technologies, research progress, and unlocked techs.

**Parameters:**
- `filter` (choice, optional) - available, researching, completed, military, economic, social

**Example:**
```
/research tree filter:available
```

**Technology Categories:**
- **Military**: Weapon upgrades, unit improvements
- **Economic**: Production boosts, trade benefits
- **Social**: Population growth, happiness improvements
- **Infrastructure**: Building improvements, efficiency gains
- **Diplomacy**: Treaty bonuses, alliance benefits
- **Research**: Faster research, technology discounts

### /research focus

Set your nation's current research focus.

**Usage:** `/research focus [technology]`

**Required Permission:** Nation Leader

**Description:** Choose which technology to research. Research progresses automatically each turn.

**Parameters:**
- `technology` (string, required) - Name of technology to research

**Example:**
```
/research focus technology:"Advanced Agriculture"
```

**Notes:**
- Only one technology can be researched at a time
- Research time varies by technology complexity
- Can change focus anytime (no penalty)
- Completion progress displays in `/research status`

### /research status

View your research progress and estimated completion.

**Usage:** `/research status`

**Required Permission:** Nation Leader or Nation Member

**Description:** Display current research, progress percentage, and estimated turns to completion.

**Example:**
```
/research status
```

**Displayed Information:**
- Current research technology
- Progress percentage and points
- Estimated completion (in turns)
- Completed technologies
- Research speed modifiers

## Resource Commands

Commands for managing production and resources.

### /resources

View your nation's resource production and stockpiles.

**Usage:** `/resources view [resource_type]`

**Required Permission:** Nation Leader or Nation Member

**Description:** Display resource production rates and current stockpiles.

**Parameters:**
- `resource_type` (string, optional) - Specific resource to view

**Example:**
```
/resources view
/resources view resource_type:"grain"
```

**Resource Types:**
- Grain (food production)
- Coal (energy production)
- Steel (military production)
- Wood (construction)
- Oil (industrial production)

### /infrastructure

Build and upgrade your national infrastructure.

**Usage:** `/infrastructure build [type]`

**Required Permission:** Nation Leader

**Description:** Invest in infrastructure projects for production bonuses and resource generation.

**Parameters:**
- `type` (choice, required) - factory, farm, mine, port, research_center

**Example:**
```
/infrastructure build type:factory
```

**Infrastructure Types:**
- **Factory**: +5% industrial production
- **Farm**: +5% food production
- **Mine**: +5% ore production
- **Port**: +10% trade benefits, enables naval access
- **Research Center**: +10% research speed

**Notes:**
- Building takes 2-3 turns
- Costs vary based on type
- Multiple buildings can be under construction

### /wonders

Construct mega-projects (wonders) for permanent bonuses.

**Usage:** `/wonders build [type]`

**Required Permission:** Nation Leader

**Description:** Build world wonders providing powerful permanent bonuses. Only one wonder can be under construction.

**Parameters:**
- `type` (choice, required) - great_library, colosseum, grand_canal, nuclear_plant, ai_research_hub

**Example:**
```
/wonders build type:great_library
```

**Available Wonders:**
- **Great Library**: +25% research speed
- **Colosseum**: +15% happiness and culture
- **Grand Canal**: +20% trade benefits
- **Nuclear Plant**: +40% production, political risk
- **AI Research Hub**: +50% research speed, high maintenance cost

**Notes:**
- Wonders take 10+ turns to complete
- Very expensive projects
- Only one wonder per nation
- Provide major permanent bonuses

## Social Commands

Commands for communication and reputation.

### /press release

Publish official announcements to other nations.

**Usage:** `/press release [title] [message]`

**Required Permission:** Nation Leader

**Description:** Broadcast official statements to create a historical record and communicate with other players.

**Parameters:**
- `title` (string, required) - Release headline (50 characters max)
- `message` (string, required) - Release content (500 characters max)

**Example:**
```
/press release title:"Peace Treaty Signed" message:"United Republics and Allied Kingdom sign historic peace accord"
```

**Notes:**
- All nations can read press releases
- Creates permanent record
- Professional releases enhance reputation

### /reputation

View and manage your nation's reputation metrics.

**Usage:** `/reputation view [nation]`

**Required Permission:** Any Discord user

**Description:** Display reputation ratings from other nations based on your diplomatic actions.

**Parameters:**
- `nation` (string, optional) - Specific nation to view reputation from

**Example:**
```
/reputation view
/reputation view nation:"United Republics"
```

**Reputation Factors:**
- Military victories (+5 per war win)
- Treaty compliance (+2 per completed treaty)
- Economic aid (+3 per significant trade)
- Aggressive expansion (-10 per war without justification)
- Espionage discovered (-15 per caught operation)

## Time/Turn Commands

Commands for managing game turns and timing.

### /turn reminder

Subscribe to turn processing reminders.

**Usage:** `/turn reminder [action]`

**Required Permission:** Any Discord user

**Description:** Receive notifications 1 hour before turn processing.

**Parameters:**
- `action` (choice, required) - subscribe, unsubscribe, check_status

**Example:**
```
/turn reminder action:subscribe
```

**Notes:**
- Reminders sent via DM
- Customizable per nation
- Useful for planning pre-turn actions

### /turn status

Check current turn number and time until next turn.

**Usage:** `/turn status`

**Required Permission:** Any Discord user

**Description:** Display current game turn and countdown to next turn processing.

**Example:**
```
/turn status
```

**Displayed Information:**
- Current turn number
- Time until next turn
- Last turn processing timestamp
- Active nations count

## Quality of Life Commands

Convenience commands for efficient gameplay.

### /profile

View your nation's complete profile.

**Usage:** `/profile`

**Required Permission:** Nation Leader

**Description:** Display all your nation data in a comprehensive formatted view.

**Example:**
```
/profile
```

### /rankings

View global rankings and leaderboards.

**Usage:** `/rankings [category]`

**Required Permission:** Any Discord user

**Description:** View top nations in various categories.

**Parameters:**
- `category` (choice, optional) - military, economy, research, happiness, prestige, population

**Example:**
```
/rankings category:military
```

## Admin Commands

Game Master-only commands for game management.

### /admin config

Configure game settings.

**Usage:** `/admin config [setting] [value]`

**Required Permission:** Game Master

**Description:** Modify game-wide configuration.

**Parameters:**
- `setting` (string, required) - Configuration parameter
- `value` (string, required) - New value

**Example:**
```
/admin config setting:turn_interval value:12
```

**Configurable Settings:**
- turn_interval (hours)
- fog_of_war (enabled/disabled)
- random_events (enabled/disabled)
- balance_multiplier (0.5-2.0)

### /admin nations

View and manage all nations.

**Usage:** `/admin nations [action]`

**Required Permission:** Game Master

**Description:** List all nations or perform administrative actions.

**Parameters:**
- `action` (choice, optional) - list, reset, delete

**Example:**
```
/admin nations action:list
```

### /admin transactions

View all game transactions.

**Usage:** `/admin transactions [filter]`

**Required Permission:** Game Master

**Description:** Audit all financial transactions across all nations.

**Parameters:**
- `filter` (string, optional) - Nation name or transaction type

**Example:**
```
/admin transactions filter:"United Republics"
```
