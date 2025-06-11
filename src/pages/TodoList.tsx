import TodoLayout from "../layouts/TodoLayout.tsx";
import TodoGridLayout from "../layouts/TodoGridLayout.tsx";
import * as React from "react";
import {fetchTodos} from "../api/todo.ts";
import {useEffect} from "react";
import Sidebar from "../components/Sidebar.tsx";

interface TodoItem {
  id: number;
  title: string;
  status: string;
  description: string;
}

const TodoList = () => {
  const [todos, setTodos] = React.useState<TodoItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const loadTodos = async () => {
    setLoading(true);
    const result = await fetchTodos();
    setLoading(false);

    if (result.success) {
      setTodos(result.data.data);
    } else {
      setError(result.error || "Failed to fetch todos");
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <TodoLayout>
      <Sidebar className="hidden md:block md:w-1/3">
        <p>Hello</p>
      </Sidebar>
      <div className="w-2/3">
        <TodoLayout.Header>
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Your Todos</h1>
        </TodoLayout.Header>
        <TodoLayout.Main>
          {loading ? (
            <div>Loading</div>
          ) : error ? (
            <p>{error}</p>
          ) : todos.length > 0 ? (
            <TodoGridLayout>{todos.map((todo) => (
              <div key={todo.id}
                   className="sm:aspect-square w-full h-full flex flex-col justify-between text-left rounded-lg border">
                <h2 className="mx-2 mt-2 text-lg font-bold">{todo.title}</h2>
                <p className="h-full mx-2">{todo.description}</p>
                <p className="mx-2 mb-2">Status: {todo.status}</p>
              </div>
            ))}
            </TodoGridLayout>
          ) : (
            <div>
              <p>No todos found.</p>
            </div>
          )}
        </TodoLayout.Main>
      </div>
    </TodoLayout>
  );
};

export default TodoList;