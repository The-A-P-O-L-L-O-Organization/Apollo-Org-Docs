---
sidebar_position: 2
---

# User Guide

Complete guide to using Nikolai-Bot for Nation Roleplay games

This guide covers everything you need to know to effectively use Nikolai-Bot in your Nation Roleplay games, whether you're a Game Master setting up a new game or a player managing your nation.

## Roles & Permissions

Nikolai-Bot has a permission system that ensures Game Masters maintain control while allowing players appropriate autonomy.

### Game Master

Game Masters have full control over the bot and the game world. Responsibilities include:

- **Game Setup** - Creating the initial game state, configuring settings like turn intervals
- **Turn Processing** - Advancing the game world every 12 hours (or as configured)
- **Game Balance** - Adjusting nation statistics, event probabilities, and economy settings
- **Dispute Resolution** - Investigating issues and correcting data when needed
- **Player Management** - Removing disruptive players or revoking permissions as needed

Game Masters execute GM-only commands from the `/admin` command category and can override any game setting.

### Nation Leaders

Nation Leaders have full control of their nation. They can:

- **Manage Economy** - Set budgets, take loans, establish trade routes
- **Command Military** - Build units, declare wars, manage military doctrine
- **Conduct Research** - Choose technology paths and direct research efforts
- **Conduct Diplomacy** - Form alliances, declare wars, negotiate treaties
- **Publish Press Releases** - Communicate with other nations through official statements

Nation Leaders must be explicitly assigned to a nation by the Game Master.

### Nation Members

Nation Members have limited permissions within their nation. They can:

- **View all nation statistics** - See economic, military, and diplomatic status
- **Execute some commands** - Contribute to nation building with GM approval
- **Read press releases** - Stay informed of diplomatic developments
- **View foreign intelligence** - See limited information about rival nations

Nation Members cannot execute commands that modify the nation state without special permission.

### Everyone

All Discord users can:

- **View nation profiles** - See public information about any nation
- **View rankings** - See leaderboards for military, economy, and other metrics
- **Read press releases** - Stay informed of diplomatic developments

## Game Concepts

Understanding these core concepts is essential for effective gameplay.

### Nations & Statistics

Each nation is a discrete entity with detailed statistics tracking its capabilities:

- **Population** - Total citizens; affects military recruitment and productivity
- **Capital** - Home location; determines nation location on world map
- **GDP** - Economic output; determines resource generation and military capacity
- **Budget** - Available spending; replenished each turn
- **Stability** - Political stability; affects economic growth and coup risk
- **Prestige** - International standing; improved by military victories and treaties
- **Infrastructure Level** - Quality of national infrastructure; improves resource production
- **Happiness** - Citizen satisfaction; affects productivity and military morale
- **Government Type** - Democratic, Authoritarian, Monarchy, etc.; each has unique bonuses
- **National Spirits** - Ideologies and traits that provide mechanical bonuses/penalties

### Turns & Turn Processing

The game world advances on a turn-based schedule:

- Turns occur automatically every 12 hours (configurable by GM)
- Each turn processes events, advances research, and generates resources
- Nation Leaders receive a turn reminder 1 hour before processing
- All nations' actions are resolved simultaneously (no action advantage)
- Audit logs record every change made during turn processing

Turn processing includes:
- Resource generation based on infrastructure and population
- Economic adjustments (inflation, loans, interest)
- Military unit production completion
- Research progress advancement
- Random event generation
- Automatic event resolution (wars, crises, etc.)

### Resources & Economy

Nations track multiple economic metrics:

- **Primary Currency** - National currency controlled by each nation
- **Treasury** - Current cash reserves
- **Budget** - Spending allocation each turn
- **GDP** - Economic output; affects production capacity
- **Trade Agreements** - Bilateral trade providing regular income
- **Loans** - Borrowing for immediate capital; increases debt
- **Taxes** - Revenue source; higher taxes reduce happiness
- **Production** - Manufacturing capacity; limited by GDP and infrastructure

The economy is interconnected: high taxes increase revenue but reduce happiness, which reduces productivity and GDP, which reduces future revenue. Strategic economic management is crucial.

### Military Forces

Each nation commands three military branches with distinct roles:

- **Army** - Infantry and ground forces; effective against other ground forces
- **Airforce** - Aircraft and air units; provides air superiority and bombing capability
- **Navy** - Naval vessels; controls sea lanes and amphibious operations

Each military unit has:
- **Production Queue** - Time required to build (varies by unit type)
- **Deployment Status** - Active, in garrison, or under repair
- **Combat Effectiveness** - Based on unit type, military doctrine, and morale
- **Supply Requirements** - Cost to maintain (deducted from budget each turn)

### Diplomacy & Relations

Nations interact through diplomatic actions:

- **Wars** - Declare war to attack another nation; automatic peace after treaty
- **Alliances** - Join blocs for mutual defense
- **Trade Agreements** - Bilateral trade for regular income
- **Treaties** - Establish formal relationships (non-aggression, defense, etc.)
- **Sanctions** - Impose economic penalties on rival nations
- **Espionage** - Intelligence operations to gather information or sabotage

All diplomatic actions have historical records and impact international reputation.

### Reputation & Influence

Nations gain or lose reputation through actions:

