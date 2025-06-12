import TodoLayout from "../layouts/TodoLayout.tsx";
import TodoGridLayout from "../layouts/TodoGridLayout.tsx";
import * as React from "react";
import {deleteTodo, fetchTodos} from "../api/todo.ts";
import {useEffect} from "react";
import Sidebar from "../components/Sidebar.tsx";
import SidebarTask from "../components/SidebarTask.tsx";
import NewTodoModal from "../components/NewTodoModal.tsx";
import {MdDeleteOutline} from "react-icons/md";
import {FaRegEdit} from "react-icons/fa";
import EditTodoModal from "../components/EditTodoModal.tsx";
import CustomLink from "../components/Link.tsx";

export interface TodoItem {
  id: number;
  title: string;
  status?: string;
  description: string;
}

const TodoList = () => {
  const [todos, setTodos] = React.useState<TodoItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [showNewTodoModal, setShowNewTodoModal] = React.useState(false);
  const [editTodo, setEditTodo] = React.useState<TodoItem | null>(null);

  const handleNewTask = () => {
    setShowNewTodoModal(true);
  };

  const handleEditTask = (todo: TodoItem) => {
    setEditTodo(todo);
  }

  const handleDeleteTask = async (id: number) => {
    // Reset error state
    setError("");

    setLoading(true);
    const result = await deleteTodo(id);
    setLoading(false);

    if (result.success) {
      setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
    } else {
      setError(result.error.message || "Failed to delete todo");
    }
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
      <Sidebar>
        <SidebarTask onClick={handleNewTask}>
          New Task
        </SidebarTask>
        <CustomLink text="Log out" to="/" />
      </Sidebar>
      <div className="flex flex-col w-full sm:w-fit gap-y-3 py-3 md:py-6">
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
                <div className="flex items-center justify-between m-2">
                  <p>Status: {todo.status}</p>
                  <div className="flex items-center justify-center text-center gap-x-4">
                    <FaRegEdit
                      className="text-xl cursor-pointer"
                      onClick={() => handleEditTask(todo)}
                    />
                    <MdDeleteOutline
                      className="text-xl cursor-pointer"
                      onClick={() => handleDeleteTask(todo.id)}
                    />
                  </div>
                </div>
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
          onCreated={loadTodos}
          onClose={() => setShowNewTodoModal(false)}
        />
      )}
      {editTodo !== null && (
        <EditTodoModal
          onCreated={loadTodos}
          todo={editTodo}
          onClose={() => setEditTodo(null)}
        />
      )}
    </TodoLayout>
  );
};

export default TodoList;