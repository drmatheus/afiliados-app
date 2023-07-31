# Bem-Vindo ao Afiliados!

Um normalizador de planilhas!

## Tecnologias Utilizadas 👨‍💻👨‍💻

Nesse projeto foi utilizado:

- [NodeJS](https://nodejs.org/en/)

- [TypeScript](https://www.typescriptlang.org/)

- [Next.js](https://nextjs.org/)

- [Tailwind CSS](https://tailwindcss.com/)

## Funcionalidades do Projeto

Conta não-logada:

- Criar uma conta
- Fazer login no website

Conta logada:

- Normalizar arquivos .txt (arquivo de teste: sales.txt)
- Salvar no banco de dados
- Visualizar dados cadastrados pelo usuario logado
- Deslogar

## Arquitetura do projeto

**Rotas** Cada página do projeto está localizada diretamente dentro do diretório do app, com o nome correspondente à rota acessível no website. Por exemplo, a página de login pode ser encontrada em app/login.tsx e corresponde à rota /login.

**/components:** Aqui encontram-se os componentes reutilizáveis da aplicação. Componentes como cabeçalhos, rodapés e outros elementos compartilhados são colocados nesta pasta para facilitar a manutenção e a reutilização do código.

**/interfaces:** Neste diretorio ficam as interfaces que se repetem durante o codigo. (Exceto as interfaces de props que ficam juntas dos componentes)

**/services:** Diretório para funções utilitárias e helpers. Essas funções podem ser usadas em diferentes partes do projeto.

## Rodar o projeto localmente

- Certifique-se de ter o Node.js instalado em seu sistema.

- Inicie seu terminal (git bash ou powershell)

- Instale as dependências com o comando abaixo:

```bash
npm install
```

- Digite esse comando pra rodar o server:

```bash
npm run dev
```

- Visualize o projeto no link => [http://localhost:3001](http://localhost:3001).

ATENÇÃO: Para o projeto rodar localmente é necessário que esse projeto está rodando junto com a back-end do projeto (https://github.com/drmatheus/afiliados-api) e que tenha sido iniciada DEPOIS da API ter sido iniciada;

## Rodando o Projeto em Docker

- Certifique-se de ter o Docker instalado em seu sistema e a API estar rodando.

- Construa a imagem Docker usando o comando:

```bash
    docker build -t affiliated-app .
```

- Execute o contêiner com o comando:

```bash
    docker run -p 3001:3000 affiliated-app
```

- Visualize o projeto no link => [http://localhost:3001](http://localhost:3001).

## MADE BY:

- [Matheus Dávila](https://github.com/drmatheus)
