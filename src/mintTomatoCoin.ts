import { web3 } from '@alephium/web3'
import { PrivateKeyWallet } from '@alephium/web3-wallet'
import { TomatoCoin } from '../artifacts/ts'
import dotenv from 'dotenv'

dotenv.config()

async function mintPotatoCoin() {
  // set the node provider
  // For Testnet - use testnet url
  // web3.setCurrentNodeProvider('https://node.testnet.alephium.org', undefined, fetch)

  // for devnet - use devnet url
  web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)

  // Private key of your wallet here
  const privateKey = process.env.TESTNET_PRIVATE_KEY! as string

  console.log('Private Key: ', privateKey)
  // We need to create a signer which will sign the transaction
  const signer = new PrivateKeyWallet({ privateKey: privateKey })

  // The amount we want to issue to the receiver
  const issueTokenAmount = 1000n

  // The address of the receiver
  const issueTokenTo = '1GYpX8JmbKievLrM4osUWsRKzDyv7aA1Y5wErJT66aFQB'

  // Deploy and Get an instance of the PotatoCoin contract
  const potatoCoin = await TomatoCoin.deploy(signer, {
    initialFields: {},
    issueTokenAmount,
    issueTokenTo: issueTokenTo
  })

  // Get the token id from potatoCoin contract instance
  const tokenId = potatoCoin.contractInstance.contractId

  // console log them to check - The TokenId and ContractAddress
  console.log('TOken Id: ', tokenId)
  console.log('Contract Address: ', potatoCoin.contractInstance.address)

  // console log for token issuing to the receiver
  console.log(`token issued to ${signer.address}`)
}

mintPotatoCoin()
