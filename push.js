'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;
const guidecat = '';
const config = {
    channelSecret: '',
    channelAccessToken: ''
};

const app = express();

app.get('/', (req, res) => res.send('Hello LINE BOT!(GET)')); //ブラウザ確認用(無くても問題ない)
app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);

    //ここのif分はdeveloper consoleの"接続確認"用なので削除して問題ないです。
    if(req.body.events[0].replyToken === '00000000000000000000000000000000' && req.body.events[1].replyToken === 'ffffffffffffffffffffffffffffffff'){
        res.send('Hello LINE BOT!(POST)');
        console.log('疎通確認用');
        return; 
    }

    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'image',
    originalContentUrl: guidecat,
    previewImageUrl: guidecat
  });
}

// app.listen(PORT);
// console.log(`Server running at ${PORT}`);

function sendPushMessage(mes) {
       client.pushMessage(mes, {
               type: 'image',
              originalContentUrl: guidecat,
              previewImageUrl: guidecat
              })
       console.log('送信完了');
}

sendPushMessage('');
