import React, { Component } from 'react';
import axios from 'axios';
import Input from './Input';
import ListTodo from './ListTodo';;

class Todo extends Component {
  state = {
    todos: [],
  };
　
  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    axios.get('/api/todos')
      .then((res) => {
        if (res.data) {
          this.setState({
            todos: res.data,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  //サーバにdelete要求を出す
  deleteTodo = (id) => {
    const selection=window.confirm('削除しますか')
    if(selection===true){
    axios.delete(`/api/todos/${id}`)
      .then((res) => {
        if (res.data) {
          this.getTodos();
        }
      })
      .catch((err) => console.log(err));
  }else{
      ;
  }
};

  render() {
    let { todos } = this.state;

    return (
      <div>
        <h1>メモ帳</h1>
        <Input getTodos={this.getTodos} />
        <ListTodo todos={todos} deleteTodo={this.deleteTodo} getTodos={this.getTodos}/>
      </div>
    );
  }
}

export default Todo;
