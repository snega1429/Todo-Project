// src/components/TodoList.tsx
import { useEffect, useState } from "react";
import API from "../api/api";

type Todo = {
  id: number;
  title: string;
  category: string;
  due_date: string;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      console.log("Fetched todos:", res.data); // ✅ Debug
      if (res.data && res.data.length > 0) {
        setTodos(res.data);
      } else {
        setTodos([]);
      }
    } catch (err: any) {
      console.error("Error fetching todos:", err);
      setError("Failed to load todos. Check API connection.");
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading Todos...</p>;
  if (error) return <p>{error}</p>;
  if (!todos.length) return <p>No Todos Found</p>;

  return (
    <div>
      <h2>Todo List</h2>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.title} - {todo.category} - {todo.due_date}
        </div>
      ))}
    </div>
  );
}