import { useEffect, useState } from "react";
import API from "../api/api";


export default function TodoList() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await API.get("/todos");
    setTodos(res.data);
  };

  return (
    <div>
      <h2>Todo List</h2>

      {todos.map((todo: any) => (
        <div key={todo.id}>
          {todo.title} - {todo.category} - {todo.due_date}
        </div>
      ))}
    </div>
  );
}