import React from "react";
import { PRIORITY_LABEL } from "../lib/tasks";
const priorityVar = {
    alta: "var(--color-high)",
    media: "var(--color-medium)",
    baixa: "var(--color-low)",
};
function formatDate(value) {
    if (!value)
        return "sem data";
    const [y, m, d] = value.split("-");
    return `${d}/${m}/${y}`;
}
export function TaskRow({ task, onToggle, onFavorite, onEdit, onDelete, }) {
    return (<li className="ledger-row group flex items-start gap-3 rounded-sm px-4 py-3 transition hover:bg-accent/40" style={{
            borderLeftColor: task.completed
                ? "var(--color-done)"
                : priorityVar[task.priority],
        }}>
      <button type="button" onClick={onToggle} aria-label={task.completed ? "Marcar como pendente" : "Marcar como concluída"} className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[3px] border border-border transition" style={task.completed
            ? { backgroundColor: "var(--color-done)", borderColor: "var(--color-done)" }
            : undefined}>
        {task.completed && (<svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="var(--color-card)" strokeWidth="2.5">
            <path d="M3 8.5l3.2 3.2L13 5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>)}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className={`font-display text-sm font-semibold ${task.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>
            {task.title}
          </h3>
          <span className="rounded-[3px] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider" style={{ color: priorityVar[task.priority], border: `1px solid ${priorityVar[task.priority]}` }}>
            {PRIORITY_LABEL[task.priority]}
          </span>
        </div>
        {task.description && (<p className="mt-1 text-sm text-muted-foreground">{task.description}</p>)}
        <p className="mt-1.5 text-xs text-muted-foreground">
          {task.category} · entrega {formatDate(task.dueDate)}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button type="button" onClick={onFavorite} aria-label="Favoritar" aria-pressed={task.favorite} className="rounded-sm p-1.5 transition hover:bg-accent">
          <svg viewBox="0 0 24 24" className="size-4" fill={task.favorite ? "var(--color-star)" : "none"} stroke={task.favorite ? "var(--color-star)" : "currentColor"} strokeWidth="1.8">
            <path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.7l5.9-.9z" strokeLinejoin="round"/>
          </svg>
        </button>
        <button type="button" onClick={onEdit} className="rounded-sm px-2 py-1 text-xs font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground">
          Editar
        </button>
        <button type="button" onClick={onDelete} className="rounded-sm px-2 py-1 text-xs font-medium text-destructive transition hover:bg-destructive/10">
          Excluir
        </button>
      </div>
    </li>);
}
