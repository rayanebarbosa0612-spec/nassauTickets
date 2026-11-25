import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Nav } from "../components/Nav";
import { TaskForm } from "../components/TaskForm";
import { useTasks } from "../lib/useTasks";
export default function EditTask() {
    const { id } = useParams();
    const { tasks, setTasks, hydrated } = useTasks();
    const navigate = useNavigate();
    const task = tasks.find((t) => t.id === id) ?? null;
    return (<>
      <Nav />
      <main className="mx-auto max-w-xl px-5 py-10">
        {!hydrated ? (<p className="text-sm text-muted-foreground">Carregando…</p>) : !task ? (<div className="rounded-sm border border-dashed border-border px-6 py-14 text-center">
            <p className="font-display text-base font-semibold">Tarefa não encontrada</p>
            <Link to="/tarefas" className="mt-3 inline-block text-sm text-primary underline">
              Voltar para a lista
            </Link>
          </div>) : (<TaskForm editing={task} onCancel={() => navigate("/tarefas")} onSubmit={(draft) => {
                setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...draft } : t)));
                navigate("/tarefas");
            }}/>)}
      </main>
    </>);
}
