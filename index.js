//5000晩ポートで接続できるサーバーを設定
//この設定によりクライアントからの要求でデータベースにアクセスすることができる
//サーバの接続設定
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const router = require('./routes/api');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//データベースとサーバの接続
mongoose.connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;


//
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());

//http://localhost:5000/apiにアクセスすると、/routes/api.jsのプログラムを使用することを宣言
//http://localhost:5000=データベースへの接続なのでデータベースとサーバのroutes/api.jsの接続
app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

//サーバ起動の設定
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});