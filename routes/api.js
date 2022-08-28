const express = require('express');
//特定のURLにアクセスした際にどのファイルを実行するかを指定できる機能
const router = express.Router();
//戻り値生成の際に使用する処理コンポーネントを読み込み
const Todo = require('../models/todo');



//http://localhost:3000/todosにgetでアクセスしたらどのような処理を行うのかを定義
router.get('/todos', (req, res, next) => {
  // todosにアクセスすると、reqを引数として、resが戻り値として返される
  //↓resの生成
  Todo.find({})
  .then((data) => res.json(data))
  .catch(next);
});

//http://localhost:3000/todosにpostでアクセスしたらどのような処理を行うのかを定義
router.post('/todos', (req, res, next) => { 
  if (req.body.action) {
      console.log(req.body.action)
   Todo.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: 'The input field is empty',
    });
  }
});

//http://localhost3000/todos/idにdeleteでアクセスしたらどのような処理を行うのかを定義
router.delete('/todos/:id', (req, res, next) => {
  // 引数を使用した処理で戻り値を生成
  Todo.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

 router.patch('/todos/:id',(req,res,next)=>{
     console.log(req.body.datetime)
     let action=req.body.action
     let datetime=req.body.datetime
     if(req.body){
     Todo.findOneAndUpdate({_id:req.params.id},{"$set":{action:req.body.action,datetime:req.body.datetime}})
     .then((data)=>res.json(data))
     .catch(next);
     }else{
         res.json({
             error:'The input field iis empty',});
         }
     });

module.exports = router;