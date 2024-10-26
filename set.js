const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUxIV1hodjFxN1JMeVQxRFlodThtdlczbE85Y3Y1VFJ0amhvWTU3T3YwRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidkgrelVjdUV5YXNRVkRMMEVBdlFteEhXRzArSkNDaWxwTU9TME5yU1EzVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzTkhNdEM1MHk0a1dhWWZVVkJQQW9HNkF3cTNWemErZVBNYi8xNnFjQlh3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjUEVIZXo3QzN5K2FtU3l4NEkyUVE0N3BJeGpKeDY4a3pEZFFkZXFSVWpJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFKR1dlUVRWbjZlQUhRVVlrOWdtbmxnZndPUEIrcjJ5MUxnWk5RT3ZWMTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBySEQxTjRsREo3dWg5amxiU0xCK0JzY1pnZWtNQUE2d0NWdFdyVm1GV1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0NNQXZZdGpyN3I1YTBoVit3Ymh3d3FRMU9yZzJwOVluSmZqd2dleDIxQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK2dLZXhpTzA5ZmFISmwyMXpRZGx3SWgrTnV0Y29KWCtCRzVNOVlRT0kwRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlacWVvWWpXcUlOd0REMmhTQlkwZUkyemFpNVRtQ2VLbGdnZmkxVWZORjVDSDRoR2tMeU5raDFTOCt3SUJzRk9mcVBIb1BVYW4yY2tPaVlRSUx3aUNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcxLCJhZHZTZWNyZXRLZXkiOiI2WC9HK05US3NBeFNGNUcwcE50cGROSkNSaFhZV2MvWjc4eWRFNnZvQ3gwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijk0Nzc4MjQxOTgzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjE3MkE3QjNGREJBREFGMjQ5MjMzNEU1MUUwMkY5MkJBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Mjk5NDQ4Njl9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijk0Nzc4MjQxOTgzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjBDQUI3RDE4ODAyNkE3QjkzNDUyOTgxNUQ4NTg4Mjk1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Mjk5NDQ4Njl9XSwibmV4dFByZUtleUlkIjo0MywiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjQzLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjM1ZnAtLUxHVGZlN093anRUTzhCZHciLCJwaG9uZUlkIjoiNGI1YzYxNWUtOTVmNS00MTg0LTg2MGUtMTY5NjMwYzg1ODYxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklyZ0dwOUFGazJIRnVJL0FoZE5KYlBjWXk2MD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmUjJYNmdCMkk0ZGNYQVlUTEhXbS9DaUN4Snc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTENMVkhXOEciLCJtZSI6eyJpZCI6Ijk0Nzc4MjQxOTgzOjdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiV2hhdHNhcHAgQm90In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPeWh0dThDRUpTNjg3Z0dHQWNnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJXd1Zucm1hV1l3RUZobEpyeEFnREIzOUVZc1hDUUZSMlRhN2lvTGlzL21jPSIsImFjY291bnRTaWduYXR1cmUiOiJRcWtxTjJ2NnErc0FSc0hJbFNXeWJoMEM5aXQ0K2tlVDhFb0xvWlhTRTNHK3lZTVNxZzBIZ2ZXTUhpaWoyNTFjdlYyckFZSzBRRlJvbDhRcmZhNURDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiLzc1dUw4M0ZXVHkySHZ5N3UzcytzRE5HUGpJM3BZZWNnNnBidHRUVmtKbFIrYU9vT3RNREs3cWJyODBVYi9ObS84RFdWaWI0QnRYU3Y3TlZlMUdrQVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDc3ODI0MTk4Mzo3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZzRlo2NW1sbU1CQllaU2E4UUlBd2QvUkdMRndrQlVkazJ1NHFDNHJQNW4ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjk5NDQ4NjYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSVNPIn0=',
    PREFIXES: (process.env.PREFIX || '.').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "94706042889",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
