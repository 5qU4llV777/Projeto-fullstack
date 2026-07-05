# TaskFlow

Plataforma full-stack de gerenciamento de tarefas, desenvolvida como projeto de portfólio para demonstrar domínio de desenvolvimento full-stack moderno: **React/Next.js** no frontend e **Node.js/Nest.js** no backend, com persistência híbrida em **PostgreSQL** e **MongoDB**.

## Sobre o projeto

O TaskFlow permite que usuários se cadastrem, criem projetos e organizem tarefas dentro de cada projeto, marcando-as como concluídas ou excluindo-as. O projeto foi construído com foco em:

- Arquitetura organizada em módulos (backend) e componentes reutilizáveis (frontend)
- Separação clara entre dados relacionais e não-relacionais, usando cada banco onde faz mais sentido
- Autenticação segura com JWT
- Tipagem end-to-end com TypeScript, tanto no frontend quanto no backend
- Navegação fluida entre páginas, sem necessidade de digitar URLs manualmente

## Tecnologias utilizadas

### Backend
- **Node.js** com **Nest.js** (arquitetura modular: controllers, services, DTOs)
- **TypeScript**
- **PostgreSQL** via TypeORM — dados relacionais: usuários, projetos e tarefas
- **MongoDB** via Mongoose — dados não-relacionais: notificações e logs
- **JWT** (`@nestjs/jwt` + `passport-jwt`) para autenticação
- **class-validator** para validação de DTOs
- **bcrypt** para hash de senhas

### Frontend
- **Next.js** (App Router)
- **React** com **TypeScript**
- **Tailwind CSS** para estilização
- **Axios** para comunicação com a API

## Estrutura do projeto

```
Projeto-fullstack/
├── package.json            # Script raiz para rodar backend + frontend juntos
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/          # Registro, login e JWT
│   │   │   ├── users/         # Usuários (PostgreSQL)
│   │   │   ├── projects/      # Projetos (PostgreSQL)
│   │   │   ├── tasks/         # Tarefas (PostgreSQL)
│   │   │   └── notifications/ # Logs e comentários (MongoDB)
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── .env.example
│
└── frontend/
    ├── app/
    │   ├── login/
    │   ├── register/
    │   ├── tasks/
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   └── Navbar.tsx          # Navegação fixa presente em todas as páginas
    ├── services/               # Comunicação com a API (axios)
    └── types/
```

## Funcionalidades

- [x] Cadastro e login de usuários com JWT
- [x] Criação de projetos
- [x] Criação de tarefas vinculadas a um projeto
- [x] Marcar tarefas como concluídas
- [x] Excluir tarefas
- [x] Proteção de rotas da API com guard de autenticação
- [x] Validação de dados de entrada (DTOs)
- [x] Navegação por menu fixo (login, cadastro, tarefas, logout), sem precisar digitar URLs

## Como rodar o projeto localmente

### Pré-requisitos
- Node.js 18+
- PostgreSQL rodando localmente (ou acesso a uma instância)
- Uma conexão MongoDB (local ou [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), gratuito)

### 1. Clonar o repositório
```bash
git clone https://github.com/5qU4llV777/Projeto-fullstack.git
cd Projeto-fullstack
```

### 2. Configurar as variáveis de ambiente do backend

Crie um arquivo `.env` na pasta `backend` baseado no `.env.example`:
```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=sua_senha
POSTGRES_DB=fullstackdb

MONGO_URI=sua_connection_string_do_mongodb

JWT_SECRET=uma_chave_secreta_qualquer
PORT=3001
```

### 3. Instalar as dependências

```bash
npm install --prefix backend
npm install --prefix frontend
npm install
```
(o último `npm install`, na raiz, instala o `concurrently`, usado para rodar os dois projetos juntos)

### 4. Rodar backend e frontend com um único comando

Na raiz do projeto:
```bash
npm run dev
```

Isso sobe os dois servidores ao mesmo tempo, em um único terminal, com os logs identificados por cor:
- `[BACKEND]` → disponível em `http://localhost:3001`
- `[FRONTEND]` → disponível em `http://localhost:3000`

**Alternativa:** caso prefira rodar cada um separadamente (em dois terminais):
```bash
# terminal 1
cd backend && npm run start:dev

# terminal 2
cd frontend && npm run dev
```

## Endpoints principais da API

| Método | Rota                | Descrição                        | Autenticação |
|--------|---------------------|-----------------------------------|:---:|
| POST   | `/auth/register`    | Cria um novo usuário              | Não |
| POST   | `/auth/login`        | Autentica e retorna um JWT        | Não |
| GET    | `/projects`          | Lista todos os projetos           | Sim |
| POST   | `/projects`          | Cria um novo projeto              | Sim |
| GET    | `/tasks`              | Lista todas as tarefas            | Sim |
| POST   | `/tasks`              | Cria uma nova tarefa              | Sim |
| PATCH  | `/tasks/:id`          | Atualiza uma tarefa               | Sim |
| DELETE | `/tasks/:id`          | Remove uma tarefa                 | Sim |

Para rotas autenticadas, envie o token no header:
```
Authorization: Bearer <accessToken>
```

### Exemplo de fluxo de teste

**1. Registrar um usuário**
```json
POST /auth/register
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "password": "senha123"
}
```

**2. Criar um projeto** (com o token retornado no passo anterior)
```json
POST /projects
{
  "name": "Meu primeiro projeto"
}
```

**3. Criar uma tarefa**
```json
POST /tasks
{
  "title": "Minha primeira tarefa",
  "projectId": 1
}
```

## Decisões de arquitetura

**Por que PostgreSQL e MongoDB juntos?**
Dados com relacionamento claro e estrutura fixa (usuários, projetos, tarefas) vivem no PostgreSQL, aproveitando integridade referencial e transações. Dados de escrita frequente e schema mais flexível (logs de atividade e comentários) vivem no MongoDB, evitando sobrecarregar o modelo relacional com colunas específicas para cada tipo de evento.

**Por que Nest.js?**
A estrutura modular do Nest (módulos, controllers, services, DTOs) impõe organização e separação de responsabilidades desde o início, facilitando manutenção e testes.

**Por que um script raiz com `concurrently`?**
Facilita rodar o projeto inteiro em ambiente de desenvolvimento com um único comando, sem precisar abrir e gerenciar dois terminais manualmente.

## Autor

Desenvolvido por [5qU4llV777](https://github.com/5qU4llV777) como projeto de portfólio.