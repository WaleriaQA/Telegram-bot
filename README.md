🤖 Telegram Auto-Reply Bot

This project is a simple Telegram bot that automatically replies to predefined questions such as "How are you?", "What are you doing?", etc. It is built with Node.js and can be hosted for free on Replit.

🚀 Features

- Auto-replies to certain messages;

- Restricts replies to a specific user (so it doesn’t answer everyone);

- Runs on Replit with a small Express server to stay alive with UptimeRobot pings;

- 📦 Setup Instructions

  **Create a Telegram Bot**

1. Open Telegram and search for @BotFather

2. Send /newbot and follow the instructions

3. Copy your API token (you’ll need it later)

  **Create a Replit Project**

1. Go to https://replit.com

2. Create a new Node.js project

3. Add two files:

4. index.js (main code of the bot)

5. .env (to store your API token)

   **Install Dependencies**

1. In the Replit shell, run:

npm install node-telegram-bot-api express dotenv

  **Write the Bot Code (index.js)**
  
  **Add Your Bot Token**

1. In the .env file, add:

BOT_TOKEN=your_telegram_bot_token_here

  **Run the Bot**
  
1. Click the Run button in Replit.
You should see logs in the console, and your bot will start responding in Telegram.

  **Keep the Bot Alive with UptimeRobot**

1. Go to https://uptimerobot.com

2. Create a free account

3. Add a new HTTP(s) monitor

4. Set the URL to your Replit project, e.g.:

https://your-project-name.username.repl.co/

5. Set the interval to every 5 minutes

   ⚠️ Important Note

Even with UptimeRobot, the bot will NOT run 24/7 if you are using only free versions of Replit and UptimeRobot.

Replit free plan still suspends projects after some time

UptimeRobot pings keep the web server alive, but not always the background polling process

For true 24/7 uptime, you need a dedicated host (e.g. Railway, Fly.io, Render, VPS, etc.)

📝 Summary:

✅ Works fine for testing and light personal use

❌ Not reliable for 24/7 uptime on free Replit + UptimeRobot

🔄 Consider moving to another hosting platform for production use
