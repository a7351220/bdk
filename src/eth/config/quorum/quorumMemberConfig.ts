import { NetworkConfigType, NetworkType } from '../network.type'

const quorumConfig: NetworkConfigType = {
  image: 'quorumengineering/quorum:23.4.0',
  networks: [NetworkType.QUORUM],
  entrypoint: (chainId, peerPort, bootnode, nodeEncode) => [
    '/bin/sh',
    '-c',
    `geth init --datadir /data /data/genesis.json; geth --datadir /data --networkid ${chainId} ${(bootnode) ? '--bootnodes '.concat(nodeEncode) : '--nodiscover'} --verbosity 3 --syncmode full --nousb  --http --http.addr 0.0.0.0 --http.port 8545 --http.corsdomain "*" --http.vhosts "*" --ws --ws.addr 0.0.0.0 --ws.port 8546 --ws.origins "*" --http.api admin,trace,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum,istanbul,qbft --ws.api admin,trace,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum,istanbul,qbft --port ${peerPort}`,
  ],
}

export default quorumConfig
