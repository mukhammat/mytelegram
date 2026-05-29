const config = require('./config');
const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input
const cron = require("cron");

const chats = config.chats;
const apiHash = config.apiHash;
const apiId = config.apiId;
const stringSession = new StringSession(config.stringSession); // fill this later with the value from session.save()

const client = new TelegramClient(stringSession, apiId, apiHash, {
  connectionRetries: 5,
});

const sendCallback = async () => {
  try {
    console.log("Run:", new Date().toLocaleString());

    await client.start({
      phoneNumber: async () => config.phoneNumber,
      phoneCode: async () =>
        await input.text("Please enter the code you received: "),
      onError: (err) => console.log(err),
    })

    await Promise.all(
      config.chats.map((chat) =>
        client
          .sendFile(chat, { file: "./img/photo_2026-05-29_15-47-10.jpg" })
          .then(() => console.log(`Send: ${chat}`))
          .catch((err) => console.error(`Error on ${chat}:`, err))
      )
    );

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// for testing
// sendCallback()

// for production
new cron.CronJob('0 0 7 * * *', sendCallback, null, true, 'Asia/Almaty').start();