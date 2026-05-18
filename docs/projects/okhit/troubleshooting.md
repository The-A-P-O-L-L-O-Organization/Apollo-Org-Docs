---
sidebar_position: 5
---

# Troubleshooting

Solutions for common issues with Okhit

## Setup Issues

### Bot Won't Start

**Problem:** The bot doesn't log in or crashes immediately.

**Symptoms:**
- No "Ready! Logged in as..." message
- Process exits immediately after running `pnpm start`
- Console shows error messages about connection or authentication

**Solution:**

1. Verify your Discord bot token is correct:
   ```bash
   echo $DISCORD_TOKEN
   ```
   If empty, your `.env` file isn't loading. Check that `.env` is in the root directory.

2. Confirm the token is valid:
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Select your application
   - Go to Bot → Reset Token if needed
   - Copy the token exactly (no extra spaces)

3. Check your `.env` format:
   ```env
   DISCORD_TOKEN=your_actual_token_here
   CLIENT_ID=12345678901234567890
   GUILD_ID=9876543210987654321
   ```
   - No quotes around values
   - No spaces after the `=`
   - Correct environment variable names (case-sensitive)

4. If using Docker, ensure `.env` is mounted:
   ```bash
   docker run --env-file .env okhit
   ```

5. Check Node.js version:
   ```bash
   node --version
   ```
   Must be 16.0.0 or higher. Update if needed.

### Discord Token Invalid

**Problem:** Bot authenticates but then disconnects with "Invalid token" error.

**Symptoms:**
- Token error in console
- Bot appears online for a second then goes offline
- Error: `401 Unauthorized`

**Solution:**

1. **Reset your bot token** - Your token may have been compromised:
   - Go to Discord Developer Portal → Your Application → Bot
   - Click "Reset Token"
   - Copy the new token immediately
   - Update your `.env` with the new token

2. **Verify bot settings:**
   - Confirm bot is enabled (toggle switch is on)
   - Check Privileged Intents are enabled if using them
   - Verify bot is added to your server with proper permissions

3. **If using environment variables from system:**
   - Export the token as an environment variable correctly:
     ```bash
     export DISCORD_TOKEN="your_token_here"
     ```
   - Or use a `.env` file (recommended)

### Commands Not Appearing

**Problem:** `/archive` and `/help` commands don't show up in Discord.

**Symptoms:**
- Slash commands list doesn't include Okhit commands
- "Unknown application command" when trying to use them
- Commands worked before but disappeared

**Solution:**

1. **Deploy commands explicitly:**
   ```bash
   pnpm run deploy
   ```
   This registers commands with Discord. Wait 10-15 seconds for Discord to update.

2. **Verify GUILD_ID is correct:**
   - Enable Developer Mode in Discord (User Settings → Advanced → Developer Mode)
   - Right-click your server
   - Click "Copy Server ID"
   - Paste into `GUILD_ID` in `.env`
   - Re-run `pnpm run deploy`

3. **Verify CLIENT_ID is correct:**
   - Go to Discord Developer Portal → Your Application → General Information
   - Copy the Application ID
   - Verify it matches `CLIENT_ID` in `.env`

4. **Check bot permissions:**
   - Bot must have "applications.commands" scope
   - When inviting bot, use OAuth2 with "bot" and "applications.commands" scopes

5. **Clear Discord cache:**
   - Close Discord completely
   - Delete Discord cache (varies by OS)
   - Restart Discord
   - Commands should now appear

6. **If still not working:**
   - Delete the bot from the server
   - Re-invite using OAuth2 link with "bot" + "applications.commands" scopes
   - Run `pnpm run deploy` again

### Permission Denied/Access Errors

**Problem:** Bot can't archive or gives permission errors.

**Symptoms:**
- "Missing Permissions" error from bot
- "Access Denied" when trying to archive a channel
- Bot can't read message history

**Solution:**

1. **Verify bot permissions in Discord:**
   - Right-click the server → Server Settings → Roles
   - Find the Okhit bot role
   - Enable these permissions:
     - View Channels
     - Read Messages/View Channels
     - Read Message History
     - Send Messages
     - Attach Files
     - (Manage Messages optional, for cleanup)

