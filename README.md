# Fluxo — planner de tarefas | AV2

## Problema e público
Organizar compromissos de estudantes e pessoas que conciliam estudos, trabalho e casa.

## Integrantes e contribuição
- **Laís Melissa:** implementação da AV2 com auxílio de IA, testes das funcionalidades, versionamento e publicação no GitHub.
- **Rayane Barbosa:** immplementação da Av1 com auxilio de IA, testes das funcionalidades, versionamento e publicação no GitHub.
- **Thiago:** Responsavel pela Documentação e testes das funcionalidades.

## Execução
Node.js 20+ (preferencialmente 22). Execute `npm install` e `npm run dev`. Abra o endereço indicado pelo Vite. `npm run build` gera a versão de produção. O npm gera package-lock.json na instalação: inclua esse arquivo no commit. Não envie node_modules ou .env.

## Funcionalidades e rotas
- `/`: apresentação pública.
- `/login`: autenticação DummyJSON; credenciais públicas de demonstração exibidas na interface.
- `/tarefas`: área protegida, indicadores, busca, filtros, favoritos, conclusão e exclusão.
- `/nova-tarefa`: cadastro protegido e validado.
- `/tarefa/:id`: edição protegida.

## Tecnologias
React, JavaScript (JSX), Vite, React Router, CSS tradicional e fetch.

## Contrato da API — opção A
Base https://dummyjson.com, configurável por VITE_API_URL (.env.example).
- POST /auth/login: JSON {username,password,expiresInMins}; retorna usuário e accessToken. Erros de credenciais são exibidos.
- GET /auth/me: Authorization Bearer accessToken; retorna usuário autenticado; 401/403 encerram sessão.
- GET /todos/user/:id: retorna {todos:[{id,todo,completed,userId}],total,skip,limit}. A interface adapta os campos; categoria, prioridade e prazo são valores locais adicionados pelo Fluxo, não informações fornecidas pela API.

## Dados e persistência
Tarefas remotas são importadas uma vez por ID e combinadas com as tarefas locais. Cadastro, edição, exclusão, favoritos e conclusão são locais, por conta, no localStorage; não são gravações no servidor. A API DummyJSON simula mutações e não persiste alterações. Sessão local guarda dados retornados pela API, nunca a senha digitada; logout remove sessão. Não use credenciais pessoais na demonstração.

## Evolução AV1 → AV2
| Aspecto | AV1 | AV2 | Evidência |
|---|---|---|---|
| Dados | Exemplos locais | Importação de tarefas remotas | services/api.js, lib/useTasks.jsx |
| Auth | Ausente | Login, sessão, logout, rotas protegidas | lib/auth.jsx, pages/Login.jsx, main.jsx |
| Interface | Lista e vazio | Carregamento, sucesso, erro e retry | pages/TaskList.jsx |
| Organização | TanStack/TS/Tailwind | React Router/JS/CSS | src/pages, src/services, src/styles.css |

## Limitações e contingência
Se a consulta de tarefas falhar, o aplicativo mantém tarefas locais compatíveis com o domínio e permite tentar novamente. Login inicial exige rede; não há autenticação falsa offline. Sessão é verificada após recarregar; falha na verificação exige novo login. Dados locais não sincronizam entre dispositivos. Credenciais de demonstração são públicas, não segredos. O armazenamento de tokens no navegador é adequado apenas ao protótipo educacional, não a produção.

## Uso de IA
ChatGPT auxiliou na revisão da AV1, migração da estrutura, geração da integração, autenticação, CSS e documentação da AV2. A equipe precisa revisar, testar e saber explicar o código antes da entrega. A execução completa e a API não foram verificadas no ambiente de geração, que não possui acesso ao registro npm.

## Entrega
Usar o mesmo repositório da AV1, preservar histórico e tag entrega-av1. Cada integrante deve realizar commits reais das suas contribuições. Após testes, marcar o commit final com `git tag entrega-av2` e `git push origin entrega-av2`. Enviar link e hash do commit no Teams.
## Testes e validação

O projeto foi executado e testado localmente utilizando Node.js e Vite.

Funcionalidades verificadas:

- Login e autenticação de usuários.
- Integração com a API DummyJSON.
- Listagem de tarefas.
- Cadastro, edição e exclusão de tarefas.
- Marcação de tarefas como concluídas.
- Adição e remoção de favoritos.
- Filtros de tarefas.
- Persistência local dos dados.

A instalação das dependências e a geração do build de produção foram realizadas com sucesso.

Os testes manuais realizados apresentaram resultados satisfatórios.
