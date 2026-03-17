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

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading Todos...</p>;
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