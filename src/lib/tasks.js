export const CATEGORIES = [
    "Estudos",
    "Trabalho",
    "Pessoal",
    "Casa",
    "Outros",
];
export const PRIORITY_LABEL = {
    alta: "Alta",
    media: "Média",
    baixa: "Baixa",
};
export const PRIORITY_ORDER = {
    alta: 0,
    media: 1,
    baixa: 2,
};
const STORAGE_KEY = "taskflow.tasks.v1";
function dateOffset(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
export const seedTasks = [
    {
        id: "seed-1",
        title: "Fechar escopo da AV2",
        description: "Definir endpoints, rotas protegidas e plano de contingência.",
        category: "Estudos",
        priority: "alta",
        dueDate: dateOffset(3),
        completed: false,
        favorite: true,
        createdAt: Date.now() - 500000,
    },
    {
        id: "seed-2",
        title: "Formulário controlado com validação",
        description: "Título obrigatório, data válida e categoria selecionada.",
        category: "Estudos",
        priority: "media",
        dueDate: dateOffset(5),
        completed: false,
        favorite: false,
        createdAt: Date.now() - 400000,
    },
    {
        id: "seed-3",
        title: "Revisar lista de compras",
        description: "Separar o que dá pra comprar no mercado do bairro.",
        category: "Casa",
        priority: "baixa",
        dueDate: dateOffset(-1),
        completed: true,
        favorite: false,
        createdAt: Date.now() - 300000,
    },
];
function isValidDate(value) {
    if (typeof value !== "string")
        return false;
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match)
        return false;
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const date = new Date(year, month - 1, day);
    return (date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day);
}
function isTask(value) {
    if (!value || typeof value !== "object")
        return false;
    const task = value;
    return (typeof task.id === "string" &&
        typeof task.title === "string" &&
        task.title.length <= 80 &&
        typeof task.description === "string" &&
        task.description.length <= 200 &&
        CATEGORIES.includes(task.category) &&
        ["alta", "media", "baixa"].includes(task.priority) &&
        isValidDate(task.dueDate) &&
        typeof task.completed === "boolean" &&
        typeof task.favorite === "boolean" &&
        typeof task.createdAt === "number" &&
        Number.isFinite(task.createdAt));
}
export function loadTasks() {
    if (typeof window === "undefined")
        return seedTasks;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw)
            return seedTasks;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed))
            return seedTasks;
        return parsed.filter(isTask);
    }
    catch {
        // Storage can be unavailable in private browsing or when its data is invalid.
        return seedTasks;
    }
}
export function saveTasks(tasks) {
    if (typeof window === "undefined")
        return;
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
    catch {
        // Keep the app usable in memory if browser storage is blocked or full.
    }
}
export function createId() {
    return `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
