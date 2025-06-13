import TodoModalLayout from "../layouts/TodoModalLayout.tsx";
import React, {useEffect} from "react";
import CustomInput from "./CustomInput.tsx";
import CustomTextarea from "./CustomTextarea.tsx";
import CustomButton from "./CustomButton.tsx";
import {editTodo} from "../api/todo.ts";
import type {TodoItem} from "../pages/TodoList.tsx";

interface EditTodoModalProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onCreated: () => void;
  todo: TodoItem;
  onClose: () => void;
}

const EditTodoModal = ({ onCreated, todo, onClose, ...rest }: EditTodoModalProps) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await editTodo(todo.id, title, description);
    setLoading(false);

    if (response.success) {
      onCreated();
      onClose();
      window.location.href = "/todos";
    } else {
      setError(response.error.message ?? "An error occurred while editing the todo");
    }
  }

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    }
  }, [todo]);

  return (
    <TodoModalLayout {...rest}>
      <TodoModalLayout.Inner>
        <h2 className="text-3xl md:text-4xl lg:text-5xl">Edit</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-3 w-2/3 mx-auto">
          <CustomInput
            type="text"
            value={title}
            placeholder="Enter task name"
            onChange={(e) => setTitle(e.target.value)}
          />
          <CustomTextarea
            value={description}
            placeholder="Enter task description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <CustomButton
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </CustomButton>
          <CustomButton
            type="button"
            onClick={onClose}
          >
            Cancel
          </CustomButton>
        </form>
        {error && <p className="text-red-600">{error}</p>}
      </TodoModalLayout.Inner>
    </TodoModalLayout>
  );
};

export default EditTodoModal;