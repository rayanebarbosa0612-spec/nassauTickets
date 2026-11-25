import React from "react";
import { useEffect, useState } from "react";
import { CATEGORIES, PRIORITY_LABEL, } from "../lib/tasks";
const empty = {
    title: "",
    description: "",
    category: "Estudos",
    priority: "media",
    dueDate: "",
};
function validate(draft) {
    const errors = {};
    if (draft.title.trim().length < 3)
        errors.title = "Informe um título com pelo menos 3 caracteres.";
    if (draft.title.trim().length > 80)
        errors.title = "Máximo de 80 caracteres.";
    if (draft.description.length > 200)
        errors.description = "Máximo de 200 caracteres.";
    if (!draft.dueDate) {
        errors.dueDate = "Escolha uma data de entrega.";
    }
    else {
        const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(draft.dueDate);
        if (!match) {
            errors.dueDate = "Informe uma data válida.";
        }
        else {
            const year = Number(match[1]);
            const month = Number(match[2]);
            const day = Number(match[3]);
            const date = new Date(year, month - 1, day);
            if (date.getFullYear() !== year ||
                date.getMonth() !== month - 1 ||
                date.getDate() !== day) {
                errors.dueDate = "Informe uma data válida.";
            }
        }
    }
    return errors;
}
const fieldClass = "w-full rounded-sm border border-input bg-card px-3 py-2 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/25";
export function TaskForm({ editing, onSubmit, onCancel, }) {
    const [draft, setDraft] = useState(empty);
    const [touched, setTouched] = useState({});
    useEffect(() => {
        if (editing) {
            setDraft({
                title: editing.title,
                description: editing.description,
                category: editing.category,
                priority: editing.priority,
                dueDate: editing.dueDate,
            });
            setTouched({});
        }
        else {
            setDraft(empty);
            setTouched({});
        }
    }, [editing]);
    const errors = validate(draft);
    const show = (key) => (touched[key] ? errors[key] : undefined);
    return (<form onSubmit={(e) => {
            e.preventDefault();
            setTouched({ title: true, description: true, dueDate: true });
            if (Object.keys(errors).length > 0)
                return;
            onSubmit({ ...draft, title: draft.title.trim() });
            if (!editing)
                setDraft(empty);
            setTouched({});
        }} className="ledger-row space-y-4 rounded-sm p-5" style={{ borderLeftColor: "var(--color-primary)" }}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-display text-lg font-semibold">
          {editing ? "Editar tarefa" : "Nova tarefa"}
        </h2>
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          registro
        </span>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="title" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Título
        </label>
        <input id="title" required maxLength={80} aria-invalid={Boolean(show("title"))} className={fieldClass} value={draft.title} placeholder="Ex.: Preparar apresentação da AV2" onChange={(e) => setDraft({ ...draft, title: e.target.value })} onBlur={() => setTouched((t) => ({ ...t, title: true }))}/>
        {show("title") && <p className="text-xs text-destructive">{show("title")}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="description" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Descrição
        </label>
        <textarea id="description" rows={3} maxLength={200} className={fieldClass} value={draft.description} placeholder="Detalhes, links, critérios de conclusão…" onChange={(e) => setDraft({ ...draft, description: e.target.value })} onBlur={() => setTouched((t) => ({ ...t, description: true }))}/>
        <div className="flex justify-between text-xs">
          <span className="text-destructive">{show("description")}</span>
          <span className="text-muted-foreground">{draft.description.length}/200</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <label htmlFor="category" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Categoria
          </label>
          <select id="category" className={fieldClass} value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })}>
            {CATEGORIES.map((c) => (<option key={c} value={c}>
                {c}
              </option>))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="priority" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Prioridade
          </label>
          <select id="priority" className={fieldClass} value={draft.priority} onChange={(e) => setDraft({ ...draft, priority: e.target.value })}>
            {Object.keys(PRIORITY_LABEL).map((p) => (<option key={p} value={p}>
                {PRIORITY_LABEL[p]}
              </option>))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="dueDate" className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Entrega
          </label>
          <input id="dueDate" type="date" required aria-invalid={Boolean(show("dueDate"))} className={fieldClass} value={draft.dueDate} onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })} onBlur={() => setTouched((t) => ({ ...t, dueDate: true }))}/>
          {show("dueDate") && (<p className="text-xs text-destructive">{show("dueDate")}</p>)}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        <button type="submit" className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
          {editing ? "Salvar alterações" : "Adicionar tarefa"}
        </button>
        {editing && (<button type="button" onClick={onCancel} className="rounded-sm border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent">
            Cancelar
          </button>)}
      </div>
    </form>);
}
