# Iniciando o Setup - Node TypeScript Eslint Prettier Husky Lint-Staged Jest

1 - Comece um repositório digitando no terminal: `git init` <br>
2 - Agora, inicie o projeto com: `npm init -y` <br> 
3 - Crie o arquivo .gitignore e escreva nele: <br>
`
node_modules/ `<br>`
coverage/ `<br>`
dist/
`

## Estrutura de commits

`fix`: um commit do tipo fix soluciona um problema na sua base de código (isso se correlaciona com PATCH do versionamento semântico). <br>
`feat`: um commit do tipo feat inclui um novo recurso na sua base de código (isso se correlaciona com MINOR do versionamento semântico). <br>
`BREAKING CHANGE`: um commit que contém no rodapé opcional o texto BREAKING CHANGE:, ou contém o símbolo ! depois do tipo/escopo, introduz uma modificação que quebra a compatibilidade da API (isso se correlaciona com MAJOR do versionamento semântico). Uma BREAKING CHANGE pode fazer parte de commits de qualquer tipo. <br>
`chore`

Para saber quando utilizá-los, visite: https://www.conventionalcommits.org/pt-br/v1.0.0/

## Iniciando a configuração - TypeScript

### Observações

Para começar, é preciso lembrar que o node por convenção não consegue executar o typescript, para isso, devemos baixar algumas libs que vão permitir esse acesso. Vale ressaltar que para a configuração das libs (excessão aquelas que foram feitas para o typescript Ex.: ts-node), a instalação ocorre com o prefixo @types/. <br>

Crie uma pasta chamada src e coloque os arquivos e subpastas do projeto dentro dela. Por exemplo, o arquivo inicial index.ts

### Primieras libs

No terminal execute: `yarn add -D typescript ts-node @types/node` <br>

Nodemon - `yarn add -D nodemon` <br>

### Configurando o arquivo tsconfig.json 

Para iniciar esse arquivo, digite no terminal o comando: `tsc --init` <br>

Após ter sido criado, configure-o com as seguintes opções: <br>

`{ `<br>`
  "compilerOptions": { `<br>`
    "target": "es2016" /* Set the JavaScript language version for emitted JavaScript and include compatible library <br> declarations. */, `<br>`
    "module": "commonjs" /* Specify what module code is generated. */, `<br>`
    "rootDir": "./src", `<br>`
    "outDir": "./dist", `<br>`
    "moduleResolution": "Node" /* Specify how TypeScript looks up a file from a given module specifier. */, `<br>`
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */, `<br>`
    "strict": true /* Enable all strict type-checking options. */, `<br>`
    "skipLibCheck": true /* Skip type checking all .d.ts files. */, `<br>`
    "baseUrl": "./src", `<br>`
    "paths": { `<br>`
      "@/*": ["*"] `<br>`
    } `<br>`
  } `<br>`
}`

### Adicionando o script do nodemon

Para utilizar o nodemon para ler os arquivos typescript com o ts-node digite na parte "scripts" do arquivo package.json: <br> 

`"dev": "nodemon --watch \"src\" --exec \"ts-node src/index.ts\" -e ts"`

## Prettier e Eslint

Para começar, primeiro instale no VSCode as extensões Eslint e Prettier e depois configure o prettier nas configurações da seguinte maneira: <br>

1 - Vá para as configurações e pesquise por: format on save. Habilite esta função <br>
2 - Pesquise por code formatter e escolha o prettier como formatador padrão <br>

Obs.: Esses passos foram apenas caso não tenham sido feitos, a configuração das bibliotecas prettier e eslint ainda serão feitas na próxima etapa:

### Instalando as bibliotecas

No terminal, digite: `yarn add -D eslint prettier eslint-config-prettier`

### Inicializando o Eslint

Para poder configurar o Eslint, digite o comando: `npx eslint --init` e responda as opções corretamente <br>

Obs.: Quando aparecer para marcar as opções "Browser" ou "Node" pressione a tecla de Espaço do teclado para marcar ou desmarcar a opção e após isso, dê enter

### Configurando o arquivo .eslintrc.json