- **Military Victory** - Winning wars increases prestige
- **Treaty Compliance** - Honoring agreements builds trustworthiness
- **Treaty Violation** - Breaking agreements damages reputation
- **War Aggression** - Unprovoked wars reduce prestige
- **Economic Aid** - Providing loans or trade benefits increase goodwill

High reputation unlocks diplomatic advantages; low reputation leads to isolation and coalition formation against you.

## Command Categories Overview

Nikolai-Bot organizes commands into logical categories. Here's a brief overview:

### Nation Commands

Create and manage your nation's basic properties:
- Nation creation and configuration
- National spirits assignment
- Leadership changes
- Nation profiles and statistics

### Economy Commands

Control your nation's financial systems:
- Budget management and allocation
- Currency transfers between nations
- Transaction history and auditing
- Loan management and debt tracking
- Trade route establishment and management

### Military Commands

Build and manage your military forces:
- Military unit production and queuing
- Military force deployment and positioning
- Battle simulation and combat resolution
- Military doctrine assignment
- Occupation and territory management

### Diplomacy Commands

Manage relationships with other nations:
- War declaration and treaty negotiation
- Alliance formation and management
- Trade agreement establishment
- Espionage operations
- Coup attempts and government changes

### Research Commands

Advance your nation's technology:
- Technology tree navigation and selection
- Research progress tracking
- Technology unlocking and benefit application

### Resource Commands

Manage production and resources:
- Resource production monitoring
- Infrastructure building and upgrading
- Wonder and mega-project construction
- Resource allocation and distribution

### Social Commands

Share your nation's story:
- Press release publication
- Nation reputation checking
- Crisis event handling

### Time/Turn Commands

Manage the game's temporal flow:
- Turn reminders and scheduling
- Upcoming event notification
- Turn processing status

### Quality of Life Commands

Convenience features for efficient gameplay:
- Nation profiles and leaderboards
- Bulk operations and batch commands
- Information lookups and statistics

## Common Workflows

Here are common tasks you'll perform in Nikolai-Bot:

### Creating a Nation

1. Use `/nation create` with your nation name, population, and capital
2. Set your government type with `/nation government`
3. Assign national spirits with `/spirits assign` to customize your nation
4. Check your initial stats with `/nation profile`
5. Start planning your first turn

### Managing Economy

1. Review your budget with `/economy view`
2. Check transaction history with `/transactions history`
3. Allocate spending with `/economy budget`
4. Take loans if needed with `/loan request`
5. Monitor GDP and production capacity

### Building Military Forces

1. View current forces with `/military view`
2. Queue new units with `/military produce army` (or navy/airforce)
3. Check production progress with `/military queue`
4. Assign doctrine with `/doctrine set`
5. Deploy units to strategic positions with `/military deploy`

### Starting a War

1. Check rival nation strength with `/nation profile [nation]`
2. Assess your military readiness with `/military view`
3. Declare war with `/war declare [nation]`
4. Simulate battle outcomes with `/battle simulate`
5. Manage occupied territories post-victory with `/occupation manage`

### Establishing Trade

1. Identify potential trade partners with `/nation rankings economy`
2. Propose trade with `/trade propose [nation] [resources]`
3. Wait for acceptance or negotiate terms
4. Receive automatic trade benefits each turn

### Research & Advancement

1. View your technology tree with `/research tree`
2. Choose a research focus with `/research focus`
3. Monitor progress with `/research status`
4. Unlock new technologies as research completes
5. Apply technology benefits with `/research apply`

## Best Practices

Following these practices will improve your gameplay experience:

### Tips for Game Masters

- **Schedule consistent turns** - Players benefit from predictable timing; avoid sudden schedule changes
- **Maintain game balance** - Monitor nation strength; use events to challenge dominant powers
- **Investigate disputes** - Use audit logs to resolve conflicts fairly
- **Communicate clearly** - Set expectations about rules, turn timing, and victory conditions
- **Back up your data** - Regularly backup your MongoDB to prevent data loss
- **Test commands before play** - Understand the bot before deploying to your community

### Nation Management Tips

- **Diversify your economy** - Don't rely on a single trade partner; build financial resilience
- **Plan military spending** - Military costs accumulate; ensure your budget covers upkeep
- **Use infrastructure** - Infrastructure investments pay dividends long-term through production bonuses
- **Watch your stability** - Economic collapse and coup risk increase when stability drops below 40%
- **Manage happiness** - Higher taxes fund military but reduce happiness; find balance

### Economy Management

- **Budget each turn** - Allocate spending before the turn processes; avoid surprises
- **Diversify income** - Trade, taxes, and loans each have advantages and disadvantages
- **Plan for loans** - Loans require repayment with interest; ensure you can afford payments
- **Monitor inflation** - High spending causes inflation; control inflation through reserve building
- **Track transactions** - Review `/transactions history` regularly to spot errors or fraud

### Diplomatic Strategy

- **Document agreements** - Use press releases to formalize treaties; create accountability
- **Build trust gradually** - Honor small agreements before committing to major alliances
- **Balance alliances** - Multiple smaller allies are more stable than dependency on one power
- **Plan wars carefully** - Unprepared wars destroy prestige; ensure military readiness
- **Use espionage cautiously** - Caught espionage damages reputation; consider the risk-reward
