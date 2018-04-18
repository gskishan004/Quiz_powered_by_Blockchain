var HDWalletProvider = require("truffle-hdwallet-provider");
var infura_apikey = "cB2USDTPPAJ523I9LSxP";

var mnemonic = "increase amount image december opera drive neglect grain recipe husband number high";

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
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey),
      network_id: 3
    }
     
  } 

};


