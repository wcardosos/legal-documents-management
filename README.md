# Gerenciador de Documentos Jurídicos

Este projeto implementa uma API RESTful para gerenciamento eficiente de documentos jurídicos, utilizando Node.js e Express.js.

## Desenvolvimento

### Estrutura de Código

O código foi desenvolvido em Javascript e seguindo o padrão esperado pela empresa.

O Docker foi utilizado para auxiliar no uso do MongoDB no ambiente de desenvolvimento.

Middlewares e handlers foram implementados para diversos aspectos da aplicação, entre eles:

- Autorização;
- Manipulação de erros.

### Banco de Dados

O MongoDB foi utilizado para armazenar dados de documentos e usuários, utilizando o **Mongoose** como ODM para facilitar a manipulação desses dados.

### Funcionalidades Essenciais Implementadas

- **Categorias Jurídicas:**
  - A categoria de um documento é definida manualmente pelo usuário da API, sendo enviado no corpo da criação de um documento;
  - Foi criado um seed para o banco com a criação das categorias visando facilitar a vida de quem for utilizar.
- **Busca e Recuperação:** Busca de documentos e histórico de um documento;
- **Edição e Atualização:** Permissões para editar metadados e versões dos documentos, além de histórico de alterações;
- **Exclusão Segura**;
- **Autenticação e Controle de Acesso:** Sistema robusto para garantir segurança dos dados.

### Classificação e Categorização

- Os usuários podem definir manualmente categorias durante a criação de documentos.

## Como rodar a aplicação

Para rodar a aplicação no seu ambiente local é necessário ter instalado na sua máquina o Docker com Docker Compose e o Node.js ao menos na versão 18.

### Banco de dados

O primeiro passo é disponibilizar o banco de dados MongoDB para poder ser acessado pela aplicação. Para subir o container Docker em que o banco MongoDB está definido:

```bash
docker compose up
```

Com o container disponível, certifique-se de haver um arquivo `.env` na raiz do projeto com a estrutura presente em `.env.sample`. Esses dados são necessários tanto para o banco de dados quanto para a aplicação posteriormente. É indicado que utilize os dados presente no arquivo de amostra podem ser utilizados como o `.env`.

### Aplicação

Com o banco certinho, você poderá rodar o servidor com o comando abaixo:

```bash
npm run start:dev
```