2. **Verify channel-specific permissions:**
   - Right-click the channel → Edit Channel → Permissions
   - Ensure the bot has View Channel and Read Message History
   - If there are channel overrides denying the bot access, fix them

3. **Check if bot role is high enough:**
   - Okhit's role must be higher in the role hierarchy than the channels it archives
   - Move the bot role higher in Server Settings → Roles

4. **For private channels:**
   - Bot must have explicit permission to the private channel
   - Add the bot role to the channel's permissions with View Channel enabled

5. **Restart the bot after permission changes:**
   ```bash
   # Stop the bot (Ctrl+C)
   # Then restart
   pnpm start
   ```

## Archive Issues

### Archive Command Not Working

**Problem:** `/archive` command returns an error or doesn't execute.

**Symptoms:**
- "Interaction failed" or "The application did not respond"
- Command times out after 3 seconds
- Error message but no archive created

**Solution:**

1. **Verify bot is online:**
   - Check that the bot shows as online in the Discord member list
   - If offline, restart with `pnpm start`

2. **Check command parameters:**
   - Ensure you specified either `source_channel` or `source_channels`
   - Both are optional but one is required:
     ```
     /archive source_channel: #channel message_limit: 500 export_name: test
     ```
   - Verify `export_name` is specified

3. **Verify channel access:**
   - The bot must have access to the channel you're archiving
   - If "Channel not allowed", check `CHANNEL_IDS` whitelist (see Channel Access Issues)

4. **Check message limit:**
   - Must be between 0 and 2000
   - If you put a higher number, it will be capped at 2000

5. **Monitor console output:**
   - Look at the bot's console for error messages
   - Common errors:
     - "Cannot read property 'messages' of null" - channel not found
     - "Missing Permissions" - bot doesn't have read access
     - "Interaction token invalid" - bot didn't respond in time

6. **If timeout occurs:**
   - Reduce `message_limit` to 500-1000
   - The command may be taking too long
   - Try archiving a smaller channel first

### No Messages Found Error

**Problem:** Archive creates but file is empty or says no messages found.

**Symptoms:**
- "No messages found in channel" error
- Archive file exists but is empty or very small
- Command succeeded but no content

**Solution:**

1. **Verify the channel has messages:**
   - Open the channel and scroll up
   - Confirm there are actually messages to archive
   - If the channel is empty, that's the expected result

2. **Check message limit:**
   - If `message_limit: 0`, no messages will be fetched
   - Use at least `message_limit: 10` to archive something
   - Default is 500 if not specified

3. **Check user filter:**
   - If you specified `filter_user`, the selected user may have no messages
   - Try archiving without the filter first to see if messages exist
   - Then add the filter back

4. **Verify channel accessibility:**
   - Bot must be able to read the channel
   - If bot was added after messages were posted, old messages may not be readable
   - Check bot permissions (see Permission Denied section)

5. **For threads and forums:**
   - Thread must be in a discoverable state (not archived in the past)
   - Forum threads that are very old may not load
   - Try with a higher `message_limit` to get more results

### File Not Created/Uploaded

**Problem:** Archive command claims success but no file is created or uploaded.

**Symptoms:**
- "Archive created!" message but no file in Discord
- File isn't saved to disk
- No attachment in the response message

**Solution:**

1. **Verify write permissions:**
   - Check that `ARCHIVE_OUTPUT_DIR` directory is writable:
     ```bash
     ls -la ./archives
     touch ./archives/test.txt
     rm ./archives/test.txt
     ```
   - If you get "Permission denied", fix directory permissions:
     ```bash
     chmod 755 ./archives
     ```

2. **Verify directory exists:**
   - The output directory should be created automatically, but verify:
     ```bash
     mkdir -p ./archives
     ```

3. **Check available disk space:**
   - Archives can be large; ensure enough space:
     ```bash
     df -h
     ```
   - Large archives (2000+ messages) may use several MB

4. **Verify Discord upload permissions:**
   - Bot must have "Attach Files" permission in the channel
   - Check channel permissions (right-click → Edit Channel → Permissions)

