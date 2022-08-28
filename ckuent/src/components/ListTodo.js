import React from 'react';
import { useState } from 'react';
import axios from 'axios';
//編集ボタンを押すと編集画面が現れる
//画面は表示されているメモがの部分がそのまま編集できるのようになるクリックするとただのテキストではなくインプットできるようになる


const ListTodo = ({ todos, deleteTodo,getTodos }) => {
     let [mode,setMode]=useState("false");
     let[TodoEditing,setTodoEditing]=useState(null)
     let [task,setTask]=useState({action:null})
     let[datetime,setDatetime]=useState({datetime:null})


     const handleChange =(todos)=>{
       setTodoEditing(TodoEditing=todos)
           if(mode==='false'){
            setMode(mode='true');
            }else if(mode==='true'){
                setMode(mode='false')
            }
          }

        const handleUpdate=(e,todos)=>{
          setTodoEditing(TodoEditing=todos)
          setMode(mode='true');
          const date1 = new Date();
          const date2 = date1.getFullYear() + "/" + 
                (date1.getMonth() + 1)  + "/" + 
                date1.getDate()+ "  "+
                date1.getHours() + ":" + 
                date1.getMinutes() + ":" + 
                date1.getSeconds()    
            setTask({action:e.target.value})
            setDatetime({datetime:date2})
            console.log(task)
      };
            
          
       const updateTodo=(id)=>{
         const task_action=task.action
         const task_date=datetime.datetime
         //const task_datetime=task.map((tasks)=>(tasks.datetime))
         const task1={action:task_action,datetime:task_date}
          const selection=window.confirm('この内容で更新しますか')
          console.log(task1)
          setMode(mode='false')
            if(selection===true){
               console.log(task)
               axios.patch(`/api/todos/${id}`,task1)
                .then((res)=>{
                    if(res.data){
                      console.log(task)
                        getTodos();
                    }
                   })
                    .catch((err)=>console.log(err));
                }
                
            }
let {tasks}=task
return(
    <ul>
      {todos && todos.length > 0 ? (
        todos.map((todo) => {
          return (
              <>
            <li class="todo" key={todo._id}>
              <div class="delete">
                    <button className="button1"  onClick={() => deleteTodo(todo._id)}>削除</button>
                    <button className="button2"  onClick={() => handleChange(todo._id)} >編集</button>
                    </div>
                {todo._id===TodoEditing && mode==='true'?(
                    <>
                    <li>
                    <textarea className={todo._id} value={tasks} onChange={(e)=> handleUpdate(e,todo._id)}></textarea>
                    <button onClick={() =>updateTodo(todo._id,task)}>保存</button>
                    </li>
                    </>
                ):(
                  <>
                 <p>{todo.action}</p>
                <p className='date'>{todo.datetime}</p>
                </>
                )}
                </li>
            </>)
        }
        )
      ) : (
        <li>No left</li>
      )}
    </ul>
            )
      };

export default ListTodo;