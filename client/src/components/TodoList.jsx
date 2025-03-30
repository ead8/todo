import React from 'react'
import Todo from './Todo';

const TodoList =  ({tasks, level = 0}) => {
return  tasks?.length > 0 && tasks?.map((task) => (
          <div key={task._id} >
            <Todo task={task} />
          </div>
        ))
      };


export default TodoList