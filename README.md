# PayFlow - MVP SaaS Boilerplate 🚀

Bem-vindo ao repositório do **PayFlow**, um sistema completo de Gestão de Cobranças Recorrentes (SaaS). 
Este MVP foi construído com as melhores práticas de Arquitetura Limpa (Clean Architecture), focado em código limpo, escalabilidade, segurança e tipagem estática rigorosa.

## 💻 Tecnologias Utilizadas

### Backend ⚙️
- **Node.js**: Plataforma base.
- **Express**: Framework web focado na arquitetura Layered (Routes, Controllers, Services).
- **TypeScript**: Tipagem estática prevenindo erros em tempo de compilação.
- **Prisma (ORM)**: Modelagem e abstração do PostgreSQL.
- **PostgreSQL**: Banco de dados relacional (via Docker).
- **Zod**: Validação de schemas e requests para garantir a integridade dos dados na entrada.
- **JWT (JSON Web Token)**: Autenticação stateless das rotas de API.

### Frontend 🖥️
- **React.js**: Biblioteca base.
- **Vite.js**: Bundler de altíssima performance para desenvolvimento e build.
- **Tailwind CSS v3**: Estilização baseada em utilitários focada em design moderno.
- **Recharts**: Geração de gráficos complexos (ex: MRR, Churn) de forma reativa.
- **Axios**: Gerenciamento das chamadas da API (com interceptors para injeção automática de token JWT).
- **Lucide React**: Ícones rápidos, leves e esteticamente agradáveis.

## 🏗️ Padrões de Arquitetura e Engenharia
1. **Modularização por Funcionalidades**: O backend separa domínios (\`auth\`, \`customer\`, \`subscription\`, \`dashboard\`) mantendo a coesão.
2. **Global Error Handling**: Tratamentos que previdem que exceções fechem o programa. Validações \`Zod\` e erros de negócio (\`AppError\`) são padronizados numa resposta unificada na raiz do Express.
3. **Simulador de Integrações**: \`PaymentGatewayService\` implementa a interface e ciclo de vida normal com webhook como se estivesse conectado ao **Stripe** ou **Asaas**.

## 🚀 Como Rodar o Projeto

### 1. Iniciar Banco de Dados
Tenha o Docker instalado e inicie a máquina do PostgreSQL pela raiz do projeto:
\`\`\`bash
docker-compose up -d
\`\`\`

### 2. Rodar o Backend API
Abra um terminal, acesse a pasta do backend, instale e rode o servidor:
\`\`\`bash
cd backend
npm install
npx prisma db push
npm run dev
\`\`\`
*(O servidor subirá em http://localhost:3333)*

### 3. Rodar o Frontend APP
Abra um novo terminal na pasta do frontend:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
*(O app rodará em http://localhost:5173)*

---

*Desenvolvido para demonstração de proficiência sênior em Full Stack, englobando tudo: do Banco de Dados Relacional à Interface de Usuário Dinâmica.*
