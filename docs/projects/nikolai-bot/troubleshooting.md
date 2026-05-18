---
sidebar_position: 5
---

# Troubleshooting

Solutions for common issues with Nikolai-Bot

This guide helps you resolve common problems with Nikolai-Bot setup, gameplay, and game management. Follow the steps for your specific issue.

## Setup Issues

### Database Connection Errors

**Problem:** "Failed to connect to MongoDB" or "Connection timeout" errors in logs

**Symptoms:**
- Bot starts but cannot execute any commands
- Error message: `MongoNetworkError` or `ECONNREFUSED`
- Commands return "Database connection failed"

**Solution:**

1. **Verify MongoDB is running:**
   ```bash
   # For local MongoDB
   sudo systemctl status mongod
   
   # Start if not running
   sudo systemctl start mongod
   ```

2. **Check connection string in `.env`:**
   ```bash
   # Local MongoDB (default)
   MONGODB_URI=mongodb://localhost:27017
   
   # MongoDB Atlas (cloud)
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true
   ```

3. **Verify credentials for MongoDB Atlas:**
   - Username and password are URL-encoded
   - Special characters like `@` should be `%40`
   - Example: `password@123` becomes `password%40123`

4. **Check firewall if using remote MongoDB:**
   ```bash
   # Test connectivity
   ping mongodb.example.com
   telnet mongodb.example.com 27017
   ```

5. **Review bot logs:**
   ```bash
   npm run dev
   # Look for detailed error messages
   ```

**Prevention:**
- Test MongoDB connection before starting the bot
- Keep MongoDB version 6+ updated
- Monitor disk space (MongoDB needs space to operate)
- Set up regular backups

### Discord Token Invalid

**Problem:** "Invalid token" or "401 Unauthorized" error

**Symptoms:**
- Bot won't start, exits immediately
- Error message: `Invalid token provided`
- No bot appears in Discord server

**Solution:**

1. **Verify Discord token format:**
   - Token should be 60+ characters long
   - Should NOT include any spaces or quotes
   - Check `.env` file:
   ```
   DISCORD_TOKEN=your_token_here_no_quotes
   ```

2. **Get a fresh token from Discord:**
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Click your application
   - Go to "Bot" section
   - Click "Reset Token"
   - Copy the new token immediately
   - Replace old token in `.env`

3. **Verify bot has required permissions:**
   - OAuth2 → Scopes: Select `bot`
   - Bot Permissions: Select `Administrator` (or specific permissions)
   - Copy the generated URL and invite bot to your server

4. **Restart the bot:**
   ```bash
   npm start
   ```

**Prevention:**
- Never commit `.env` file to git
- Rotate tokens monthly
- Use separate tokens for development and production

### Bot Won't Start

**Problem:** Bot exits or fails to initialize

**Symptoms:**
- Process exits immediately after starting
- No error message or unclear error
- "Cannot read property of undefined"

**Solution:**

1. **Check for required environment variables:**
   ```bash
   # All these must be set in .env
   grep -E "DISCORD_TOKEN|MONGODB_URI|GUILD_ID" .env
   ```

2. **Verify `.env` file exists:**
   ```bash
   ls -la .env
   # Should exist and not be empty
   ```

3. **Review detailed logs:**
   ```bash
   npm run dev
   # This shows more detailed logging than `npm start`
   ```

4. **Check Node.js version:**
   ```bash
   node --version
   # Should be 18.0.0 or higher
   ```

5. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

6. **Check for syntax errors in code:**
   ```bash
   npm run typecheck
   ```

**Prevention:**
- Always use `npm run dev` during development
- Keep error logs for debugging
- Test after pulling code changes

### Port Already in Use

**Problem:** "Address already in use" error

**Symptoms:**
- Error mentioning a specific port number
- Bot won't start, says port is occupied
- Error: `EADDRINUSE`

**Solution:**

