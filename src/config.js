require('dotenv/config');

const config = {
  chats: process.env.CHATS_ARRAY.split(' '),
  apiHash: process.env.API_HASH,
  apiId: parseInt(process.env.API_ID, 10),
  stringSession: process.env.STRING_SESSION,
  phoneNumber: process.env.PHONE_NUMBER,
};

module.exports = config;