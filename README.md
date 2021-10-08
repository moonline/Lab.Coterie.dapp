# Coterie dApp

Create a democratic communities on the Éthereum blockchain.


## Development

### Environment

Install:

* [Node.js](https://nodejs.org/en/download/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install)
* [Truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation) (global)

### Install dependencies

```sh
yarn install
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
