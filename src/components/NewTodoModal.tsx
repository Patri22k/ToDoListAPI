import React from "react";
import {createTodo} from "../api/todo.ts";
import CustomButton from "./CustomButton.tsx";
import CustomInput from "./CustomInput.tsx";
import CustomTextarea from "./CustomTextarea.tsx";

interface NewTodoModalProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onClose: () => void;
  onCreated: () => void;
}

const NewTodoModal = ({ onClose, onCreated, ...rest }: NewTodoModalProps) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const result = await createTodo(title, description);
    setLoading(false);

    if (result.success) {
      onCreated();
      onClose();
    } else {
      setError(result.error.message ?? "Failed to create todo");
    }
  };

  return (
    <div
      className="fixed inset-0 m-10 flex items-center justify-center z-50 rounded-2xl shadow-xl border bg-white" {...rest}>
      <div className="w-full flex flex-col items-center justify-center gap-y-5 md:gap-y-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl">Create New Task</h2>
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
          <CustomButton type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Task"}
          </CustomButton>
          <CustomButton type="button" onClick={onClose}>
            Cancel
          </CustomButton>
          {error && (
            <p className="text-red-600">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewTodoModal;