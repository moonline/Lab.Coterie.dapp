# Coterie dApp

Create a democratic communities on the Éthereum blockchain.


## Development

### Environment

Install:

* [Node.js](https://nodejs.org/en/download/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install)
* [Truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation) (global)
* Metamask plugin for your Browser

### Install dependencies

```sh
yarn install
(cd client; yarn install)
```

### Compile

```sh
truffle compile
```

### Migrate

```sh
# start ganache network
yarn network
# run migrations
truffle migrate
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

