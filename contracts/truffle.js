const dotenv = require("dotenv")
const HDWalletProvider = require("truffle-hdwallet-provider");

dotenv.config()
const PORT = process.env.GANACHE_PORT || 8545

// How many addresses in wallet should we unlock?
// (For deploying test data, we use other addresses as buyers and sellers)
const numAddressesToUnlock = 4

// Local setup
truffleSetup = {
  migrations_directory: "./migrations",
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions : {
      currency: 'USD',
      onlyCalledMethods: true
    }
  },
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
  },
  solc: { optimizer: { enabled: true, runs: 200 } }
}

// For global test networks and mainnet, set your wallet mnemonic in env
// variable. Assumes we're using first address for that mnemonic.
// In future we might consider prompting for mnemonics:
// https://www.npmjs.com/package/prompt
//

// Please setup gas limit to resolve bug "exceed gas limit" when deploy
// TODO: gasLimit = Gtransaction + Gtxdatanonzero × dataByteLength
// gasLimit = 21000 + 68 * Gtxdatanonzero:10 = 21000 + 680 = 21680
const gas = process.env.GAS_LIMIT || 4612388 // milion
const gasPrice = process.env.GAS_PRICE || 30000000000 //milion

if (process.env.MAINNET_MNEMONIC) {
  truffleSetup.networks.mainnet = {
    provider: function() {
      return new HDWalletProvider(
        process.env.MAINNET_MNEMONIC,
        `https://mainnet.infura.io/${process.env.INFURA_ACCESS_TOKEN}`,
        0, numAddressesToUnlock)
    },
    network_id: 1,
    gas,
    gasPrice,
  }
}
if (process.env.RINKEBY_MNEMONIC) {
  truffleSetup.networks.rinkeby = {
    provider: function() {
      return new HDWalletProvider(
        process.env.RINKEBY_MNEMONIC,
        `https://rinkeby.infura.io/${process.env.INFURA_ACCESS_TOKEN}`,
        0, numAddressesToUnlock)
    },
    network_id: 4,
    gas,
    gasPrice,
  }
}
if (process.env.ROPSTEN_MNEMONIC) {
  truffleSetup.networks.ropsten = {
    provider: function() {
      return new HDWalletProvider(
        process.env.ROPSTEN_MNEMONIC,
        `https://ropsten.infura.io/${process.env.INFURA_ACCESS_TOKEN}`,
        0, numAddressesToUnlock)
    },
    network_id: 3,
    gas: 3712388,
    gasPrice,
  }
}

module.exports = truffleSetup
