# Nova Discord Bot

Nova is a Discord bot designed to provide engaging daily content and custom announcements for your server, powered by Python and the discord.py library.

## Features

- **Daily Na'vi Word**: Automatically fetches and posts a random Na'vi word (with English translation) every day at 12:00 PM ET in a designated channel, using the [Reykunyu API](https://reykunyu.lu).
- **Embed Announcements**: Owner-only slash command to send rich embed messages to any channel with customizable title, description, color, and footer.
- **Manual Trigger**: Owner-only slash command to manually post the daily Na'vi word outside of the scheduled time.
- **Logging**: Activity and commands are logged to a file and optionally to a private log channel.

## Commands

### Slash Commands

- `/nova_embed`
  - **Description**: Nova announces world info as an embed.
  - **Usage**: Owner only.
  - **Parameters**:
    - `channel`: Channel to send the message.
    - `title`: Title of the embed.
    - `description`: Main message (supports multi-line).
    - `color`: Hex color code (e.g., #FF0000).
    - `footer`: Optional footer text.

- `/trigger_navi`
  - **Description**: Manually trigger the daily Na'vi word post.
  - **Usage**: Owner only.

## Setup & Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/The-A-P-O-L-L-O-Organization/Nova-Discord-Bot.git
   cd Nova-Discord-Bot
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   DISCORD_TOKEN=your_bot_token
   OWNER_ID=your_discord_user_id
   LOG_CHANNEL_ID=your_log_channel_id
   ```

4. **Run the Bot**
   ```bash
   python src/nova_bot.py
   ```

## Contribution

Contributions are welcome! Please fork the repository and submit a pull request. Make sure to follow best practices and include clear commit messages.

## License

This project is licensed under the GNU Affero General Public License.  
See the [LICENSE file](./LICENSE) for details.

## Links

- [GitHub Repository](https://github.com/The-A-P-O-L-L-O-Organization/Nova-Discord-Bot)

> Nova Discord Bot is maintained by [The-A-P-O-L-L-O-Organization](https://github.com/The-A-P-O-L-L-O-Organization).