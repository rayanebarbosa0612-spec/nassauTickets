import React from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "../components/Nav";
import { TaskForm } from "../components/TaskForm";
import { createId } from "../lib/tasks";
import { useTasks } from "../lib/useTasks";
export default function NewTask() {
    const { setTasks } = useTasks();
    const navigate = useNavigate();
    return (<>
      <Nav />
      <main className="mx-auto max-w-xl px-5 py-10">
        <TaskForm editing={null} onCancel={() => navigate("/tarefas")} onSubmit={(draft) => {
            setTasks((prev) => [
                { ...draft, id: createId(), completed: false, favorite: false, createdAt: Date.now() },
                ...prev,
            ]);
            navigate("/tarefas");
        }}/>
      </main>
    </>);
}
