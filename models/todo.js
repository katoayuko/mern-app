const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TodoSchema = new Schema({
  action: {
    type: String,
    required: [true, 'The todo text field is required'],
  },
  datetime:{
      type:String,
      required:true
    },
    file:{
        type:String
    }
    });


const Todo = mongoose.model('todos', TodoSchema);

module.exports = Todo;