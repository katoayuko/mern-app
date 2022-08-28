import React, { Component } from 'react';
import axios from 'axios';
import FileReader from './FileReader'

class Input extends Component {
  state =[ {
    
    file:''
  }]
  results=[{action: '',
    datetime:'',}]

  wait = (sec) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, sec*1000);
      //setTimeout(() => {reject(new Error("エラー！"))}, sec*1000);
    });
  };


  addTodo = () => {
    let task = { action: this.state.action, datetime:this.state.datetime };
    console.log(task)
    if (task.action.length!==0) {
      axios.post('/api/todos', task)
        .then((res) => {
          if (res.data) {
              console.log('完了')
            this.props.getTodos();
            this.setState({ action: '',file:'' });
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log('input field required');
    }
  };
  addTodo2 = () => {
    let task = { action: this.results.action, datetime:this.results.datetime };
    console.log(task)
    if (task.action.length!==0) {
      axios.post('/api/todos', task)
        .then((res) => {
          if (res.data) {
              console.log('完了')
            this.props.getTodos();
            this.setState({ action: '',file:'' });
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log('input field required');
    }
  };
　　
  handleChange = (e) => { 
      
  const date1 = new Date();
  const date2 = date1.getFullYear() + "/" + 
				(date1.getMonth() + 1)  + "/" + 
				date1.getDate()+ "  "+
                date1.getHours() + ":" + 
				date1.getMinutes() + ":" + 
				date1.getSeconds()  
    this.setState({
      action: e.target.value,
      datetime:date2,
    });
    console.log(this.state)
  };

   handleFile=(e)=>{
       const file=e.target.files[0]
       this.setState({file:file})
   }

   handleChange2=(num,num2)=>{
       const num11=num
       const num22=num2
       this.results=({action:num11,datetime:num22})
       console.log(this.state)
       setTimeout(this.addTodo2(),50000)
   }


  render() {
    let { action } = this.state;
    return (
      <div>
          <FileReader handleChange2={this.handleChange2.bind(this)} addTodo={this.addTodo.bind(this)}/>
        <textarea onChange={this.handleChange} value={action} placeholder="改行で複数行の入力ができます" />
        <button onClick={this.addTodo}>保存</button>
        
      </div>
    );
  }
}

export default Input;