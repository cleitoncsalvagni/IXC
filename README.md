![Logo](https://img.swapcard.com/?u=https%3A%2F%2Fcdn-api.swapcard.com%2Fpublic%2Fimages%2Fac950484c6134bf79537732c9f408649.png&q=0.8&m=fit&w=400&h=200)

# Challenge IXC

## O projeto

O sistema consiste em uma plataforma de conversação (chat) em tempo real. Para fazer isso acontecer, utilizei as tecnologias:

- **Front-end**

  - NextJS
  - TailwindCSS

- **Back-end**

  - NodeJS
  - Express
  - Socket.io

- **Armazenamento**
  - MongoDB

Ambos os projetos feitos utilizando **TypeScript**.

<details>
<summary><b>🧭 Explorar funcionalidades</b></summary>

- Autenticação

  - Login e cadastro de usuários

- Chat (realtime)
  - Envio de mensagens
  - Verificação de status (online/offline) dos usuários
  - Lista de contatos (usuários cadastrados na plataforma)

</details>

## Como iniciar o projeto

<details>
<summary><b>✨ Front-end</b></summary>

Vá até o projeto

```bash
cd client
```

Instale as dependências

```bash
npm install
```

Inicie o projeto

```bash
npm run dev
```

</details>

<details>
<summary><b>🧠 Back-end</b></summary>

Vá até o projeto

```bash
cd server
```

Instale as dependências

```bash
npm install
```

Inicie o projeto

```bash
npm run dev
```

</details>
</details>

### Endereços & Portas:

- Front-end: https://127.0.0.1:3000
- Back-end: 8889 ou 3003
- Socket.io: 5173

## Processo de desenvolvimento

Concluir este desafio em apenas três dias revelou-se uma tarefa mais complexa do que eu inicialmente imaginava, principalmente devido à minha limitada familiaridade com certas tecnologias, como o _MongoDB_ e o _Socket.io_. Admito que compreender o funcionamento dessas ferramentas consumiu considerável parte do meu tempo. Optei por iniciar o desenvolvimento do frontend, uma vez que estou mais habituado a essa parte do projeto, possibilitando-me identificar as funcionalidades que poderiam ser implementadas no servidor.

## Desafios

Surpreendentemente, os maiores desafios surgiram quando eu acreditava que o sistema estava praticamente finalizado. Devido a restrições de tempo, algumas questões foram deixadas em segundo plano. Durante os testes, identifiquei diversas funcionalidades ausentes no sistema, e detalharei mais sobre essas lacunas na seção de **Ajustes e melhorias**.

## Aprendizados

Esse desafio trouxe uma bagagem incrível! A exploração de novas tecnologias para armazenamento e comunicação ampliou significativamente minhas possibilidades. Apesar de alguns contratempos, a jornada foi bastante divertida e gratificante. Agradeço sinceramente pela oportunidade proporcionada.

## Ajustes e melhorias

Ao fim desta experiência, consegui idenficar diversas oportunidades de melhorias, além dos ajustes que devem ser realizados, confesso que focar no macro que seria a troca de mensagens em tempo real tirou meu foco em algumas outras funcionalidades.

- **Chat**

  - [ ] Criar _notificações_ ao receber nova mensagem. \* **Já feito a comunicação com o socket no back-end**

- **Contatos**
  - [ ] Ao clicar em um _Contato_ e enviar uma mensagem para o mesmo, deve ser criado o chat para o destinatário.
- **Perfil**
  - [ ] Permitir o envio/troca de imagem do usuário
