import React, { useEffect } from 'react'
import  { useState } from 'react';
import { Card } from 'react-bootstrap';
import FormTodo from '../components/FormTodo';
import TodoRow from '../components/TodoRow';
import { DB } from '../utils/DB';


export default function Main() {
    const [isAdd, setIsAdd] = useState(true);
    const [editIndex, setEditIndex] = useState(0);
    const [todo, setTodo] = useState({});
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [seed, setSeed] = useState(0);
    
    useEffect(() => {
        const todoList = DB.getData("todos");
        
        if (todoList) {
            setTodos(todoList);
        }
        setIsAdd(true);
        setLoading(false);
    }, [seed]);

    const editTodo = (index) => {
        setIsAdd(false);
        setEditIndex(index);
        <FormTodo onAdd={() => setSeed(seed+1)} setEditIndex={setEditIndex} editIndex={editIndex} setIsAdd={setIsAdd} isAdd={isAdd} />
    };

    const markTodo = (index) => {
        let todosList = [...todos];
        todosList[index].isDone = true;
        DB.setData("todos", todosList);
        setTodos(todosList);
    };

    const removeTodo = (index) => {
        let todosList = [...todos];
        todosList.splice(index, 1);
        DB.setData("todos", todosList);
        setTodos(todosList);
    };

    return (
        <>
        <div className="container">
            <h1 className="text-center mb-4">Todo List</h1>
            <FormTodo onAdd={() => setSeed(seed+1)} setEditIndex={setEditIndex} editIndex={editIndex} setIsAdd={setIsAdd} isAdd={isAdd} todo={todo} />
            <div>
                {!loading && todos.map((todo, index) => (
                    <Card key={index}>
                        <Card.Body>
                            <TodoRow
                            todo={todo}
                            index={index}
                            editTodo={editTodo}
                            markTodo={markTodo}
                            removeTodo={removeTodo}
                            setIsAdd={setIsAdd}
                            isAdd={isAdd}
                            />
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
        </>
    )
}
