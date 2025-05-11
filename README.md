## Desenvolvimento Detalhado da Funcionalidade de Tarefas (Sessão Colaborativa)

Esta seção detalha as implementações e decisões de arquitetura realizadas em colaboração para adicionar a funcionalidade de gerenciamento de tarefas (TODO) ao projeto.

### 1. Interface de Usuário para Gerenciamento de Tarefas

- **O quê:** Foi desenvolvida a interface do usuário no arquivo `src/modules/task/presentation/app/task.view.tsx`.
- **Detalhes:**
  - Implementado um formulário para criação de novas tarefas (com título e descrição).
  - Exibição da lista de tarefas existentes.
  - Adição de botões para permitir a exclusão de cada tarefa.
  - Utilização dos hooks customizados `useCreateTask` e `useDeleteTask` para interagir com a lógica de negócio.
- **Porquê:** Para prover uma forma visual e interativa para o usuário gerenciar suas tarefas, seguindo o padrão MVVM onde a View é responsável pela apresentação.

### 2. ViewModel e Gerenciamento de Estado com React Query

- **O quê:**
  - Foi criado o `useTaskViewModel` (em `src/modules/task/presentation/app/task.vm.ts`) para encapsular a lógica de apresentação e o estado da `TaskView`. Isso incluiu o estado local para os campos de input do formulário de criação e as funções para manipular a criação e deleção de tarefas.
  - Os hooks `useListTasks`, `useCreateTask`, e `useDeleteTask` (em `src/modules/task/presentation/hooks/use-task-service.ts`) foram implementados usando React Query para interagir com o `TaskService`.
  - O hook `useDeleteTask` foi ajustado para receber o `id` da tarefa diretamente em sua função de mutação (`mutationFn`), tornando-o mais flexível para ser usado em listas e evitando a necessidade de criar múltiplas instâncias do hook.
- **Porquê:**
  - **ViewModel (MVVM):** Para separar as preocupações da interface do usuário (View) da sua lógica de apresentação e estado (ViewModel), facilitando a testabilidade, manutenção e organização do código. A ViewModel serve como uma intermediária entre a View e os serviços.
  - **React Query:** Para gerenciar eficientemente o estado do servidor (tarefas), incluindo caching, invalidação automática de queries após mutações (create/delete), atualizações em segundo plano, e tratamento de estados de loading/erro de forma declarativa e robusta.

### 3. Configuração de Componentes Cliente no Next.js

- **O quê:** Foi necessário tratar erros relacionados à renderização de componentes no Next.js quando hooks de cliente eram chamados em Server Components.
- **Detalhes:**
  - Adicionada a diretiva `'use client';` no topo dos arquivos:
    - `src/modules/task/presentation/app/task.vm.ts`: Devido ao uso de hooks do React como `useState`, `useEffect` e hooks do React Query.
    - `src/modules/task/presentation/app/page.tsx`: Pois este componente de página invoca diretamente o `useTaskViewModel`, que é um hook de cliente.
- **Porquê:** No Next.js (com App Router), componentes que utilizam hooks de cliente (como `useState`, `useEffect`, ou hooks de bibliotecas de gerenciamento de estado como React Query) precisam ser explicitamente marcados como "Client Components". Isso instrui o Next.js a renderizá-los no navegador, onde o ambiente de cliente está disponível, em vez de tentar renderizá-los no servidor.

### 4. Provedor Global para React Query

- **O quê:** Configuração do `QueryClientProvider` para o React Query.
- **Detalhes:**
  - Criado o arquivo `src/shared/components/providers.tsx` que inicializa o `QueryClient` e exporta um componente `Providers` que envolve seus filhos com o `QueryClientProvider`. Este componente também foi marcado com `'use client';`.
  - O arquivo de layout principal da aplicação (`src/app/layout.tsx`) foi modificado para utilizar o componente `Providers`, garantindo que toda a aplicação tenha acesso ao contexto do React Query.
- **Porquê:** O React Query necessita que um `QueryClientProvider` esteja presente na árvore de componentes acima de qualquer componente que utilize seus hooks. Este provider fornece o `QueryClient` necessário para todas as operações de query e mutation.

### 5. Simulação de API com JSON Server

- **O quê:** Configuração de um servidor mock para simular uma API REST para as tarefas durante o desenvolvimento.
- **Detalhes:**
  - Foi criado um arquivo `db.json` para o `json-server`. Inicialmente, foi sugerido colocá-lo na raiz, mas depois movemos para `src/modules/task/core/infra/data/db.json` para melhor organização dentro da estrutura do módulo de tarefas.
  - Este arquivo define a estrutura dos dados das tarefas, contendo um array `tasks` com objetos que possuem as propriedades: `id` (string), `title` (string), `description` (string), e `completed` (boolean), conforme definido em `src/modules/task/presentation/app/task.model.ts`.
- **Porquê:** Para permitir o desenvolvimento e teste da aplicação (especialmente as funcionalidades de CRUD de tarefas) de forma independente de um backend real, agilizando o processo de desenvolvimento front-end e permitindo focar na lógica da interface e do cliente.