5. **Check console for errors:**
   - Look at bot console for file write errors
   - Common errors:
     - "EACCES: permission denied" - directory not writable
     - "ENOSPC: no space left on device" - disk full
     - "ENOENT: no such file" - directory doesn't exist

6. **For Docker deployments:**
   - Ensure volume is mounted correctly:
     ```bash
     docker run -v $(pwd)/archives:/app/archives okhit
     ```
   - Check permissions inside container:
     ```bash
     docker exec <container_id> ls -la /app/archives
     ```

### Messages Are Incomplete or Formatted Wrong

**Problem:** Archive file has garbled, truncated, or incorrectly formatted messages.

**Symptoms:**
- Messages are cut off mid-sentence
- Special characters show as `?` or boxes
- Timestamps are missing or wrong
- Names appear as IDs instead of usernames

**Solution:**

1. **Check file encoding:**
   - Archives should be UTF-8 encoded
   - If special characters are garbled, the bot may not be encoding properly
   - When opening the file, ensure your editor uses UTF-8:
     - VS Code: Bottom right, click "UTF-8"
     - Or set it in file editor preferences

2. **Verify message content:**
   - Some messages may have unusual characters or formatting
   - The archive captures messages exactly as Discord stores them
   - Discord markdown is preserved (**, *, etc.)

3. **Check for embed content:**
   - Okhit only archives plain text, not embeds
   - Embedded images, videos, and rich formatting are not captured
   - Only attachment URLs are included

4. **Verify timestamps:**
   - Timestamps should be in `[YYYY-MM-DD HH:mm]` format
   - If they're wrong, the bot's system clock may be incorrect:
     ```bash
     date
     ```
   - Timestamps are always UTC

5. **Check username formatting:**
   - Names should be display names, not user IDs
   - If you see `[123456789]` instead of a name, the user may have deleted their account
   - Bot caches the display name at archive time

6. **For code blocks:**
   - Multi-line code blocks are preserved in the archive
   - Each message is still one line in the output file
   - The code content appears exactly as sent

### Timeout on Large Archives

**Problem:** Archive command times out or takes very long to complete.

**Symptoms:**
- "The application did not respond" after 3 seconds
- Command works but takes minutes for large archives
- Bot becomes unresponsive while archiving

**Solution:**

1. **Reduce message limit:**
   - Instead of 2000, try 1000 or 500:
     ```
     /archive source_channel: #channel message_limit: 1000 export_name: part1
     ```
   - Split large archives into multiple batches:
     ```
     /archive source_channels: #ch1,#ch2 message_limit: 500 export_name: batch1
     /archive source_channels: #ch3,#ch4 message_limit: 500 export_name: batch2
     ```

2. **Archive one channel at a time:**
   - Multiple channels are slower than single channels
   - Instead of `source_channels: #ch1,#ch2,#ch3`, do three separate commands

3. **Run during off-peak hours:**
   - Bot is faster when Discord servers are less loaded
   - Avoid peak usage times if possible

4. **Check bot performance:**
   - If bot console shows high CPU/memory, the server may be overloaded
   - Restart the bot: `Ctrl+C` then `pnpm start`

5. **For forum archives:**
   - Forums with many threads are slower
   - Try reducing `message_limit` from 2000 to 1000 or 500

6. **As a workaround:**
   - Use `/archive` multiple times with different `message_limit` values
   - Or split archives by date/time range manually

## Channel Access Issues

### "Channel Not Allowed" Error

**Problem:** Bot says the channel isn't allowed to be archived.

**Symptoms:**
- "This channel is not in the allowed list" error
- Can't archive specific channels even though bot has permissions
- Error only for certain channels, not others

**Solution:**

1. **Check CHANNEL_IDS whitelist:**
   - If `CHANNEL_IDS` is set in `.env`, only those channels can be archived
   - If `CHANNEL_IDS` is empty, only the bot owner can use archive
   - Add the channel ID to the whitelist:
     ```env
     CHANNEL_IDS=123456789,987654321,555555555
     ```

