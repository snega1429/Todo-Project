import { useEffect, useState } from "react";
import API from "../api/api";

type Todo = {
  id: number;
  title: string;
  category: string;
  due_date: string;
};

export default function TodoList({ refresh }: { refresh: boolean }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, [refresh]);

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      console.log("Fetched Todos:", res.data); // 🔥 debug
      setTodos(res.data);
    } catch (error) {
      console.log("Fetch failed");
    }
  };

  const formatDate = (date: string) => {
    if (!date) return "No date";
    return new Date(date).toLocaleDateString("en-IN");
  };

  const handleDelete = async (id: number) => {
    try {
      await API.delete(`/todos/${id}`);
      console.log("Deleted:", id);
      fetchTodos(); // 🔥 refresh after delete
    } catch (error) {
      console.log("Delete failed");
    }
  };

  return (
    <div>
      <h2>Todo List</h2>

      {/* 🔥 empty state */}
      {todos.length === 0 && <p>No todos available</p>}

      {todos.map((todo) => (
        <div key={todo.id} style={{ marginBottom: "10px" }}>
          <strong>{todo.title}</strong> | {todo.category} -{" "}
          {formatDate(todo.due_date)}

          <button
            onClick={() => handleDelete(todo.id)}
            style={{ marginLeft: "10px", color: "yellow" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}