### 6. Padrão de Repositório e Camada de Serviço

- **O quê:** A arquitetura do projeto já indicava o uso do padrão de Repositório e uma camada de Serviço.
- **Detalhes:**
  - No arquivo `src/modules/task/presentation/hooks/use-task-service.ts`, o `TaskService` é utilizado. Este serviço, por sua vez, depende de uma abstração de repositório (`TaskRepository`), cuja implementação concreta (por exemplo, `TaskHttpRepository` ou `InMemoryTaskRepository`) é injetada.
  - O `TaskHttpRepository` utiliza um `HttpClient` (no caso, um adaptador Axios em `src/modules/task/core/infra/http/axios/axios-adapter.ts`) para realizar chamadas HTTP.
- **Porquê:**
  - **Serviços:** Encapsulam a lógica de negócio da aplicação e coordenam o uso dos repositórios.
  - **Repositório:** Abstrai a lógica de acesso a dados, desacoplando a lógica de negócio dos detalhes específicos de como os dados são obtidos ou persistidos. Isso facilita a troca da fonte de dados (e.g., de um mock em memória para uma API HTTP, ou para um banco de dados diferente) sem impactar significativamente o resto da aplicação.

### Instruções para Executar (Considerando as Funcionalidades Adicionadas)

1.  **Instalar dependências** (se ainda não o fez):
    ```bash
    npm install
    # ou
    yarn install
    ```
2.  **Iniciar o JSON Server** (servidor mock da API):
    Abra um terminal e execute (ajuste o caminho se necessário):

    ```bash
    npx json-server --watch src/modules/task/core/infra/data/db.json --port 3001
    ```

    _Nota: Se você não tiver o `json-server` instalado globalmente, pode instalá-lo como dependência de desenvolvimento (`npm install --save-dev json-server` ou `yarn add --dev json-server`)._

3.  **Iniciar a aplicação Next.js:**
    Em outro terminal, execute:
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
4.  Acesse a aplicação, por exemplo, em `http://localhost:3000/task` (ou a rota configurada para a `TaskListPage`).
    As tarefas da API estarão disponíveis em `http://localhost:3001/tasks`.

### Estrutura de Pastas Relevante (Foco no Módulo `task`)

A estrutura de pastas adotada para o módulo `task` visa organizar o código por funcionalidade e separar as camadas de responsabilidade (apresentação, aplicação, domínio, infraestrutura), o que é comum em arquiteturas como DDD e Clean Architecture.

```
src/
├── app/                     # Configurações globais do Next.js, layout principal
├── modules/
│   └── task/
│       ├── core/            # Lógica central do módulo, independente de UI ou framework específico
│       │   ├── domain/      # (Opcional, para entidades de domínio mais ricas, value objects, etc.)
│       │   ├── infra/       # Implementações concretas de interfaces definidas no core ou na aplicação
│       │   │   ├── data/
│       │   │   │   └── db.json # Banco de dados mock para json-server
│       │   │   ├── http/
│       │   │   │   └── axios-adapter.ts # Adaptador para chamadas HTTP
│       │   │   └── repositories/
│       │   │       └── task/
│       │   │           ├── task.http.repository.ts     # Implementação do repositório via HTTP
│       │   │           └── task.in-memory.repository.ts # Exemplo de implementação em memória
│       │   └── repositories/
│       │       └── task.repository.ts # Interface/contrato do repositório de tarefas
│       ├── presentation/      # Camada de apresentação (UI)
│       │   ├── app/           # Componentes de página, views e viewmodels
│       │   │   ├── page.tsx   # Componente de página do Next.js para a lista de tarefas
│       │   │   ├── task.model.ts # Modelo de dados específico para a apresentação (View Model)
│       │   │   ├── task.view.tsx # Componente React para a visualização das tarefas
│       │   │   └── task.vm.ts    # ViewModel (useTaskViewModel)
│       │   ├── hooks/
│       │   │   └── use-task-service.ts # Hooks customizados que utilizam o TaskService
│       │   └── services/
│       │       └── task.service.ts   # Serviço de aplicação que orquestra as operações de tarefa
├── shared/                  # Componentes, utilitários ou hooks compartilhados entre módulos
│   └── components/
│       └── providers.tsx      # Provedor do React Query
└── styles/
    └── globals.css
```

- **Porquê da Estrutura Modular e em Camadas:**
  - **Alta Coesão, Baixo Acoplamento:** Cada módulo e camada tem responsabilidades bem definidas, tornando o sistema mais fácil de entender, modificar e testar.
  - **Escalabilidade e Manutenção:** Isola funcionalidades, permitindo que equipes trabalhem em diferentes partes do sistema com menos conflitos e facilitando a evolução do software.
  - **Testabilidade:** A separação de preocupações facilita a escrita de testes unitários e de integração para cada parte do sistema.
  - **Reusabilidade:** Componentes e lógicas de negócio bem definidos podem ser mais facilmente reutilizados em outras partes da aplicação ou em outros projetos.