2. **Find the channel ID:**
   - Enable Developer Mode in Discord (User Settings → Advanced)
   - Right-click the channel
   - Click "Copy Channel ID"
   - Paste into `CHANNEL_IDS`

3. **Format the list correctly:**
   - Comma-separated with no spaces:
     ```env
     CHANNEL_IDS=111,222,333
     ```
   - Not like this:
     ```env
     CHANNEL_IDS=111, 222, 333  # Wrong (spaces)
     ```

4. **Restart the bot:**
   - After changing `.env`, restart the bot:
     ```bash
     # Stop: Ctrl+C
     pnpm start
     ```

5. **If you're the bot owner:**
   - Bot owners can always archive any channel
   - If you still get "not allowed", check that `DISCORD_TOKEN` is from a bot you own
   - Verify `CLIENT_ID` matches your application

### Can't Archive Private Threads

**Problem:** Private threads can't be archived or show permission error.

**Symptoms:**
- "Cannot access thread" error
- Private thread is hidden from command suggestions
- Permission error when trying to archive

**Solution:**

1. **Verify bot is in the thread:**
   - To access a private thread, the bot must be a member
   - Open the thread → Click members icon
   - Add the bot to the thread manually if missing

2. **Verify bot has permissions:**
   - Right-click thread → Edit Thread → Permissions
   - Ensure bot role has:
     - View Channel: ON
     - Read Message History: ON

3. **Check parent channel permissions:**
   - Bot must also have access to the parent channel
   - If parent channel is private, bot must be added there too

4. **For archived threads:**
   - If the thread is archived, the bot may not be able to access it
   - Have a moderator unarchive the thread temporarily
   - Then run the archive command
   - Moderator can re-archive afterwards

### CHANNEL_IDS Restriction Blocking Access

**Problem:** Want to archive a channel but CHANNEL_IDS restriction prevents it.

**Symptoms:**
- "Channel not in whitelist" even though you want to archive it
- Only certain channels work, others are blocked
- Want to archive all channels but whitelist is too restrictive

**Solution:**

1. **If you're the server owner/admin:**
   - Add the channel to `CHANNEL_IDS`:
     ```env
     CHANNEL_IDS=existing_id,new_id,another_id
     ```
   - Restart the bot
   - Command will now work

2. **If CHANNEL_IDS is empty:**
   - Only the bot owner (who set it up) can use archive commands
   - Contact the bot owner to archive the channel
   - Or ask them to add the channel to `CHANNEL_IDS`

3. **If you need to archive everything:**
   - Leave `CHANNEL_IDS` empty (or remove it entirely)
   - Only the bot owner will be able to use commands
   - This is the default development mode

4. **To find your channel's ID:**
   - Enable Developer Mode (Discord Settings → Advanced)
   - Right-click the channel
   - Click "Copy Channel ID"
   - Share with bot owner to add to whitelist

### Forum Threads Not Archiving

**Problem:** Forum posts aren't being archived or appear empty.

**Symptoms:**
- Archive created but no messages from forum
- "No threads found" error
- Forum appears in channel list but archives nothing

**Solution:**

1. **Use the forum channel name, not a thread name:**
   - For forum channel named #discussions, use:
     ```
     /archive source_channel: #discussions export_name: forum-backup
     ```
   - Not the individual thread names

2. **Verify forum exists and has posts:**
   - Open the forum in Discord
   - Confirm there are posts/threads visible
   - If no posts exist, archive will be empty

3. **For archived forum posts:**
   - Okhit should include both active and archived posts
   - If some posts are missing, they may be very old
   - Try increasing `message_limit` to 2000

4. **Check forum permissions:**
   - Bot must have access to the forum channel itself
   - Right-click forum → Permissions
   - Ensure bot has:
     - View Channel: ON
     - Read Message History: ON

5. **If forum is very large:**
   - Many threads (100+) can slow down archiving
   - Reduce `message_limit` if timeout occurs
   - Run archive multiple times with different limits

## File & Output Issues

### Filename Issues or Special Characters

**Problem:** Archive files have wrong names or special characters cause issues.

**Symptoms:**
- Filename is different from what you specified
- Special characters become underscores or disappear
- File can't be saved on your computer
- Filename has extra characters