Vá para o arquivo .eslintrc.json e faça as seguintes etapas: <br>

1 - No "env" adicione abaixo de "node" a opção: `"jest": true`, pois nesse projeto ainda será configurado o Jest <br>
2 - No "parserOptions" adicione: "project": ["./tsconfig.json"] <br>
3 - Dê um reload no VSCode para que o eslint funcione corretamente. Pressione CTRL + SHIT + P e digite: reload, depois, aperte enter.

### Configurando o arquivo .prettierrc.json

Crie um arquivo com o nome .prettierrc.json e configure-o da seguinte maneira: <br>

`{ `<br>`
    "semi": false, <!-- Serve para tirar o ";" --> `<br>`
    "singleQuote": false, <!-- Serve para impedir que o código tenha aspas simples  --> `<br>`
    "tabWidth": 4 <!-- Se refere à quantidade de reuco da linha --> `<br>`
}`

## Husky e Lint-Staged

### Instalando as bibliotecas

Digite no terminal: `yarn add -D husky lint-staged`

### Configurando o Husky

1 - Vá para o arquivo package.json e na parte de scripts, adicione o comando: `"husky:prepare": "husky install"` <br>
2 - Digite no terminal: yarn husky:prepare - Isso criará a pasta .husky <br>
3 - Cole no terminal o seguinte comando: `npx husky add .husky/pre-commit "yarn lint-staged"`

### Configurando o Lint-Staged

Crie um arquivo chamado .lintstagedrc.json e adicione as seguintes configurações: <br>

`{
  "*.ts": ["yarn eslint 'src/**' --fix", "yarn prettier --write 'src/**/*.ts'"]
}`

## Jest

Digite no terminal: `yarn add -D jest ts-jest @types/jest`

### Configurando o Jest

1 - Crie um arquivo chamado jest.config.js e adicione os seguintes comandos: <br>

`module.exports = { `<br>`
  roots: ["<rootDir>/src"], `<br>`
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"], `<br>`
  coverageDirectory: "coverage", `<br>`
  testEnvironment: "node", `<br>`
  transform: { `<br>`
    ".+\\.ts$": "ts-jest", `<br>`
  }, `<br>`
  moduleNameMapper: { `<br>`
    "@/(.*)": "<rootDir>/src/$1", `<br>`
  }, `<br>`
}` <br>

2 - Vá para o arquivo package.json e adicione os seguintes comandos:  <br>

`
  "test": "jest --passWithNoTests", `<br>`
  "test:watch": "yarn test --watch", `<br>`
  "test:staged": "yarn test --findRelatedTests"
`
<br> <br>
3 - Vá para o arquivo .lintstagedrc.json e adicione o seguinte comando: "yarn test:staged" <br>
4 - Para executar os testes, digite no terminal: `yarn test:watch` <br>

### Adicionando testes no Husky

1 - Adicione no package.json o seguinte comando: `"test:push": "yarn test --coverage"` <br>
2 - Digite no terminal o comando: `npx husky add .husky/pre-push "yarn test:push"` <br>
3 - Crie um repositório no Github e suba a Branch. Isso adicionará a pasta coverage no projeto.

### Adicionando o campo de build

Vá para o arquivo package.json e adicione os campos: `"build": "tsc",`

### Configurando os caminhos com @

1 - Intale a biblioteca tsconfig-paths com o seguinte comando: `yarn add -D tsconfig-paths` <br>
2 - Vá para o package.json e mude a linha de comando do "dev" para: `"dev": "nodemon --watch \"src\" --exec \"ts-node -r tsconfig-paths/register src/index.ts\" -e ts"` 

### Configurando os caminhos com @ - Build

1 - Instale a biblioteca com o seguinte comando: `yarn add -D tsc-alias` <br>
2 - No script de "build" em package.json, mude-o para o seguinte comando: `"build": "tsc && tsc-alias"`

## Configurando as mensagens de commit com prefixos

1 - Instale a seguinte biblioteca: `yarn add -D git-commit-msg-linter` <br>
2 - Digite no terminal o seguinte comando: `npx husky add .husky/commit-msg ".git/hooks/commit-msg \$1"`
