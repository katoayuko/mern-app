import React from 'react';
import { useState } from 'react';
import ListTodo from './ListTodo'
import Todo from './Todo';

const AAA = ({ todos, deleteTodo }) => {
     let [mode,setMode]=useState('false');
     console.log(mode)

     const handleChange =()=>{
           if(mode==='false'){
            setMode(mode='true');
            }else if(mode==='true'){
              setMode(mode='false')
            }
          } 

   return(
    <ul>
      {todos && todos.length > 0 ? (
              <>
            <li class="todo" >
                <li class="delete">
                    <button className="button1"  onClick={() => deleteTodo(todos._id)}>削除</button>
                    <button className="button2"onClick={() =>handleChange()}  >編集</button>
                </li>
                  {mode==="true" ?(
                    <>
                    <textarea></textarea>
                    </>
                         ):(
                        <>
                        {todos.action}
                        </>
                    )
                         }
                         </li>
              </>)  : (
                  <>
             <li>No left</li>
              </>)
              }
    </ul>
            )
};

export default AAA;