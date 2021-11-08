const ethers = require('ethers');
const abi = require('./PRINTS_abi.json')

async function main() {

  const contractAddr = "0x4dd28568D05f09b02220b09C2cb307bFd837cb95";
  const provider = new ethers.providers.WebSocketProvider("wss://eth-mainnet.alchemyapi.io/v2/" + process.env.ALCHEMY_API_KEY);
  const contract = new ethers.Contract(contractAddr, abi, provider)

  let wallets = {};

  let eventFilter = contract.filters.Transfer()
  let events = await contract.queryFilter(eventFilter);

  // Replay all transfer events
  for (const evt of events) {
    for (const addr of [evt.args.from, evt.args.to]) {
      if (!(addr in wallets)) {
        wallets[addr] = ethers.BigNumber.from(0);
      }
    }

    wallets[evt.args.from] = wallets[evt.args.from].sub(evt.args.value);
    wallets[evt.args.to] = wallets[evt.args.to].add(evt.args.value);
  }

  const wei = ethers.BigNumber.from(10).pow(18);
  for (const addr in wallets) {
    console.log(`${addr}, ${wallets[addr].div(wei).toString()}`)
  }

}

main()
.then(() => process.exit(0))
