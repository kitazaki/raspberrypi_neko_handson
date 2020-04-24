'use strict'

const Gyazo  = require('gyazo-api');
const client = new Gyazo('ACCESS_TOKEN');

client.upload('./cat.jpg', {
  title: "my picture",
  desc: "upload from nodejs"
})
.then((res) => {
  console.log(res.data.url);
})
.catch((err) => {
  console.error(err);
});

