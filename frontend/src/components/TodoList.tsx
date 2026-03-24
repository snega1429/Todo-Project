import { useEffect, useState } from "react";
import API from "../api/api";

export default function TodoList({ refresh }: { refresh: boolean }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, [refresh]);

  const fetchTodos = async () => {
    const res = await API.get("/todos");
    setTodos(res.data);
  };

  // ✅ Format date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN");
  };

  // ✅ Delete function
  const handleDelete = async (id: number) => {
    try {
      await API.delete(`/todos/${id}`); // fixed template literal
      fetchTodos();
    } catch (error) {
      console.log("Delete failed ❌");
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      {todos.map((todo: any) => (
        <div key={todo.id} style={{ marginBottom: "10px" }}>
          <strong>{todo.title}</strong> | {todo.category} - {formatDate(todo.due_date)}
          <button
            onClick={() => handleDelete(todo.id)}
            style={{ marginBottom: "10px", color: "red" }}
          >
            Delete ❌
          </button>
        </div>
      ))}
    </div>
  );
}