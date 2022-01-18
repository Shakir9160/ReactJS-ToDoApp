import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { DB } from "../utils/DB";


export default function FormTodo(props) {
    console.log('**', props)
    const { isAdd, editIndex, onAdd } = props;
    const [text, setText] = useState("");

    useEffect(() => {
        if (!isAdd) {
            let editTodos = DB.getData("todos") || [];
            console.log('name', editTodos[editIndex].name);
            setText(editTodos[editIndex].name);
        }
    }, [isAdd, editIndex]);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!text) return;
      
        let newTodos = DB.getData("todos") || [];

        if (isAdd) {
            newTodos = [...newTodos, {name: text, isDone: false}];
        } else {
            newTodos[editIndex].name = text;
        }

        DB.setData("todos", newTodos);
        setText("");
        onAdd();
    };
  
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label><b>Add Todo</b></Form.Label>
          <Form.Control type="text" className="input" value={text} onChange={event => setText(event.target.value)} placeholder={isAdd ? "Add new todo" : "Edit todo"} />
        </Form.Group>
        <Button variant="primary mb-3" type="submit">{isAdd ? 'Add' : 'Edit'}</Button>
      </Form>
    );
  }