**Solution:**

1. **Use simple filenames:**
   - Stick to lowercase letters, numbers, and hyphens
   - Good: `campaign-log`, `session-2025-04-20`
   - Bad: `My Campaign!`, `Log@2025`
   - The bot sanitizes filenames automatically

2. **Avoid special characters:**
   ```
   ✓ OK:        my-archive, session_2, log123
   ✗ Avoid:     my/archive, log@2, session!log
   ```

3. **Keep it short:**
   - Under 50 characters recommended
   - Very long names may be truncated

4. **The .txt extension is added automatically:**
   - Don't include `.txt` in your `export_name`
   - Wrong: `export_name: my-log.txt`
   - Right: `export_name: my-log`

5. **If file won't save on your computer:**
   - Download the file from Discord first
   - Right-click → Save As
   - Choose a location on your computer
   - The .txt file can go anywhere

### Attachment URLs Not Included

**Problem:** Messages with attachments don't show URLs in the archive.

**Symptoms:**
- Messages with images/files don't have URLs
- `[Attachment(s): ...]` doesn't appear
- Discord links aren't in the archive

**Solution:**

1. **Verify the original message had attachments:**
   - In Discord, the message should show the file/image
   - If the message is just text, there are no attachments to include

2. **Attachment URLs appear at the end of the message line:**
   - They're on the same line:
     ```
     [2025-04-20 14:30] [channel] Name: message [Attachment(s): https://...]
     ```
   - Not on a separate line

3. **URLs are long:**
   - Discord CDN URLs are very long (100+ characters)
   - This is normal; don't worry if the line is very long
   - Use a text editor that handles long lines (VS Code, notepad++)

4. **Multiple attachments are comma-separated:**
   - `[Attachment(s): url1, url2, url3]`
   - Not on separate lines

5. **Test with a simple case:**
   - Post an image in a test channel
   - Archive it with `/archive`
   - Check the output file for the URL

### Timestamp Formatting Issues

**Problem:** Timestamps appear wrong or aren't readable.

**Symptoms:**
- Timestamps show as `[2025-04-20T14:30:00Z]` instead of `[2025-04-20 14:30]`
- All times are the same
- Time zone is wrong
- Timestamps are missing

**Solution:**

1. **Verify timestamps are in correct format:**
   - Should be: `[YYYY-MM-DD HH:mm]`
   - Example: `[2025-04-20 14:30]`
   - If not, the bot may have a formatting bug

2. **Check the bot's system time:**
   - Timestamps are in UTC (not your local time)
   - Verify bot server time is correct:
     ```bash
     date
     ```
   - If time is wrong, fix system clock on bot server/computer

3. **Times appear in 24-hour format:**
   - `14:30` = 2:30 PM
   - `00:00` = midnight
   - `23:59` = 11:59 PM
   - This is intentional and consistent

4. **If editing the archive later:**
   - Timestamps are in the file exactly; don't modify them
   - Editing timestamps may break sorting

### Message Content Truncated

**Problem:** Messages appear cut off or incomplete in the archive.

**Symptoms:**
- Messages end abruptly mid-word
- Long messages are shortened
- Special characters are missing

**Solution:**

1. **Check original message in Discord:**
   - Go to the channel and find the message
   - Confirm it's not truncated there
   - If it's complete in Discord, the bot should archive it completely

2. **Archive captures full message text:**
   - Okhit includes the entire message content
   - Even very long messages (1000+ characters) are preserved
   - There's no built-in truncation

3. **Your text editor might be wrapping lines:**
   - The message is complete but appears on multiple wrapped lines
   - Open in a text editor designed for long lines:
     - VS Code (handles long lines well)
     - Sublime Text
     - Not Notepad (will wrap and make it hard to read)

4. **Check for encoding issues:**
   - Use a UTF-8 text editor to view the file
   - If you see `?` or boxes, encoding is wrong
   - Re-save as UTF-8 in your editor

## Performance Issues

### Bot is Slow/Unresponsive

**Problem:** Bot takes a long time to respond to commands or becomes unresponsive.

