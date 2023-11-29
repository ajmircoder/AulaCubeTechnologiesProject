import React, { useEffect, useState } from 'react'

function TodoItem({ todoList, setTodoList }) {
    const [id, setId] = useState();
    const [editSaveText, setEditSaveText] = useState('edit');
    const todoComplete = (e) => {
        setTodoList(todoList.map((todo) => {
            if (todo.id == e.target.id) {
                todo.isComplete = e.target.checked;
            }
            return todo
        }))
    }

    const editTodo = (e) => {
        setTodoList(todoList.map((todo) => {
            if (todo.id == e.target.id) {
                todo.todo = e.target.value
            }
            return todo
        }))

    }
    const saveTodo = (e) => {
        if (editSaveText == "save") {
            setEditSaveText("edit")
            setId('');
        }
    }
    const deleteTodo = (e) => {
        const storedTodoList = JSON.parse(localStorage.getItem('todoList')) || [];
        const updatedTodoList = storedTodoList.filter((todo) => todo.id !== e.target.id);
        localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
        setTodoList(updatedTodoList);
    }
    return (<>
        <div
            className={`mt-2 border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black`}
        >
            {todoList.length ? "" : <p className='text-white text-center md:text-2xl'>Add Your First Todo</p>}
            {todoList.map((todo, i) => {
                return <div className='sm:grid md:grid-cols-[2%_12%_1fr_17%] lg:grid-cols-[2%_12%_1fr_11%] xl:grid-cols-[2%_12%_1fr_9%] gap-1.5' key={todo.id}>
                    <div className='sm:flex justify-around items-center mb-2'>
                        <input type="checkbox" onChange={(e) => todoComplete(e)} name="" id={todo.id} />
                    </div>
                    <input className={`${todo.isComplete ? "line-through bg-cyan-300" : ""} 
                    w-full px-1 inline-block mb-2 border outline-none rounded-lg h-10 bg-[#ccbed7]`} value={todo.todoName} />
                    <input onChange={(e) => editTodo(e)} readOnly={!todo.isComplete && todo.id == id ? false : true} id={todo.id}
                        className={`${todo.isComplete ? "line-through bg-cyan-300" : ""} ${todo.inComplete && todo.id == id ? " bg-slate-300" : ""} 
                        w-full px-1 inline-block mb-2 border outline-none rounded-lg h-10 bg-[#ccbed7]`}
                        value={todo.todo} />
                    <div className='flex justify-end md:justify-around md:items-center'>
                        <button id={todo.id} onClick={(e) => {
                            setEditSaveText("save")
                            setId(e.target.id);
                            saveTodo(e);
                        }} className='bg-green-200 mr-2 md:mr-1 px-2 py-1 rounded-lg mb-2'>{!todo.isComplete && todo.id == id ? editSaveText : "edit"}</button>
                        <button onClick={(e) => deleteTodo(e)} id={todo.id} className='bg-red-500 px-2 py-1 rounded-lg mb-2'>delete</button>
                    </div>
                </div>
            })}

        </div>
    </>
    );
}

export default TodoItem;
