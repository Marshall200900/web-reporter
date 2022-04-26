import TelegramBot from 'node-telegram-bot-api';
import cors from 'cors';
import formidable from 'express-formidable'
import express from 'express';
import { Blob } from 'buffer';
import path from 'path';
const token = '5283036706:AAERdKokPo85NSHbIGxOMNqOZVbEd5ng7mc';
const chat_id = '-1001695358653';

const my_id = '408342168';
const bot = new TelegramBot(token, {polling: true});

const app = express();
app.use(cors())
app.use(express.json());
app.use(formidable());

app.post('/sendData', (req, res) => {
  const { mainText, subText } = req.fields;

  const filepath = req.files.file.path;
  const __dirname = path.resolve();
  const message = `*${mainText}*\n\n${subText}`;
  console.log(message);
  const opts = {
    parse_mode: 'MarkdownV2',
    caption: message
  }
  bot.sendPhoto(chat_id, filepath, opts)
});

app.listen(3002);
console.log('listening to 3002');
