<!-- PROJECT SHIELDS -->

<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->

<br />

<h1 align="center">Painel NodeMCU</h1>
  <p align="center">
    Painel web para placa NodeMCU e micro ESP para controle de sensores e atuadores. 
  </p>
<!-- TABLE OF CONTENTS -->

<details open="open">
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#about-the-project">Sobre</a>
      <ul>
        <li><a href="#built-with">Feito com</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Instruções</a>
      <ul>
        <li><a href="#prerequisites">Pré requisitos</a></li>
        <li><a href="#installation">Instalação</a></li>
        <li><a href="#understanding">Entendendo o código</a></li>
      </ul>
    </li>
    <li><a href="#usage">Uso</a></li>
    <li><a href="#license">Licença</a></li>
    <li><a href="#contact">Contato</a></li>
    <li><a href="#acknowledgements">Créditos</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

<a id="about-the-project"></a>

## Sobre

O Painel NodeMCU é um sistema de gerenciamento de sensores e controladores para as placas NodeMCU e para a familia de microcontroladores ESP. O sistema até o momento possui:

- Sistema de gerenciamento e interface web para monitoramento de dados de sensores;

- Sistema de API;

- Banco de dados SQLite com auxilio do framework Sequelize, podendo utilizar MySQL.

A tela inicial do front-end do sistema faz uma listagem de todos os sensores cadastrados no banco de dados com a possibilidade de adicionar, deletar e visualizar o sensor.

![Tela Inicial - Dashboard][front-screenshot]

A tela "Visualizar" mostra informações a respeito do sensor escolhido, contendo uma tabela com os últimos registros de coletas bem como o ultimo valor coletado do sensor. 
![Tela Sensor - Dashboard][sensor-screenshot]


<!-- BUILT WITH -->

<a id="built-with">

### Feito com

* [Node.Js](https://nodejs.org/en/)
* [Semantic UI](https://semantic-ui.com/)
* [Sequelize](https://sequelize.org/master/)

<!-- GETTING STARTED -->

<a id="getting-started"></a>

## Instalação

Comece a instalação verificando e instalando os softwares que são pré-requisitos deste projeto. Após isso, clone o repositório em sua máquina e, depois, efetue todas as configurações necessárias seguindo o tópico "Configurando o projeto".

<!-- PREREQUISITES -->

<a id="prerequisites"></a>

### Pré requisitos

O projeto necessita dos seguintes softwares:

* Node.js;
* NPM;
* Banco de dado MySQL.

<!-- INSTALLATION -->

<a id="installation"></a>

### Configurando o projeto

O primeiro passo é clonar este repositório em seu computador. Comece rodando o comando:

```sh
git clone https://github.com/lucsoliveira/Painel-NodeMCU-e-Node.JS
```

Após clonar este repositório em seu *workspace*, é necessário instalar as dependências do sistema. Basta rodar o seguinte comando dentro da pasta :

```sh
cd servidor
npm install
```

Com todas as dependências instaladas, evocê preferir utilizar o banco de dados MySQL, faça a alteração do banco de dados MySQL: basta editar o arquivo "app.js" e preencher com seu host, banco, usuário e senha. 

Como se trata da primeira vez que se roda o sistema, é necessário criar as tabelas no banco de dados. Após o preenchimento anterior, altere a variável "primeiraUtilizacao" da linha 3 do arquivo "models.js" para o valor "true". Assim será criado as tabelas necessárias no banco. As próximas utilizações podem ser executadas com esta variável com valor "false".

### Entendendo o código

O sistema foi desenvolvido tendo como base o padrão MVC. Os models do sistema estão no arquivo "models". Ja as "views", os templates, estão dentro da pasta "public". E, por fim, o "controller" se trata do arquivo "app.js", responsável pelo controle da aplicação web.

As views foram desenvolvidas utilizando de HTML, Vue.JS, JavaScript, EJS e CSS. Os componentes Vue.JS criados para a aplicação podem ser acessados dentro da pasta "public/vue".

As rotas do sistema (aplicação web e API) estão dentro da pasta "routes" do servidor.

O código-fonte do microcontrolador e as bibliotecas utilizadas para compilação no software Arduino IDE estão dentro da pasta "microcontrolador".

<!-- USAGE -->

<a id="usage"></a>

## Executando o projeto

Após realizar o passo-a-passo do tópico anterior, é necessário executar dois processos. Um se trata da execução do servidor Node.JS, rodando a aplicação "app.js". Comece executando a aplicação web com o comando:

```sh
node app.js
```

Depois de rodar a aplicação Node.JS, é necessário compilar o código fonte exemplo no microcontrolador NodeMCU ou ESP8266. Antes de compilar, porém, altere a String "host_servidor" do arquivo "micro.ino" com o IP ou URL de seu servidor. Por exemplo:

```sh
String host_servidor = "http://192.168.0.136:3000";
```

Pronto, agora é só selecionar a placa como "NodeMCU" ou alguma outra da familia ESP no software Arduino IDE e compilar o código .ino.

Agora é só conferir o funcionamento do código do microcontrolador e acrescentar os seus sensores no sistema :)

## Próximas implementações

- Sistema de gerenciamento de atuadores (relés, acionadores, atuadores, etc.);

- Sistema de controle inteligente entre atuadores e sensores;

- Aplicativo móvel.

<!-- LICENSE -->

<a id="license"></a>

## Licença

Distribuído sob a MIT License.

<!-- CONTACT -->

<a id="contact"></a>

## Contato

Lucas de Oliveira | [LinkedIn](https://www.linkedin.com/in/engenheiro-lucas-oliveira/) 

<!-- ACKNOWLEDGEMENTS -->

<a id="acknowledgements"></a>

## Créditos

* [Node.Js](https://nodejs.org/en/)
* [Semantic UI](https://semantic-ui.com/)
* [Sequelize](https://sequelize.org/master/)

<!-- MARKDOWN LINKS & IMAGES -->

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-url]: https://github.com/lucsoliveira/NotificaB3

[front-screenshot]: ./docs/front.GIF
[sensor-screenshot]: ./docs/sensor.GIF
