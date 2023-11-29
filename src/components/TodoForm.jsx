import React, { useState, useEffect } from 'react';
import TodoItems from './TodoItems';
import { v4 as uuidv4 } from 'uuid';

function TodoForm() {
  const [todo, setTodo] = useState('');
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);

  // Load todo list from local storage on component mount
  useEffect(() => {
    const storedTodoList = JSON.parse(localStorage.getItem('todoList')) || [];
    setTodoList(storedTodoList);
  }, []);

  const add = (e) => {
    e.preventDefault();
    const newTodo = { id: uuidv4(), todo, todoName, isComplete: false };
    // Update todo list and save to local storage
    setTodoList((prevTodoList) => {
      const updatedTodoList = [...prevTodoList, newTodo];
      localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
      return updatedTodoList;
    });

    // Clear input fields
    setTodo('');
    setTodoName('');
  };

  return (<>
    <form onSubmit={add} className="md:flex text-white">
        <input
           required
            type="text"
            placeholder="Todo Name..."
            value={todoName}
            className=" border border-black/10 mb-1 md:mb-0 rounded-lg w-full sm:w-2/5 px-2 md:mr-1 outline-none duration-150 bg-white/20 py-1.5"
            onChange={(e) => setTodoName(e.target.value )}
        />
        <input
           required
            type="text"
            placeholder="Write Todo..."
            value={todo}
            className=" w-full border border-black/10 inline-block rounded-lg sm:rounded-none sm:rounded-l-lg px-2 outline-none duration-150 bg-white/20 py-1.5"
            onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit" className="rounded-lg block ml-auto mt-1 sm:mt-0 sm:rounded-none sm:rounded-r-lg px-3 py-1.5 md:py-1 bg-green-600 text-white shrink-0">
            Add
        </button>
    </form>
    <div>
        <TodoItems todoList={todoList} setTodoList={setTodoList}/>
    </div>
    </>
);
}

export default TodoForm;
