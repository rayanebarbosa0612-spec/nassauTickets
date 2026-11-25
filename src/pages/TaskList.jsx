import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Nav } from "../components/Nav";
import { TaskRow } from "../components/TaskRow";
import { CATEGORIES, PRIORITY_LABEL, PRIORITY_ORDER } from "../lib/tasks";
import { useTasks } from "../lib/useTasks";
const chip = "rounded-sm border px-3 py-1.5 text-xs font-medium uppercase tracking-wide transition";
const selectClass = "rounded-sm border border-input bg-card px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/25";
export default function TaskList() {
    const { tasks, setTasks, status: network, retry, message } = useTasks();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("todas");
    const [priority, setPriority] = useState("todas");
    const [status, setStatus] = useState("todas");
    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        return tasks
            .filter((t) => {
            if (q && !`${t.title} ${t.description}`.toLowerCase().includes(q))
                return false;
            if (category !== "todas" && t.category !== category)
                return false;
            if (priority !== "todas" && t.priority !== priority)
                return false;
            if (status === "pendentes" && t.completed)
                return false;
            if (status === "concluidas" && !t.completed)
                return false;
            if (status === "favoritas" && !t.favorite)
                return false;
            return true;
        })
            .sort((a, b) => {
            if (a.completed !== b.completed)
                return a.completed ? 1 : -1;
            if (a.favorite !== b.favorite)
                return a.favorite ? -1 : 1;
            const p = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
            if (p !== 0)
                return p;
            return a.dueDate.localeCompare(b.dueDate);
        });
    }, [tasks, query, category, priority, status]);
    const done = tasks.filter((t) => t.completed).length;
    return (<>
      <Nav />
      <main className="mx-auto max-w-5xl px-5 py-10">
        <div role="status" className="notice">{network === "loading" ? "Carregando tarefas da API…" : network === "error" ? "API indisponível. Exibindo dados locais." : "Dados da API carregados. Alterações salvas localmente."} {network === "error" && <button onClick={retry}>Tentar novamente</button>} {message}</div><header className="border-b-2 border-foreground/80 pb-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-display text-4xl font-bold">Minhas tarefas</h1>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{tasks.length - done}</span> pendentes ·{" "}
              <span className="font-semibold" style={{ color: "var(--color-done)" }}>{done}</span> concluídas ·{" "}
              {tasks.length} no total
            </p>
          </div>
        </header>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por título ou descrição…" className={`${selectClass} min-w-[200px] flex-1`} aria-label="Buscar tarefas"/>
          <select className={selectClass} value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filtrar por categoria">
            <option value="todas">Todas as categorias</option>
            {CATEGORIES.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
          <select className={selectClass} value={priority} onChange={(e) => setPriority(e.target.value)} aria-label="Filtrar por prioridade">
            <option value="todas">Todas as prioridades</option>
            {Object.keys(PRIORITY_LABEL).map((p) => (<option key={p} value={p}>{PRIORITY_LABEL[p]}</option>))}
          </select>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {[
            ["todas", "Todas"],
            ["pendentes", "Pendentes"],
            ["concluidas", "Concluídas"],
            ["favoritas", "Favoritas"],
        ].map(([value, label]) => (<button key={value} type="button" onClick={() => setStatus(value)} className={`${chip} ${status === value ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:bg-accent"}`}>
              {label}
            </button>))}
        </div>

        {visible.length === 0 ? (<div className="mt-6 rounded-sm border border-dashed border-border px-6 py-14 text-center">
            <p className="font-display text-base font-semibold">Nenhuma tarefa encontrada</p>
            <p className="mt-1 text-sm text-muted-foreground">Ajuste a busca e os filtros, ou cadastre uma nova tarefa.</p>
            <Link to="/nova-tarefa" className="mt-4 inline-block rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              Nova tarefa
            </Link>
          </div>) : (<ul className="mt-6 space-y-2">
            {visible.map((task) => (<TaskRow key={task.id} task={task} onToggle={() => setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t)))} onFavorite={() => setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, favorite: !t.favorite } : t)))} onEdit={() => navigate(`/tarefa/${task.id}`)} onDelete={() => setTasks((prev) => prev.filter((t) => t.id !== task.id))}/>))}
          </ul>)}
      </main>
    </>);
}
