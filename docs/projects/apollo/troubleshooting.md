---
sidebar_position: 5
---

# Troubleshooting

Solutions for common issues and problems with A.P.O.L.L.O.

## General Connection Issues

### Bot is not responding to commands

**Problem:** You've sent a command but the bot doesn't reply or shows an error message.

**Symptoms:**
- Commands timeout or produce no response
- "Bot is not responding" message in Discord
- Slash command doesn't appear or appears but can't be executed
- Other bots in the server work normally

**Solution:**
1. Verify the bot is online in your server (check member list)
2. Check bot permissions with `/system` command
3. Run `/ping` to check bot latency — if latency is very high (greater than 5000ms), the bot may be overloaded
4. Check Discord server status (sometimes Discord's API is slow)
5. Restart the bot: `docker compose restart` (Docker) or stop and restart with `pnpm start`
6. Check bot logs for error messages: `docker compose logs apollo` or check console output
7. If bot is in your server but completely unresponsive, ensure it has proper permissions (see "Permissions denied errors")

**Prevention:**
- Keep the bot updated to the latest version
- Monitor bot latency with `/ping` regularly
- Ensure sufficient server resources if running on limited hardware
- Set up monitoring alerts for bot disconnections

### Bot not in Discord server

**Problem:** You can't find the bot in your server member list, or you're trying to use it but it's not there.

**Symptoms:**
- Bot doesn't appear in member list
- Commands show "Unknown command"
- Invite link didn't work or was never used
- Bot appears offline in member list

**Solution:**
1. Generate a new bot invite link from the [Apollo GitHub Repository](https://github.com/The-A-P-O-L-L-O-Organization/Apollo-Discord-Bot)
2. Ensure the invite includes required scopes: `bot` and `applications.commands`
3. Ensure the invite includes required permissions: `administrator` (easiest) or specific permissions for each command
4. Verify you have permission to invite bots to the server (server owner or admin)
5. If bot was invited but disappeared, check if someone removed it — re-invite if needed
6. After inviting, deploy slash commands: `node deploy-commands.js` (manual setup)
7. Wait 30 seconds for commands to register in Discord

**Prevention:**
- Keep the bot invite link saved in a safe location
- Use `administrator` permission scope to avoid missing permissions
- Regularly check bot is still in your server

### Permissions denied errors

**Problem:** Bot says "Permission denied" when executing commands that should work for your role.

**Symptoms:**
- Commands return "Missing permissions" or "Insufficient permissions"
- Error includes specific permission (e.g., "MANAGE_MESSAGES")
- Works for some users but not others
- Works in some channels but not others

**Solution:**
1. Check your role in the server (verify you're actually an admin/moderator)
2. Check the bot's role position in server settings:
   - Go to Server Settings → Roles
   - Bot role should be ABOVE the roles it needs to moderate
   - If bot role is below target roles, the command will fail
3. Check specific channel permissions:
   - Select the channel → Channel Settings → Permissions
   - Look for @BotName role
   - Ensure it has the required permission (e.g., SEND_MESSAGES, MANAGE_MESSAGES)
4. Run `/system` to see full bot permission analysis
5. If issues persist, re-invite bot with proper permissions or manually fix channel-level permissions
6. Restart bot after permission changes

**Prevention:**
- Place bot role near the top of role hierarchy
- Grant permissions broadly so bot can work in all channels
- Regularly audit role positions and permissions
- Test commands in a private channel first

## Command-Specific Issues

### Commands return empty responses

**Problem:** A command executes without error but returns no message or displays "No data available."

**Symptoms:**
- Command runs but shows empty embed or blank message
- Expected data doesn't appear
- No error message is displayed
- Works for some users/situations but not others

**Solution:**
1. Check if the requested data actually exists (e.g., querying a user that doesn't exist)
2. Verify command parameters are correct: `/help [command-name]` shows required parameters
3. Check if the feature is properly configured:
   - For tags: ensure tags were actually saved with `/tag save`
   - For reminders: verify reminders exist with `/reminder list`
4. Check bot logs for silent errors: `docker compose logs apollo | grep -i error`
5. Try the command with different parameters or in a different channel
6. If database-backed, check database connection: `/system` shows database status
7. Clear cache and restart: `docker compose restart apollo`

**Prevention:**
- Create test data before using commands
- Check `/help` command documentation for each feature
- Verify data was saved before trying to retrieve it

### Slash commands not appearing

**Problem:** You know a command exists but it doesn't show up in the slash command list or autocomplete.

**Symptoms:**
- Command doesn't appear in `/` menu
- Autocomplete doesn't show the command
- Other commands work fine
- Works for some users but not others

**Solution:**
1. Verify the bot is in your server (see "Bot not in Discord server")
2. Ensure bot has `applications.commands` scope:
   - Re-invite bot from authorized invite link
3. Deploy slash commands (if not using Docker):
   - `node deploy-commands.js`
4. Wait 1-2 minutes for Discord to sync commands
5. Restart Discord app completely (close and reopen)
6. Clear Discord cache:
   - Mac: `~/Library/Application Support/Discord/Cache`
   - Windows: `%appdata%\Discord\Cache`
   - Linux: `~/.config/Discord/Cache`
   - Delete cache folder, restart Discord
7. Check if command is disabled in bot configuration (admin-only)
8. Verify bot has permission to create slash commands in your server

**Prevention:**
- Deploy commands after any bot updates
- Keep Discord client updated
- Test command availability after server setup

### Command cooldown exceeded

**Problem:** Using a command too frequently returns a cooldown error.

**Symptoms:**
- Command returns "Please wait X seconds before using this again"
- Cooldown timer shows remaining time
- Cooldown applies per-user, per-channel, or globally
- Cannot bypass cooldown

**Solution:**
1. **User cooldown** — Wait for the timer to expire (typically 3-5 seconds between uses)
2. **Global rate limit** — If many users use same command, wait for global cooldown (1-2 minutes)
3. Check if you're hitting Discord's API rate limit:
   - Reduce command usage frequency
   - Spread commands across multiple channels if possible
4. If cooldown seems broken (stuck), restart bot: `docker compose restart apollo`
5. Check logs for rate limit errors: `docker compose logs apollo | grep -i rate`

**Prevention:**
- Space out command usage
- Don't spam commands in rapid succession
- Coordinate with other server members during high-traffic times
- Monitor bot logs for rate limit warnings

### Missing required parameters

**Problem:** A command returns "Missing required parameter" even though you provided parameters.

**Symptoms:**
- Command fails with parameter error
- Parameter appears to be provided
- Works for some users but not others
- Autocomplete suggests the parameter

**Solution:**
1. Check command syntax: `/help [command-name]` shows exact format
2. Verify parameter is in correct position:
   - Slash commands require parameters in specific order
   - Check autocomplete hints for correct order
3. Ensure parameter value is valid:
   - User mentions must use actual mentions (right-click → Copy User ID, then use in command)
   - Numbers must be actual numbers, not text
   - Text parameters with spaces must be properly quoted if needed
4. Check parameter type:
   - User parameters must be valid Discord users
   - Role parameters must be actual server roles
   - Channel parameters must be actual channels
5. Try with different parameters or default values
6. Run `/help` again to verify syntax

**Prevention:**
- Use autocomplete when typing commands
- Check `/help` for each command before using
- Copy-paste user mentions instead of typing manually

## Feature-Specific Issues

### Ticket system not working

**Problem:** Ticket commands aren't responding or tickets don't open properly.

**Symptoms:**
- `/ticket create` returns no response
- Button to open ticket doesn't work
- Tickets appear but can't be used
- Ticket logs missing or incomplete

**Solution:**
1. Verify ticket system is enabled: check bot configuration for `TICKET_ENABLED=true`
2. Check required channels exist:
   - Run `/system` to see ticket system status
   - Create dedicated channel for tickets if missing
3. Verify bot has permissions:
   - Can create channels (MANAGE_CHANNELS)
   - Can send messages in all channels
   - Can manage messages (for close/archive buttons)
4. Check ticket category:
   - Create a ticket category channel if it doesn't exist
   - Ensure bot can access and create channels within it
5. Clear ticket queue: `/queue flush` (removes stuck tickets)
6. Test with simple ticket: `/ticket create reason: test`
7. Check logs: `docker compose logs apollo | grep -i ticket`

**Prevention:**
- Create ticket category and channel structure before enabling system
- Test ticket creation immediately after setup
- Monitor ticket queue with `/queue status`

### Reminders not triggering

**Problem:** Set reminders don't fire at the scheduled time.

**Symptoms:**
- Reminder time passes without notification
- Reminder appears in list but doesn't trigger
- Reminder triggers hours/days late
- Reminder data lost after bot restart

**Solution:**
1. Verify reminders are enabled and queue is running:
   - `/system` shows queue and database status
   - `/queue status` shows if jobs are processing
2. Check reminder was actually saved:
   - `/reminder list` should show the reminder
   - Verify time is in the future
3. Ensure bot is running continuously:
   - Bot must be online when reminder triggers
   - If bot is offline, reminders queue and fire on restart
4. Check database connection:
   - If using multi-instance, verify PostgreSQL is accessible
   - Check `docker compose logs` for connection errors
5. Verify queue is processing:
   - `/queue status` should show active jobs
   - If queue is stuck, `/queue flush` and retry
6. Check Discord permissions:
   - Bot needs SEND_MESSAGES in target channel
7. Restart queue if stuck:
   - `docker compose restart api` (worker process)

**Prevention:**
- Keep bot running 24/7 (use Docker/cloud hosting)
- Monitor queue status with `/queue status`
- Test reminders with short delays first
- Use PostgreSQL+Redis for reliability in multi-instance setups

### Tags not saving

**Problem:** Tags you create don't save or disappear after use.

**Symptoms:**
- `/tag save` succeeds but tag doesn't appear in list
- `/tag get` returns "Tag not found"
- Tag works once then disappears
- Tag list shows wrong data

**Solution:**
1. Verify tag save was successful:
   - Check bot response to `/tag save` — should confirm success
   - Immediately run `/tag list` to verify tag appears
2. Check database connection:
   - `/system` should show database status (green)
   - If using SQLite and running multiple instances, use PostgreSQL instead
3. Verify sufficient database permissions:
   - If using external database, check connection string
   - Verify database user has INSERT/SELECT permissions
4. Check tag naming:
   - Tags are case-sensitive
   - Avoid special characters in tag names
   - Use simple names like `hello`, `ping`, not `hello!` or `@ping`
5. Check for duplicate tags:
   - `/tag list` shows all tags
   - Delete duplicates: `/tag delete [name]`
6. Restart bot to flush cache:
   - `docker compose restart apollo`
7. Check logs for database errors:
   - `docker compose logs apollo | grep -i database`

**Prevention:**
- Test tag save/retrieve immediately after creation
- Use PostgreSQL instead of SQLite for production
- Avoid special characters in tag names
- Monitor database status with `/system`

### Giveaway issues

**Problem:** Giveaways don't work or don't select winners correctly.

**Symptoms:**
- `/giveaway create` fails or returns error
- Giveaway ends but no winner announced
- Same user wins multiple times
- Giveaway reactions don't register

**Solution:**
1. Verify giveaway is enabled and configured properly
2. Check required permissions:
   - Bot needs MANAGE_MESSAGES (for reactions)
   - Bot needs SEND_MESSAGES
   - Bot needs REACT permission
3. Verify giveaway parameters:
   - `/giveaway create [prize] [duration]` — duration in seconds/minutes
   - Example: `/giveaway create "Discord Nitro" 3600` (1 hour)
4. Ensure message is in public channel:
   - Giveaway must be in channel where users can react
   - Bot must be able to see reactions in that channel
5. Check if enough users reacted:
   - Giveaway needs at least 1 reaction to have a winner
   - Users must have reacted before giveaway ends
6. Verify queue is running:
   - Giveaway winner selection is queued job
   - `/queue status` should show processing jobs
7. Check logs: `docker compose logs apollo | grep -i giveaway`

**Prevention:**
- Test giveaway with short duration first
- Announce giveaway clearly so users know to react
- Monitor giveaway duration carefully
- Have backup winner selection plan if giveaway fails

### Warning system not enforcing thresholds

**Problem:** Users receive warnings but aren't kicked/muted at the configured threshold.

**Symptoms:**
- User has 3 warnings but hasn't been automatically actioned
- Warning threshold setting doesn't work
- Manual warnings work but automatic actions don't
- Warning count doesn't increase

**Solution:**
1. Check warning threshold is configured:
   - Verify in bot settings: `WARN_THRESHOLD=3` (example)
   - Default is usually 3 warnings = kick/mute
2. Verify moderation action is set:
   - Configure what happens at threshold: kick, mute, or ban
   - `/system` shows current threshold and action
3. Check bot permissions for the required action:
   - To kick: needs KICK_MEMBERS
   - To mute: needs MANAGE_ROLES
   - To ban: needs BAN_MEMBERS
4. Verify user role isn't protected:
   - Can't kick/mute users with higher roles
   - Check role hierarchy (bot role must be above target role)
5. Check if warnings were actually counted:
   - `/warn list [user]` shows warning count
   - Verify user ID is correct
6. Clear stuck warnings if needed:
   - `/warn clear [user]` removes all warnings
   - `/warn remove [user] [warning-id]` removes specific warning
7. Restart bot to refresh warning cache:
   - `docker compose restart apollo`

**Prevention:**
- Configure thresholds immediately after setup
- Test with low thresholds in test server first
- Monitor warning counts with `/warn list`
- Ensure role hierarchy allows bot actions

## Permission and Role Issues

### Missing administrator rights

**Problem:** You can't use admin commands even though you're a server administrator.

**Symptoms:**
- Admin commands return "You do not have permission"
- Regular users can use public commands but you can't use admin commands
- Works for some admins but not others
- Admin role doesn't give access to restricted commands

**Solution:**
1. Verify you have Administrator permission:
   - Server Settings → Roles → Your Role
   - Check "Administrator" permission is enabled
2. Check role hierarchy:
   - Your role position doesn't matter for Administrator permission
   - But bot role must be above your role to perform actions on you
3. Verify bot recognizes you as admin:
   - `/help` restricted to admins should work
   - If it doesn't, your permissions may not be syncing
4. Check command-specific permissions:
   - Some commands may require owner-only or specific roles
   - `/help [command]` shows permission requirements
5. Restart bot to clear permission cache:
   - `docker compose restart apollo`
6. If issue persists, check if you're in `OWNER_IDS`:
   - Some commands require OWNER_IDS configured
   - Update .env: `OWNER_IDS=your-user-id`
   - Restart bot

**Prevention:**
- Ensure bot role is near top of role hierarchy
- Assign Administrator permission to admin roles
- Keep OWNER_IDS updated in configuration
- Test permission changes after updating settings

### Role hierarchy problems

**Problem:** Bot can't manage users or roles in the way you expect.

**Symptoms:**
- Bot can't kick/mute users it should be able to
- Bot can't assign roles to users
- "Missing permissions" when bot tries to act on user
- Bot can't delete roles or channels

**Solution:**
1. Check bot role position:
   - Server Settings → Roles → Find bot role
   - Drag bot role to position ABOVE all roles it manages
   - Bot can only affect users with roles below it
2. Check specific role permissions:
   - Select each role bot role position is above
   - Verify bot has permission to manage that role (if restricted)
3. Verify target user's role:
   - If target has admin or higher role than bot, bot can't act on them
   - You must have higher role than target to give bot those permissions
4. Check channel-level role permissions:
   - Server Settings → Channels → [Channel] → Permissions
   - Find bot role, ensure it has required permissions
5. Verify bot role isn't muted or restricted:
   - Check if bot role is muted or has channel restrictions
   - Remove any explicit denies on bot role
6. Test with a simple action:
   - Try assigning a low role to a user
   - If this works, problem is with specific role setup

**Prevention:**
- Place bot role near top of hierarchy
- Regularly audit role positions
- Don't restrict bot role permissions
- Test role management after setup

### User permission conflicts

**Problem:** Users report permission issues that seem inconsistent or contradictory.

**Symptoms:**
- User A can do something but User B can't (unexpectedly)
- Permissions work in one channel but not another
- User with admin role can't use some commands
- Seems random or inconsistent

**Solution:**
1. Check user's roles in specific channel:
   - Right-click user → View Server Profile
   - Check all assigned roles
   - Check for channel-specific role overrides
2. Look for explicit permission denies:
   - Server Settings → Roles → [User Role]
   - Check if any permissions are set to "X" (deny)
3. Check channel-level permissions:
   - Channel Settings → Permissions
   - Look for user-specific or role-specific overrides
   - Remove conflicting permission settings
4. Verify user role hierarchy:
   - User's highest role determines their capabilities
   - Check if user's role is below what command requires
5. Check for muted status:
   - Right-click user → Check if muted or deafened
6. Try removing and re-adding user's role:
   - Remove the role that's causing issues
   - Wait 30 seconds
   - Re-add the role
7. Restart bot if issue is bot-related:
   - `docker compose restart apollo`

**Prevention:**
- Use role hierarchy consistently
- Avoid channel-specific overrides unless necessary
- Document which roles can use which commands
- Test permissions with different user roles before deploying

### Ticket channel permissions

**Problem:** Ticket system creates channels but with wrong permissions.

**Symptoms:**
- Ticket channel visible to everyone instead of just ticket creator
- User can't access their own ticket
- Bot can't manage ticket channel
- Ticket channel has too many permissions or too few

**Solution:**
1. Verify ticket category permissions:
   - Server Settings → Channels → Ticket Category
   - Check default permissions are restrictive (users: no access)
   - Bot should have full permissions
2. Check bot permissions in ticket category:
   - Bot needs MANAGE_CHANNELS, MANAGE_MESSAGES, SEND_MESSAGES
3. Manually fix existing ticket channel permissions:
   - Open ticket channel
   - Channel Settings → Permissions
   - Ensure ticket creator has access
   - Ensure other users don't
   - Ensure bot has all necessary permissions
4. Configure ticket auto-permissions:
   - In bot configuration, set ticket channel default permissions
   - Usually: creator=full access, others=no access, bot=full access
5. Check role overrides aren't interfering:
   - Remove any role-based permission overrides on ticket channels
6. Delete and recreate tickets:
   - `/ticket delete [ticket-id]` to remove old ticket
   - Create new ticket to test permissions

**Prevention:**
- Set up ticket category with proper default permissions before enabling system
- Test ticket creation immediately after setup
- Monitor new ticket permissions
- Fix permission issues immediately when found

## Database and Queue Issues

### Database connection errors

**Problem:** Bot reports database errors or can't save/retrieve data.

**Symptoms:**
- "Database connection error" message
- Features that require database don't work
- Data isn't saved after commands
- Bot logs show database connection timeouts
- `/system` shows database status as red/offline

**Solution:**
1. Check database is running:
   - Docker: `docker compose ps` — PostgreSQL should be "Up"
   - Manual: verify PostgreSQL service is running
2. Verify database credentials:
   - Check `.env` file: `DATABASE_URL` is correct
   - Verify hostname, port, username, password
   - Test connection: `psql $DATABASE_URL` (with psql installed)
3. Check database exists:
   - If using PostgreSQL, database must be created
   - Run migrations: `npm run migrate` or `pnpm migrate`
4. Verify network connectivity:
   - From bot container, can reach database: `docker exec apollo ping postgres`
   - If network isolated, ensure services are on same network
5. Check database permissions:
   - Database user needs CREATE, SELECT, INSERT, UPDATE, DELETE permissions
   - Verify in PostgreSQL: `\du` shows user permissions
6. Check migrations are applied:
   - `docker compose logs apollo | grep -i migrat`
   - If migrations failed, they must be fixed before proceeding
7. Restart database container:
   - `docker compose restart postgres`
   - Wait for container to be healthy: `docker compose ps`

**Prevention:**
- Use PostgreSQL for production, not SQLite
- Back up database regularly
- Monitor database logs: `docker compose logs postgres`
- Test database connection after any configuration changes

### Job queue backed up

**Problem:** The work queue is accumulating jobs and not processing them.

**Symptoms:**
- `/queue status` shows high number of pending jobs
- Jobs take much longer than expected to process
- `/queue flush` needed frequently
- Bot becomes slow or unresponsive

**Solution:**
1. Check queue status:
   - `/queue status` — shows pending, active, and failed jobs
   - `/queue list` — shows queued jobs with details
2. Verify queue is running:
   - `docker compose ps` — worker process should be "Up"
   - Check logs: `docker compose logs -f api` (or worker service)
3. If queue is stuck, flush it:
   - `/queue flush` — removes all pending jobs (WARNING: loses data)
   - Only use if jobs are definitely failed
4. Check Redis connection:
   - `docker exec apollo redis-cli ping` — should return "PONG"
   - If connection fails, Redis is down or unreachable
5. Check for failed jobs:
   - `/queue list --status failed` shows failed jobs
   - Review logs to see why jobs are failing
   - Fix underlying issue (permissions, database, etc.)
6. Increase worker capacity:
   - If jobs are processing slowly, add more workers
   - `docker compose --profile multi up -d` scales workers
   - Or increase `WORKER_CONCURRENCY` in .env
7. Restart queue:
   - `docker compose restart api`
   - Monitor logs: `docker compose logs -f api`

**Prevention:**
- Monitor queue with `/queue status` regularly
- Address failed jobs immediately
- Use multiple workers in production
- Monitor job latency to catch issues early

### Reminder/tag data lost

**Problem:** Your reminders or tags disappeared after bot restart or crash.

**Symptoms:**
- Data was there before restart but gone after
- `list` commands show no data
- Database shows data but features don't use it
- Partial data loss (some entries missing)

**Solution:**
1. Check database for data:
   - If using PostgreSQL, query directly: `psql $DATABASE_URL -c "SELECT * FROM reminders;"`
   - If using SQLite, check `.db` file exists and isn't empty
   - Data may be in database but not loaded in memory
2. Restart bot to reload cache:
   - `docker compose restart apollo`
   - Wait for bot to fully start (check logs)
   - Data should re-appear after cache reload
3. Verify database wasn't wiped:
   - Check database backups if available
   - Look for recent migrations that might have cleared data
   - Restore from backup if data is missing
4. Check for duplicate data:
   - May have data in multiple places (cache vs database)
   - `/reminder list` should show canonical list
5. If data is truly lost and no backup exists:
   - Recreate data manually
   - Set up automated backups going forward
6. Check database migration status:
   - Failed migrations can cause data loss
   - Review migration logs: `docker compose logs apollo | grep -i migrat`

**Prevention:**
- Use PostgreSQL for reliability (not SQLite)
- Set up automated database backups
- Don't restart bot during migrations
- Keep backups off the server (cloud storage)
- Test database before relying on it

## Performance and Stability Issues

### Bot is slow or unresponsive

**Problem:** Commands take a long time to respond or bot seems to hang.

**Symptoms:**
- Commands take 5+ seconds to respond
- Bot stops responding entirely for periods of time
- Other users report same slowness
- Bot's status shows "away" or offline

**Solution:**
1. Check bot latency:
   - `/ping` shows response time — should be less than 500ms
   - If more than 1000ms, bot is overloaded
2. Check server resources:
   - `docker stats apollo` shows CPU and memory usage
   - If CPU is 100% or memory high, bot is overloaded
   - May need faster server or more resources
3. Monitor active connections:
   - `/system` shows number of shards and connections
   - Too many shards on one bot instance causes slowness
4. Check database performance:
   - Slow database queries block bot responses
   - `docker compose logs apollo | grep -i slow`
   - Consider database optimization or query caching
5. Monitor queue backlog:
   - `/queue status` — if many pending jobs, bot processes slowly
   - `/queue flush` if stuck
   - Add more workers if queue constantly backed up
6. Check for error loops:
   - If bot encounters repeated errors, it spends time retrying
   - Fix underlying errors first
7. Restart bot to clear caches:
   - `docker compose restart apollo`

**Prevention:**
- Monitor `/ping` regularly
- Set up resource alerts
- Monitor queue status daily
- Plan for scaling as user base grows

### Memory usage too high

**Problem:** Bot consumes excessive RAM or crashes due to out-of-memory.

**Symptoms:**
- `docker stats` shows bot using more than 500MB (high for Discord bot)
- Bot crashes with "out of memory" error
- Docker container is killed and restarts
- Memory usage increases over time

**Solution:**
1. Check current memory usage:
   - `docker stats apollo` — shows current RAM usage
   - `docker logs apollo | grep -i memory`
2. Identify memory leak:
   - Monitor memory over time: `watch docker stats apollo`
   - If memory keeps growing, there's a leak
   - Restart bot to clear memory: `docker compose restart apollo`
3. Find leaking feature:
   - Review logs for errors that repeat
   - Disable features one by one to isolate
   - Check which commands are used before memory spike
4. Clear caches:
   - Restart bot: `docker compose restart apollo`
   - Clear temporary files: `docker exec apollo rm -rf /tmp/*`
5. Limit caching:
   - Configure bot to cache fewer items in memory
   - Use database queries instead of in-memory cache
6. Check for stuck connections:
   - Many unclosed database/socket connections leak memory
   - Restart bot services: `docker compose restart`
7. Upgrade container memory limit:
   - In Docker Compose, set memory limit: `mem_limit: 1g`

**Prevention:**
- Monitor memory usage: `watch docker stats apollo`
- Set up alerts for high memory usage
- Restart bot periodically (weekly)
- Use external caching (Redis) instead of in-process
- Profile memory usage during development

### Frequent disconnections

**Problem:** Bot disconnects from Discord repeatedly or loses connection unexpectedly.

**Symptoms:**
- Bot goes offline and comes back online repeatedly
- "Bot reconnected" appears in logs frequently
- Commands fail with "not connected" error
- Happens at specific times or randomly

**Solution:**
1. Check bot online status:
   - Check Discord server — bot member list
   - `docker logs apollo | grep -i disconnect`
2. Verify network connectivity:
   - From bot container: `docker exec apollo ping 8.8.8.8`
   - Check internet connection isn't dropping
3. Check Discord API status:
   - Visit [Discord status page](https://discordstatus.com)
   - May be Discord outages, not your bot
4. Check for rate limiting:
   - If bot is rate limited by Discord, it disconnects
   - `docker logs apollo | grep -i rate`
   - Reduce command usage if rate limited
5. Verify bot token is valid:
   - Expired or invalidated tokens cause disconnections
   - Regenerate token in Discord Developer Portal if needed
   - Update `.env` with new token and restart
6. Check for resource issues:
   - Low memory or CPU causes disconnections
   - `docker stats apollo`
   - Increase resources if usage is very high
7. Check logs for specific errors:
   - `docker logs apollo | tail -50`
   - Look for "FATAL", "ERROR" messages
8. Restart bot:
   - `docker compose restart apollo`

**Prevention:**
- Monitor disconnect logs
- Keep Discord API token secure and don't regenerate unnecessarily
- Monitor network connectivity
- Check Discord status page before investigating
- Set up reconnection logging/alerts

### Rate limiting

**Problem:** Discord is rate limiting your bot or users are experiencing rate limit delays.

**Symptoms:**
- Commands return 429 (Too Many Requests) error
- "Rate limited. Try again in X seconds"
- Multiple users report slow bot response
- Many commands in quick succession timeout
- Logs show repeated rate limit warnings

**Solution:**
1. Reduce command frequency:
   - Don't use commands more than once per second
   - Space out bulk operations (e.g., muting multiple users)
2. Check what's causing limits:
   - Monitor which commands are used most
   - May be user flood rather than bot issue
3. Implement command cooldowns:
   - Bot should already have cooldowns
   - Increase cooldown times if rate limiting continues
4. Optimize command efficiency:
   - Batch operations when possible
   - Avoid making multiple API calls for one command
5. Check for user bots or spam:
   - Rate limiting may be caused by users running bots
   - Look for unusual command patterns
6. Contact Discord support if limits seem wrong:
   - If bot is being rate limited incorrectly, contact Discord
   - Provide command usage logs as evidence
7. Use Discord bucket-aware requests:
   - Ensure bot spreads requests across time
   - Don't burst all requests at once

**Prevention:**
- Monitor rate limit headers in logs
- Implement efficient commands
- Set reasonable cooldowns
- Test with load before production

## Getting Help

### Where to report issues

If you've worked through troubleshooting but still have problems:

1. **Check existing issues** — Search [GitHub Issues](https://github.com/The-A-P-O-L-L-O-Organization/Apollo-Discord-Bot/issues)
2. **Create new issue** — If your problem isn't reported, [create an issue](https://github.com/The-A-P-O-L-L-O-Organization/Apollo-Discord-Bot/issues/new) with details
3. **Join support Discord** — Link available in repository README
4. **Email support** — Contact information in repository

### How to provide helpful information

When reporting an issue, include:

- **Exact error message** — Copy the full error text from logs or Discord
- **Steps to reproduce** — What exactly did you do when the issue occurred?
- **Screenshots** — Show the error or unexpected behavior visually
- **Bot version** — What version of Apollo are you running?
- **Discord version** — What Discord client version (or "web")?
- **Logs** — Relevant log output: `docker compose logs apollo | tail -100`
- **System info** — OS, Docker version, hardware specs if relevant
- **What you've tried** — What troubleshooting steps have you already done?
- **Expected behavior** — What should have happened?
- **Actual behavior** — What actually happened?

### Contact information

- **GitHub**: [Apollo Discord Bot Repository](https://github.com/The-A-P-O-L-L-O-Organization/Apollo-Discord-Bot)
- **Issues**: [GitHub Issues](https://github.com/The-A-P-O-L-L-O-Organization/Apollo-Discord-Bot/issues)
- **Documentation**: [Apollo Org Docs](https://docs.apolloorg.com)

## FAQ

### How do I reset all bot settings to defaults?

To reset the bot to a clean state:

1. Back up your database: `docker compose exec postgres pg_dump -U apollo apollo > backup.sql`
2. Clear data: Run reset command or delete database
3. Restart bot with fresh configuration
4. Re-deploy slash commands: `node deploy-commands.js`

Alternatively, keep `.env` and database but restart bot: `docker compose restart apollo`

### Can I migrate data between servers?

Partial migration is possible but complex:

1. Export data from source server database
2. Clean data to remove server-specific references (channel IDs, user IDs, etc.)
3. Import into target server database
4. Manually update server-specific IDs

Most data (reminders, tags, etc.) won't migrate well due to Discord IDs being server-specific. You may need to recreate tags and settings manually in new server.

### What data is stored and where?

Apollo stores:

- **Database (PostgreSQL or SQLite)**:
  - User warnings and moderation history
  - Tags and saved responses
  - Reminders and scheduled tasks
  - Ticket system data
  - Server settings and configuration
  
- **Memory (temporary)**:
  - User cache for faster lookups
  - Command cooldowns
  - Recent message content

- **Redis (if enabled)**:
  - Job queue (reminders, scheduled actions)
  - Session data
  - Cache

Data is NOT stored:
- Message content (beyond recent processing)
- Voice activity logs
- Private user data beyond what Discord provides

### How do I backup my data?

```bash
# PostgreSQL backup
docker compose exec postgres pg_dump -U apollo apollo > backup.sql

# Restore from backup
docker compose exec -T postgres psql -U apollo apollo < backup.sql

# SQLite backup (if using SQLite)
cp apollo.db apollo.db.backup
```

Store backups securely and test restoration periodically.

### Why is my ticket getting auto-closed?

Tickets may auto-close after:
- 7 days of inactivity (default)
- Manual archive request
- Server configuration timeout

To prevent auto-close:
- Respond in ticket to keep it active
- Ask admin to extend ticket lifetime in settings
- Disable auto-close feature if not needed

### How do I update the bot?

```bash
# Pull latest code
git pull origin main

# Update dependencies
pnpm install

# Rebuild Docker image
docker compose down
docker compose up -d

# Deploy updated slash commands
node deploy-commands.js
```

Or with Docker only:
```bash
docker compose down
docker pull <bot-image>
docker compose up -d
```

### What should I do if the bot crashes?

1. Check logs: `docker compose logs apollo | tail -50`
2. Look for error messages indicating the cause
3. Fix the underlying issue (permissions, configuration, etc.)
4. Restart: `docker compose restart apollo`
5. If crashes continue, escalate to GitHub issues with logs

### How do I enable debug logging?

Set `DEBUG=*` in `.env` to see verbose logs:

```bash
DEBUG=* docker compose up
```

Or for specific modules:
```bash
DEBUG=apollo:* docker compose up
```

Then check logs: `docker compose logs -f apollo`

---

## Related Topics

- **[User Guide](./user-guide.md)** — Commands and features overview
- **[Command Reference](./command-reference.md)** — Complete command documentation
- **[Developer Guide](./developer-guide.md)** — Development setup and extension
- **[Setup Guide](./intro.md)** — Installation and configuration
- **[GitHub Repository](https://github.com/The-A-P-O-L-L-O-Organization/Apollo-Discord-Bot)** — Source code and issue tracking
