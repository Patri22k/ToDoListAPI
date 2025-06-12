import TodoLayout from "../layouts/TodoLayout.tsx";
import TodoGridLayout from "../layouts/TodoGridLayout.tsx";
import * as React from "react";
import {fetchTodos} from "../api/todo.ts";
import {useEffect} from "react";
import Sidebar from "../components/Sidebar.tsx";
import SidebarTask from "../components/SidebarTask.tsx";
import NewTodoModal from "../components/NewTodoModal.tsx";

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
  const [showNewTodoModal, setShowNewTodoModal] = React.useState(false);

  const handleNewTask = () => {
    setShowNewTodoModal(true);
  };

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
      <Sidebar className="hidden sm:block sm:w-1/3 lg:w-1/4">
        <SidebarTask onClick={handleNewTask}>
          New Task
        </SidebarTask>
      </Sidebar>
      <div className="flex flex-col w-full sm:w-fit gap-y-3">
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
                   className="w-full break-inside-avoid text-left rounded-lg border">
                <h2 className="mx-2 mt-2 text-lg font-bold">{todo.title}</h2>
                <p className="h-full mx-2 overflow-hidden">{todo.description}</p>
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
      {showNewTodoModal && (
        <NewTodoModal
          onClose={() => setShowNewTodoModal(false)}
          onCreated={loadTodos}
        />
      )}
    </TodoLayout>
  );
};

export default TodoList;