**Symptoms:**
- Commands time out after 3 seconds
- Bot doesn't respond to archive requests
- Other Discord bots work but Okhit is slow
- Previous archives worked but now it's slow

**Solution:**

1. **Reduce message limit:**
   - 2000 messages takes longer than 500
   - Try smaller limits:
     ```
     /archive source_channel: #channel message_limit: 500 export_name: test
     ```

2. **Archive one channel at a time:**
   - Multiple channels are slower
   - Split into separate commands if possible

3. **Check bot's resource usage:**
   - Monitor CPU and memory on the bot's machine
   - If at 100%, the system is overloaded
   - Restart the bot: `Ctrl+C`, then `pnpm start`

4. **Check Discord's status:**
   - Discord may be experiencing issues
   - Visit [Discord Status](https://status.discord.com/) to check
   - If Discord is slow, Okhit will be too

5. **Check network connection:**
   - Bot needs a good connection to Discord
   - High ping or packet loss will slow it down
   - Test with: `ping discord.com`

6. **Restart the bot:**
   - Stop: Press `Ctrl+C` in the bot's terminal
   - Wait 5 seconds
   - Start: `pnpm start`
   - This clears memory and resets connections

### Archive Taking Too Long

**Problem:** Archive command takes unusually long to complete.

**Symptoms:**
- Command was quick before, now it's slow
- 2000-message archive takes more than 60 seconds
- Other bots work fine
- "The application did not respond" timeout

**Solution:**

1. **This is sometimes normal:**
   - 2000-message archives can take 15-60 seconds
   - Networks vary; sometimes Discord is slow
   - 10-15 seconds is typical for 500 messages

2. **If it's slower than usual:**
   - Discord servers might be busy
   - Check [Discord Status](https://status.discord.com/)
   - Try again in a few minutes

3. **Reduce complexity:**
   - Use a single channel instead of multiple:
     ```
     /archive source_channel: #one export_name: single
     ```
     Instead of:
     ```
     /archive source_channels: #one,#two,#three export_name: multiple
     ```

4. **Split into multiple archives:**
   - Archive 500-1000 messages at a time
   - Run multiple `/archive` commands
   - Combine files later if needed

5. **Monitor the bot console:**
   - Watch for error messages or warnings
   - These might explain slowness

### Memory Issues with Large Archives

**Problem:** Bot crashes or becomes unresponsive with large archives.

**Symptoms:**
- Bot process uses lots of RAM (500MB+)
- Bot crashes with "Out of memory" error
- System becomes very slow
- Bot won't restart

**Solution:**

1. **Reduce message limit:**
   - Large limits (2000) use more memory
   - Use 1000 or 500:
     ```
     /archive source_channel: #channel message_limit: 1000 export_name: part1
     ```

2. **Archive fewer channels at once:**
   - Multiple channels use more memory
   - Do them one at a time

3. **Restart the bot regularly:**
   - Long-running bots accumulate memory leaks
   - Restart every few hours or after many archives:
     ```bash
     Ctrl+C  # Stop
     pnpm start  # Restart
     ```

4. **For Docker deployments:**
   - Set memory limits:
     ```bash
     docker run -m 512m okhit
     ```
   - Monitor with:
     ```bash
     docker stats
     ```

5. **Check your system resources:**
   - The bot's machine may not have enough RAM
   - Run `free -h` on Linux or check Task Manager on Windows
   - If system RAM is full, the bot will struggle

## Docker Issues

### Container Won't Start

**Problem:** Docker container crashes or won't stay running.

**Symptoms:**
- `docker run` command fails immediately
- Container exits with error code
- Can't access bot even though container is running
- Port already in use error

**Solution:**

1. **Check Docker is installed:**
   ```bash
   docker --version
   ```
   If not found, install Docker first.

2. **Verify image built successfully:**
   ```bash
   docker build -t okhit .
   ```
   Look for errors during build. Common issues:
   - `Dockerfile not found` - Make sure you're in the project directory
   - `npm ERR!` - Dependencies failed to install; check npm/pnpm

3. **Check environment file:**
   ```bash
   docker run --env-file .env -v $(pwd)/archives:/app/archives okhit
   ```
   Ensure `.env` file exists and has correct values.

4. **View container logs:**
   ```bash
   docker logs <container_id>
   ```
   This shows why the container crashed.

5. **Check for port conflicts:**
   - Discord.js doesn't use ports by default
   - If you added a web server, ensure port isn't taken:
     ```bash
     lsof -i :3000
     ```

6. **Run with interactive terminal:**
   ```bash
   docker run -it --env-file .env okhit
   ```
   The `-it` flags let you see real-time output.

### Volume Permission Issues

**Problem:** Container can't write to mounted archive directory.

**Symptoms:**
- "Permission denied" when creating archives
- "Cannot write to /app/archives"
- File created but can't be read later

**Solution:**

1. **Fix directory permissions on host:**
   ```bash
   mkdir -p ./archives
   chmod 755 ./archives
   chmod 666 ./archives/*
   ```

2. **Verify volume is mounted:**
   ```bash
   docker run -v $(pwd)/archives:/app/archives okhit
   ```
   The `-v` flag must be included.

3. **Check running containers:**
   ```bash
   docker exec <container_id> ls -la /app/archives
   ```
   See what's in the container's archives directory.

4. **Use a named volume (alternative approach):**
   ```bash
   docker volume create okhit-archives
   docker run -v okhit-archives:/app/archives okhit
   ```

5. **Check user permissions:**
   - Container may run as a specific user
   - Ensure that user has write access to the archives directory

### Network/Discord Connection Problems

**Problem:** Container can't connect to Discord API.

**Symptoms:**
- "Cannot reach Discord" error
- Connection timeout when bot starts
- Container logs show network errors

**Solution:**

1. **Verify network is available:**
   ```bash
   docker run -it okhit ping discord.com
   ```
   If ping fails, network is down.

2. **Check DNS resolution:**
   - Container may not have DNS set up
   - Add `--dns` flag:
     ```bash
     docker run --dns 8.8.8.8 --env-file .env okhit
     ```

3. **Verify internet connection:**
   - Check that your machine has internet access
   - Try `ping 8.8.8.8` on the host machine

4. **Check for firewalls:**
   - Docker may have network restrictions
   - Whitelist Discord API domains:
     - `discord.com`
     - `discord.gg`
     - `discordapp.com`

5. **View detailed logs:**
   ```bash
   docker logs --follow <container_id>
   ```
   This shows real-time output. Look for network errors.

## FAQ

### How many messages can I archive?

The `/archive` command supports up to 2,000 messages per execution. You can run multiple archives to get more. For example:
- Archive 2,000 messages → `archive-part-1.txt`
- Archive the next 2,000 → `archive-part-2.txt`
- Combine files as needed

### What if a message is deleted?

Deleted messages don't appear in new archives (they're gone from Discord). Existing archives are unaffected — they're snapshots. If you need to preserve messages, archive regularly.

### Can I archive private servers?

Only if the bot is a member of the server and has access to the channels. Public bots can't archive private servers unless explicitly invited.

### How do I manage file storage?

Archives are stored in `ARCHIVE_OUTPUT_DIR` (default: `./archives`). You can:
- Organize by date: `archives/2025-04/`
- Move old archives to backup storage
- Delete archives you no longer need
- Use cloud storage for backups

### Can I append to existing archives?

Okhit creates new files each time. To combine archives:
1. Download both files
2. Use a text editor to merge them
3. Or write a script to combine `.txt` files

### What happens to attachments?

Only attachment URLs are saved, not the actual files. URLs remain valid as long as messages exist in Discord. To preserve attachments:
1. Download them manually from Discord
2. Or use a different bot that downloads files

### How do I backup archives?

Archives are `.txt` files. To backup:
1. Copy the `./archives` directory to cloud storage (Google Drive, OneDrive, etc.)
2. Or regularly download files manually
3. Docker: map archives to a persistent volume

### Can I customize output format?

The output format is fixed, but you can:
1. Edit files after exporting
2. Import into analysis tools
3. Write a script to transform the output
4. For developers: modify `formatMessage()` function in `index.js`
