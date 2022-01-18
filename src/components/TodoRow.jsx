import { Button } from "react-bootstrap";

export default function TodoRow({ todo, index, editTodo, markTodo, removeTodo }) {
    return (
        <div className="todo">
            <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
                {todo.name}
            </span>
            <div>
                { !todo.isDone &&
                    <Button variant='outline-secondary' onClick={() => {
                        editTodo(index)
                        }}>Edit</Button>
                }{'    '}

                { !todo.isDone &&
                    <Button variant='outline-success' onClick={() => markTodo(index)}>✓</Button>
                }{'    '}

                <Button variant='outline-danger' onClick={() => removeTodo(index)}>✕</Button>
            </div>
        </div>
    );
  }