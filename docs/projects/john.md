# John Discord Bot

John is a simple Discord bot built with Python using the discord.py library, developed by The A.P.O.L.L.O. Organization.

## Features

- Greets new members when they join the server.
- Responds with "Hi!, {pinger}" when pinged (mentioned) in a message.
- **/reboot**: Restarts the bot (Administrator only).
- **/shutdown**: Gracefully shuts down the bot (Administrator only).
- **/games**: Play Rock-Paper-Scissors with the bot.

## Commands

### Slash Commands

The bot uses slash commands that are registered to your specific Discord server for faster availability. Commands should appear immediately after the bot starts.

- `/reboot`
  - **Description**: Restarts the bot.
  - **Usage**: Administrator only.

- `/shutdown`
  - **Description**: Gracefully shuts down the bot.
  - **Usage**: Administrator only.

- `/games`
  - **Description**: Play Rock-Paper-Scissors with the bot.
  - **Usage**: Anyone.

## Setup & Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/The-A-P-O-L-L-O-Organization/John-Discord-Bot.git
   cd John-Discord-Bot
   ```

2. **Install Dependencies**
   ```bash
   pip install -r discord_bot/requirements.txt
   ```

3. **Environment Variables**
   Create a `.env` file in the `discord_bot` directory with the following variables:
   ```
   DISCORD_BOT_TOKEN=your_bot_token_here
   ```

4. **Run the Bot**
   ```bash
   cd discord_bot
   python bot.py
   ```

## Security Note

For production use, it's recommended to store the bot token in an environment variable or a separate config file instead of hardcoding it in the script.

## Running on GitHub Actions

You can run this bot persistently using GitHub Actions runners. Note the following limitations:

- **Time Limits**: GitHub Actions workflows have time limits (6 hours for public repos, 35 days for private repos)
- **Cost**: This will consume your GitHub Actions minutes
- **Not Recommended for Production**: GitHub Actions is not designed for persistent services

### Setup Instructions:

1. **Add Bot Token as GitHub Secret**:
   - Go to your repository settings
   - Navigate to "Secrets and variables" > "Actions"
   - Add a new repository secret named `DISCORD_BOT_TOKEN` with your bot token

2. **Trigger the Workflow**:
   - Go to the "Actions" tab in your repository
   - Select "Run Discord Bot" workflow
   - Click "Run workflow"

3. **Monitor the Bot**:
   - The workflow will run and keep the bot online until the time limit is reached
   - You can see the bot's logs in the workflow run details

**Note**: For a more reliable persistent hosting solution, consider using services like Heroku, Railway, or DigitalOcean instead of GitHub Actions.

## Contribution

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.  
See the [LICENSE file](https://github.com/The-A-P-O-L-L-O-Organization/John-Discord-Bot/blob/main/LICENSE) for details.

## Links

- [GitHub Repository](https://github.com/The-A-P-O-L-L-O-Organization/John-Discord-Bot)

> John Discord Bot is maintained by [The-A-P-O-L-L-O-Organization](https://github.com/The-A-P-O-L-L-O-Organization).