1. **Find what's using the port:**
   ```bash
   # Find process using port (example port 3000)
   lsof -i :3000
   # or
   netstat -tulpn | grep 3000
   ```

2. **Kill the process (if it's yours):**
   ```bash
   kill -9 <PID>
   # where PID is from the command above
   ```

3. **Use a different port:**
   - Edit your configuration to use a different port
   - Or wait for the original process to properly terminate

**Prevention:**
- Always use `npm stop` or Ctrl+C to stop the bot properly
- Monitor running processes: `ps aux | grep node`

## Game Management Issues

### Nations Not Creating

**Problem:** `/nation create` command fails or doesn't create nation

**Symptoms:**
- Command responds with error message
- "Nation already exists" error despite different name
- Database error in logs

**Solution:**

1. **Check if user already leads a nation:**
   ```
   /nation profile [your_username]
   # If this shows a nation, you already have one
   ```

2. **Verify unique nation name:**
   - Nation names must be unique across the game
   - Check global rankings for existing nations
   - Try a different name

3. **Check user permissions:**
   - Must have permission to use commands
   - Check Discord roles and permissions

4. **Verify database connection:**
   - See "Database Connection Errors" section above
   - Check logs for database errors

5. **Check population constraints:**
   - Minimum population: 100,000
   - Population must be an integer

**Prevention:**
- Document nation creation requirements
- Display helpful error messages to players
- Validate input before database operations

### Turn Processing Not Happening

**Problem:** Turns don't process on schedule

**Symptoms:**
- Turn counter doesn't increment
- No turn reminders sent
- Game state doesn't advance

**Solution:**

1. **Verify turn interval configuration:**
   ```
   /admin config setting:turn_interval value:12
   # Default is 12 hours
   ```

2. **Check if bot is running:**
   ```bash
   # Verify process is still running
   ps aux | grep node
   # Check for crashes in logs
   npm run dev
   ```

3. **Review event system logs:**
   - Look for "turn processing" messages
   - Check for errors during turn execution
   - Verify MongoDB connection during turn processing

4. **Manually trigger turn (Admin):**
   ```
   /admin turn process
   # Forces immediate turn processing
   ```

5. **Check server uptime:**
   - Turn processing requires bot to be running
   - If bot crashes, turns won't process
   - Set up process manager (PM2) to auto-restart:
   ```bash
   npm install -g pm2
   pm2 start index.js --name "nikolai-bot"
   pm2 save
   pm2 startup
   ```

**Prevention:**
- Monitor bot uptime regularly
- Set up alerts for bot crashes
- Test turn processing in development
- Keep bot running 24/7 using process manager

### Commands Not Working for Players

**Problem:** Players get "permission denied" or commands don't execute

**Symptoms:**
- Commands work for GM, not for players
- "You don't have permission" errors
- Commands fail silently

**Solution:**

1. **Verify player has nation:**
   ```
   /nation profile [player_name]
   # Player must lead or be member of a nation
   ```

2. **Check role assignments:**
   ```
   # Ensure player is set as Nation Leader or Member
   # Use admin commands to verify/fix roles
   ```

3. **Review command requirements:**
   - Some commands require Nation Leader
   - Some work for Nation Members too
   - See [Command Reference](./command-reference.md) for requirements

4. **Check Discord permissions:**
   - Verify bot has "Administrator" permission in Discord
   - Check channel-specific permissions
   - Ensure bot can send messages to player

5. **Test with simpler commands:**
   ```
   /nation profile [player_nation]
   # This should work for anyone
   ```

**Prevention:**
- Document permission requirements
- Provide clear error messages
- Add permission checks at command start

### Permission Denied Errors

**Problem:** User gets "permission denied" for allowed command

**Symptoms:**
- User is Nation Leader but gets denied
- Error: "You must be nation leader to execute"
- Admin commands return permission errors

**Solution:**

1. **Verify nation ownership:**
   ```
   # Check who is listed as nation leader
   /admin nations action:list
   # Find your nation and check leader ID
   ```

2. **Fix nation leadership if needed (Admin):**
   ```
   /admin nation [nation_name] transfer [discord_id]
   # Transfer leadership to correct user
   ```

3. **Check Discord user ID:**
   - Your Discord ID should match in database
   - Enable Developer Mode in Discord settings
   - Right-click username and "Copy ID"

4. **Reload the bot:**
   ```bash
   # Restart bot to clear any cached permissions
   npm start
   ```

**Prevention:**
- Log permission checks in audit trail
- Provide helpful feedback about who can use command
- Verify ownership before executing sensitive commands

## Economy Issues

### Money Not Transferring

**Problem:** `/transfer` command fails or money disappears

**Symptoms:**
- Transfer appears to work but funds don't arrive
- Error during transfer execution
- Both nations losing money

**Solution:**

1. **Verify sufficient funds:**
   ```
   /economy view
   # Check available budget before transfer
   ```

2. **Check transfer amount:**
   - Minimum transfer: 1,000
   - Cannot transfer more than you have
   - Verify exact amount before sending

3. **Verify recipient nation exists:**
   ```
   /nation profile [recipient_nation]
   # Nation must exist in the system
   ```

4. **Review transaction history:**
   ```
   /transactions history days:1
   # Check if transfer was recorded
   ```

5. **Check for transaction errors in logs:**
   ```bash
   npm run dev
   # Look for database errors during transfer
   ```

6. **Rollback transaction if needed (Admin):**
   - Check audit log for transaction ID
   - Admin can manually reverse transfers using database

**Prevention:**
- Verify both nations before transfer
- Send confirmation of transfer amount
- Keep detailed transaction history
- Test transfers in development

### Loan System Broken

**Problem:** `/loan request` or `/loan repay` fails

**Symptoms:**
- Can't request loans
- Loan balance doesn't update
- Interest doesn't calculate

**Solution:**

1. **Check loan eligibility:**
   - Must have minimum GDP (typically 100,000)
   - Stability must be above 20%
   - Cannot exceed debt-to-GDP ratio limit

2. **Verify loan amount:**
   - Minimum loan: 1,000
   - Maximum varies by GDP
   - Cannot borrow more than 5x annual GDP

3. **Calculate expected interest:**
   - Base rate: 5% per turn
   - Additional rate for high debt-to-GDP
   - Check: `/economy view` for current debt

4. **Check repayment amount:**
   - Partial repayments allowed
   - Cannot repay more than owed
   - Interest added each turn

5. **Review finance service logs:**
   - Check for calculation errors
   - Verify database updates

**Prevention:**
- Explain loan system clearly to players
- Display interest rates in command output
- Show repayment schedule in detail
- Cap maximum debt to prevent abuse

### Trade Routes Not Working

**Problem:** Trade agreements not providing benefits

**Symptoms:**
- Trade route created but no benefits
- Trade income doesn't appear
- Trade cancellation fails

**Solution:**

1. **Verify trade route exists:**
   ```
   /trade view
   # Should show active trade routes
   ```

2. **Check trade route status:**
   - Both nations must have agreed
   - Neither nation at war (suspends trade)
   - Trade not sanctioned or blocked

3. **Verify trade benefits calculation:**
   - Should see income in `/economy view`
   - Benefits apply at turn processing
   - Check previous turn for actual income

4. **Review trade history:**
   ```
   /transactions history filter:trade
   # Should show trade income transactions
   ```

5. **Check for blocked trade:**
   ```
   /sanction view
   # Sanctions prevent trade
   ```

6. **Restart trade route if needed:**
   - Cancel existing route: `/trade cancel`
   - Propose new route: `/trade propose`
   - Wait for both nations to accept

**Prevention:**
- Show trade benefits in clear terms
- Display expected income per turn
- Notify both players of trade agreements
- Log all trade transactions

### Sanctions Not Enforcing

**Problem:** Sanctions don't reduce target GDP or prevent trade

**Symptoms:**
- Sanctioned nation shows full GDP
- Trade continues despite sanctions
- Sanction appears imposed but has no effect

**Solution:**

1. **Verify sanction is active:**
   ```
   /sanction view [target_nation]
   # Should show active sanctions
   ```

2. **Check sanction duration:**
   - Sanctions must not have expired
   - Check turn counter vs sanction duration
   - Admin can extend sanctions

3. **Verify GDP reduction applied:**
   - Sanction reduces GDP by 10% per active sanction
   - Check previous turn's GDP vs current
   - Reduction should be visible in trends

4. **Check trade blocking:**
   - Sanctions should block new trade routes
   - Existing routes may need manual cancellation
   - Verify none of the target's trade is active

5. **Review sanction logs:**
   - Check when sanction was applied
   - Verify it's in the system
   - Look for removal or expiration

**Prevention:**
- Clearly display active sanctions
- Show GDP reduction in statistics
- Log all sanction events
- Set expiration reminders

## Military Issues

### Units Not Building

**Problem:** Military units don't complete or get stuck in production queue

**Symptoms:**
- Production queue shows units
- Units don't complete after expected time
- Production progress doesn't advance

**Solution:**

1. **Verify production queue:**
   ```
   /military queue action:list
   # Should show queued units with completion time
   ```

2. **Check required budget:**
   - Unit production requires budget allocation
   - Review: `/economy budget`
   - Ensure military budget is allocated

3. **Check infrastructure level:**
   - Higher infrastructure = faster production
   - Low infrastructure extends production time
   - Minimal infrastructure may delay production significantly

4. **Verify production calculation:**
   - Army unit: 3 turns
   - Navy vessel: 5 turns
   - Air force: 4 turns
   - Time may increase with population or GDP constraints

5. **Check turn processing:**
   - Units only complete during turn processing
   - Verify turns are processing normally
   - See "Turn Processing Not Happening" section

6. **Cancel and re-queue if stuck:**
   ```
   /military queue action:cancel
   /military produce type:army quantity:1
   ```

**Prevention:**
- Allocate adequate military budget
- Build infrastructure early
- Show production progress clearly
- Log production completion events

### Battle Simulator Errors

**Problem:** `/battle simulate` fails or shows incorrect results

**Symptoms:**
- "Error calculating battle" message
- Unrealistic casualty numbers
- Same result every time (not varied)

**Solution:**

1. **Verify both nations exist:**
   ```
   /nation profile [attacker]
   /nation profile [defender]
   # Both must exist and have military
   ```

2. **Check military strength:**
   ```
   /military view
   # Both nations must have units to simulate
   ```

3. **Verify doctrine is set:**
   ```
   /doctrine set type:balanced
   # Default to balanced if none set
   ```

4. **Check battle simulator service:**
   - Verify combat calculation service is running
   - Review logs for calculation errors
   - Check for invalid unit data

5. **Reset and retry:**
   - Clear cache: `npm restart`
   - Try simulating again with different parameters
   - Check logs for detailed error

**Prevention:**
- Test battle simulator before deployment
- Log all battle calculations
- Validate input before simulation
- Use consistent random seeding for reproducibility (or disable for variance)

### Occupation Not Working

**Problem:** Occupied territories not providing benefits or managing incorrectly

**Symptoms:**
- Occupation policy doesn't apply
- Territory doesn't provide resources
- Occupation ends prematurely

**Solution:**

1. **Verify territories are occupied:**
   ```
   /occupation manage [territory]
   # Should show current occupation policy
   ```

2. **Check occupation policy:**
   - Policies: harsh, moderate, lenient, military_control, economic_integration
   - Different policies provide different benefits
   - Policy changes take effect next turn

3. **Verify territory was conquered in war:**
   - Must result from actual war victory
   - Territory must belong to defeated nation
   - Check war history for confirmation

4. **Review occupation benefits:**
   - Harsh: +resources, -stability
   - Moderate: balanced
   - Lenient: low resources, high stability
   - Check `/economy view` for resource income

5. **Check for revolt:**
   - Low stability in occupied territory can cause revolts
   - Revolutions may end occupation
   - Increase stability with lenient policies

**Prevention:**
- Show occupation status clearly
- Display policy benefits
- Log occupation changes
- Monitor stability in occupied territories

### Doctrine Not Applying

**Problem:** Military doctrine doesn't affect unit strength or battle results

**Symptoms:**
- Doctrine set but no stat changes
- Battle results unaffected by doctrine
- Doctrine setting doesn't persist

**Solution:**

1. **Verify doctrine is set:**
   ```
   /doctrine set type:offensive
   # Should confirm with success message
   ```

2. **Check doctrine persistence:**
   ```
   /military view
   # Should show current doctrine in display
   ```

3. **Verify doctrine affects battles:**
   - Doctrine provides percentage bonuses/penalties
   - Simulate battle before/after setting doctrine
   - Compare results for differences

4. **Check available doctrines:**
   - Offensive, Defensive, Balanced, Blitzkrieg, Attrition
   - Verify all are available (no disabled doctrines)

5. **Review service logs:**
   - Check if doctrine service is running
   - Look for calculation errors
   - Verify doctrine data in database

6. **Reset doctrine:**
   ```
   /doctrine set type:balanced
   # Reset to default
   /doctrine set type:offensive
   # Re-apply
   ```

**Prevention:**
- Show doctrine bonus/penalty clearly
- Log doctrine changes
- Test doctrine effects before deployment
- Validate doctrine selection

## Data Issues

### Data Loss or Corruption

**Problem:** Nation data missing, inconsistent, or corrupted

**Symptoms:**
- Nation statistics are wrong or zero
- Commands returning errors about missing data
- Historical data suddenly gone

**Solution:**

1. **Verify database is accessible:**
   ```bash
   # Connect to MongoDB
   mongosh mongodb://localhost:27017/nikolai_bot
   # List collections
   show collections
   # Check nation documents
   db.nations.find().limit(1)
   ```

2. **Check for recent backups:**
   ```bash
   # List backup files
   ls -la backups/
   # Restore from recent backup if available
   ```

3. **Identify affected data:**
   - Check audit logs for when data changed
   - Look for unusual database operations
   - Review transaction history

4. **Partial data recovery:**
   - Can recover from audit logs what was lost
   - Rebuild nation statistics from transaction logs
   - Contact bot maintainers for data recovery tools

5. **Prevent future loss:**
   - Set up automated daily backups:
   ```bash
   # Add to crontab
   0 2 * * * mongodump --out=/backups/$(date +\%Y\%m\%d)
   ```

**Prevention:**
- Automated daily backups
- Database replication for redundancy
- Regular restore tests
- Monitor database disk space

### Sync Errors Between Commands

**Problem:** Inconsistent data when running multiple commands

**Symptoms:**
- /economy view shows different total than /transactions
- Nation statistics don't add up
- Conflicting information from different commands

**Solution:**

1. **Check for simultaneous command execution:**
   - Multiple users running commands at same time
   - Race conditions in database updates
   - Transactions not properly isolated

2. **Review transaction logs:**
   ```
   /transactions history days:1
   # Look for transactions that don't match displayed totals
   ```

3. **Rebuild statistics:**
   ```
   /admin rebuild statistics [nation]
   # Recalculate all derived stats from base data
   ```

4. **Check database consistency:**
   ```bash
   # In MongoDB
   db.nations.find({gdp: {$lt: 0}})
   # Look for impossible values
   ```

5. **Force consistency check:**
   ```
   /admin check consistency
   # Scan and report all inconsistencies
   ```

**Prevention:**
- Use database transactions for multi-step operations
- Implement consistency checks
- Use locks when updating related documents
- Log all data modifications

### Transaction Audit Missing

**Problem:** Transactions not appearing in audit logs

**Symptoms:**
- Money transferred but `/transactions` doesn't show it
- Audit logs incomplete or missing entries
- Can't investigate suspicious activity

**Solution:**

1. **Verify audit logging is enabled:**
   ```
   /admin config setting:audit_logging value:enabled
   ```

2. **Check audit log collection:**
   ```bash
   db.auditlogs.find().count()
   # Should have many entries
   ```

3. **Look for recent transactions:**
   ```
   /transactions history days:1
   # Filter by date range
   ```

4. **Check for audit service errors:**
   - Review bot logs for audit service errors
   - Restart audit logging if needed
   - Check database connection during logging

5. **Rebuild audit logs (Admin):**
   ```
   /admin rebuild auditlog
   # Reconstruct from database changes
   ```

**Prevention:**
- Log every transaction immediately
- Use separate audit collection
- Don't delete audit records
- Replicate audit logs to backup storage

### Nation Data Incomplete

**Problem:** Missing statistics or properties on nation

**Symptoms:**
- Nation shows in profile but missing fields
- Commands fail due to missing data
- Partial nation creation

**Solution:**

1. **Check which fields are missing:**
   ```bash
   db.nations.findOne({_id: ObjectId("...")})
   # Review all fields
   ```

2. **Complete missing data:**
   ```
   /admin nation [name] fix incomplete
   # Fills in missing fields with defaults
   ```

3. **Restore from creation data:**
   - Check what was provided at creation
   - Fill in reasonable defaults
   - Notify players of recovered data

4. **Prevent future incompleteness:**
   - Validate all required fields at creation
   - Use database schema validation
   - Test nation creation thoroughly

**Prevention:**
- Require all nation fields before save
- Use TypeScript or schema validation
- Test edge cases in creation
- Audit nation creation process

## Performance Issues

### Bot Slow or Unresponsive

**Problem:** Commands take long time to execute or timeout

**Symptoms:**
- Discord shows "This interaction failed"
- 3-second timeout for commands
- Laggy response to interactions

**Solution:**

1. **Check bot process:**
   ```bash
   ps aux | grep node
   # Check CPU and memory usage
   ```

2. **Monitor memory usage:**
   ```bash
   # Watch memory in real time
   watch -n 1 'free -h'
   # Bot shouldn't use more than 500MB
   ```

3. **Check database performance:**
   - Slow queries can cause delays
   - Index frequently queried fields:
   ```bash
   db.nations.createIndex({discordUserId: 1})
   db.economies.createIndex({nationId: 1})
   ```

4. **Reduce command complexity:**
   - Some commands do too much processing
   - Break into smaller operations
   - Cache expensive calculations

5. **Scale MongoDB:**
   - Add indexes for frequently queried fields
   - Increase available memory
   - Consider database sharding for very large datasets

6. **Restart the bot:**
   ```bash
   npm restart
   # Clear any memory leaks
   ```

**Prevention:**
- Monitor bot memory periodically
- Profile slow commands in development
- Set up alerts for high resource usage
- Optimize database queries

### Turn Processing Taking Too Long

**Problem:** Turn processing takes hours instead of minutes

**Symptoms:**
- Turn doesn't complete by scheduled time
- Bot becomes unresponsive during turn
- "Turn processing" log entry for extended time

**Solution:**

1. **Monitor turn execution:**
   - Check logs for slow steps
   - Time each phase (events, resource generation, etc.)
   - Identify the bottleneck

2. **Optimize event generation:**
   - Random events might be expensive to generate
   - Cache event definitions
   - Batch event processing

3. **Optimize economy calculations:**
   - GDP, budget, transaction calculations for all nations
   - Use batch operations instead of individual updates
   - Cache calculation results

4. **Check database load:**
   ```bash
   # Monitor queries during turn
   db.currentOp({secs_running: {$gte: 1}})
   ```

5. **Increase turn interval temporarily:**
   ```
   /admin config setting:turn_interval value:24
   # Give system more time between turns
   ```

6. **Reduce number of nations:**
   - More nations = slower turns
   - Archive or remove inactive nations
   - Consider splitting into multiple game instances

**Prevention:**
- Test with production-scale data
- Profile turn processing in development
- Log execution time for each phase
- Set reasonable turn intervals

### Database Queries Slow

**Problem:** Individual database operations take long time

**Symptoms:**
- Commands slow even when not during turn
- Specific commands consistently slow
- Database CPU high

**Solution:**

1. **Identify slow queries:**
   ```bash
   # Enable profiling
   db.setProfilingLevel(1, {slowms: 100})
   # View slow queries
   db.system.profile.find({millis: {$gt: 100}}).limit(5)
   ```

2. **Add missing indexes:**
   ```bash
   # Index commonly queried fields
   db.nations.createIndex({discordUserId: 1})
   db.nations.createIndex({name: 1})
   db.economies.createIndex({nationId: 1, turn: -1})
   ```

3. **Optimize queries:**
   - Use projection to fetch only needed fields
   - Use lean() in Mongoose for read-only queries
   - Batch queries when possible

4. **Monitor index usage:**
   ```bash
   db.nations.getIndexes()
   ```

5. **Analyze query plans:**
   ```bash
   db.nations.find({discordUserId: "123"}).explain("executionStats")
   # Should show index usage, not collection scan
   ```

**Prevention:**
- Index fields used in find() queries
- Monitor query performance in development
- Test with realistic data volume
- Regular index maintenance

## FAQ

### How do I reset a nation?

Use admin command to reset all nation data to defaults:
```
/admin nation [name] reset
```
This clears economy, military, and diplomacy data but keeps the nation.

### How do I backup game data?

Create a backup:
```bash
mongodump --out=./backup_$(date +%Y%m%d)
```

Restore from backup:
```bash
mongorestore --drop ./backup_YYYYMMDD
```

### Can I migrate between servers?

Yes, export database from old server and import to new:
```bash
# On old server
mongodump --out=./export

# Transfer export directory to new server

# On new server
mongorestore ./export
```

### How do I manage game balance?

Use admin balance multiplier:
```
/admin config setting:balance_multiplier value:0.8
```
This scales GDP, military strength, and other stats down.

### What data is stored?

- Nations and statistics
- Economy and transactions
- Military units and production
- Diplomacy (wars, treaties, alliances)
- Research and technology
- Audit logs of all actions
- User preferences and settings

### How do I run multiple games?

Use separate Discord servers and MongoDB databases:
```
# For Game 1
MONGODB_URI=mongodb://localhost:27017/nikolai_game1
GUILD_ID=123456789

# For Game 2
MONGODB_URI=mongodb://localhost:27017/nikolai_game2
GUILD_ID=987654321
```

Run separate bot instances with different configs.

## Getting Help

### Reporting Issues

When reporting a bug, include:

1. **Description** - What happened?
2. **Steps to reproduce** - How to make it happen?
3. **Expected behavior** - What should happen?
4. **Actual behavior** - What actually happened?
5. **Screenshots** - If applicable
6. **Logs** - Error messages and bot logs
7. **System info** - OS, Node.js version, MongoDB version

### Debugging Information

To get debugging info:

```bash
# Check versions
node --version
npm --version
mongosh --version

# Get bot version
cat package.json | grep '"version"'

# Check running processes
ps aux | grep node

# Get recent logs
npm run dev 2>&1 | tail -100
```

### Where to Report Issues

- **GitHub Issues**: https://github.com/your-org/nikolai-bot/issues
- **Discord**: Join our support Discord for quick help
- **Email**: support@nikolai-bot.example.com

Include all debugging information when reporting.
