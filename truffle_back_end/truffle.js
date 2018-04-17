var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = "oblige side ritual warfare symbol focus tomato exercise frost best curious movie";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },

    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/cB2USDTPPAJ523I9LSxP")
      },
      gas: 6721975,
      network_id: 3
    }   
  } 

};


