# Coterie dApp

<div style="display: flex; flex-direction: row; align-items: center; padding: 20px 0;">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/512px-Ethereum-icon-purple.svg.png" height="50px" /> Ethereum
<img src="https://trufflesuite.com/img/truffle-logo-light.svg" height="50px" /> Truffle
<img src="https://trufflesuite.com/img/ganache-logo-dark.svg" height="50px" style="margin: 0 10px;" /> Ganache
<img src="https://docs.soliditylang.org/en/v0.8.11/_static/logo.svg" height="50px" /> Solidity
<img src="./documentation/icon-web3.png" height="50px" /> Web3.js
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png" height="50px" /> React
<img src="https://v5.getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo-shadow.png" height="50px" /> Bootstrap
</div>
  

Create democratic communities on the Ethereum blockchain.


<img src="./documentation/create-coterie-screen.png" width="400px" />
<img src="./documentation/my-candidature-screen.png" width="400px" />
<img src="./documentation/candidatures-screen.png" width="400px" />
<img src="./documentation/members-screen.png" width="400px" />

## Features

* Smart Contract based Coterie and candidature creation
* Candidature voting
* Coterie, candidatures and members listing


## Usage

<img src="./documentation/welcome-screen.png" width="500px" />

### Create a new Coterie

<img src="./documentation/create-coterie-screen.png" width="500px" />

### Create a candidature 

<img src="./documentation/create-candidature-screen.png" width="500px" />

### Wait for votes

<img src="./documentation/not-yet-voted-candidature-screen.png" width="500px" />

### Check my candidature

<img src="./documentation/my-candidature-screen.png" width="500px" />

### Check and vote candidatures

<img src="./documentation/candidatures-screen.png" width="500px" />

### List members

<img src="./documentation/members-screen.png" width="500px" />

### Vote candidate

<img src="./documentation/vote-candidates-screen.png" width="500px" />


## Development

### Environment

Install:

* [Node.js](https://nodejs.org/en/download/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install)
* Metamask plugin for your Browser (Optional):
    * [Firefox plugin](https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/)
    * [Chrome plugin](https://chrome.google.com/webstore/detail/metamask/)

### Recomended plugins to develop with Visual Studio Code

* [Ethereum Solidity Language for Visual Studio Code
](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)

### Install dependencies

```sh
yarn install
(cd client; yarn install)
```

### Compile

```sh
yarn compile
```

### Migrate

```sh
# start ganache network
yarn network
# run migrations
yarn migrate
```

### Test

```sh
# start ganache network
yarn network
```
```sh
# run all tests
yarn test
# run only a specific file
yarn test test/Coterie.test.js
# run only tests matching regex
yarn test -g "should have a candidature"
```

### Run frontend

1. prepare ganache network:

```sh
yarn network
yarn compile
yarn migrate
```

2. Run frontend:

```sh
cd client
yarn start
```

3. Connect Metamask using the secret recovery phrase from the console output of Ganache to import accounts.

