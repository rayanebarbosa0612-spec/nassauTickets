import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";
import { useTasks } from "../lib/useTasks";
const features = [
    ["Cadastre", "Formulário com validação de título, descrição e prazo."],
    ["Priorize", "Alta, média ou baixa — com cor própria em cada linha."],
    ["Encontre", "Busca e filtros por categoria, prioridade e status."],
    ["Conclua", "Marque como feita, favorite ou exclua. Tudo fica salvo."],
];
export default function Home() {
    const { tasks } = useTasks();
    const pending = tasks.filter((t) => !t.completed).length;
    return (<>
      <Nav />
      <main className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Planner de tarefas</p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-6xl">
          Tire as tarefas da cabeça e coloque no fluxo.
        </h1>
        <p className="mt-5 max-w-xl text-base text-muted-foreground">
          O Fluxo reúne tudo em uma lista clara, ordenada por prioridade e data de entrega, para que
          nenhum prazo passe batido.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/tarefas" className="rounded-sm bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90">
            Ver minhas tarefas 
          </Link>
          <Link to="/nova-tarefa" className="rounded-sm border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-accent">
            Cadastrar tarefa
          </Link>
        </div>
        <ul className="mt-14 grid gap-3 sm:grid-cols-2">
          {features.map(([t, d]) => (<li key={t} className="ledger-row rounded-sm p-5" style={{ borderLeftColor: "var(--color-primary)" }}>
              <h2 className="font-display text-lg font-semibold">{t}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </li>))}
        </ul>
      </main>
    </>);
}
