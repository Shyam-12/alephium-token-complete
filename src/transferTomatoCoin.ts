import { web3, DUST_AMOUNT } from '@alephium/web3'
import { PrivateKeyWallet } from '@alephium/web3-wallet'
import dotenv from 'dotenv'

dotenv.config()

async function transferTomatoCoin() {
  // set the node provider
  // For Testnet - use testnet url
  // web3.setCurrentNodeProvider('https://node.testnet.alephium.org', undefined, fetch)

  // for devnet - use devnet url
  web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)

  // Private key of your wallet here
  const privateKey = process.env.TESTNET_PRIVATE_KEY! as string

  console.log('Private Key: ', privateKey)
  // We need to create a signer which will sign the transaction
  const sender = new PrivateKeyWallet({privateKey: privateKey})

  // Token Contract Id which we want to Transfer
  const tokenId = 'b59fb365ca95f664707c4d88305fba4996695f4a5710026e678a54ca25c6b301'

  // The address of the receiver
  const receiverAddress = '188KTtRGATFzQwaS5AzNtsFoMKoWhWjJFfhZnA8T438VN'

  // Transfer token from sender to receiver
  await sender.signAndSubmitTransferTx({
    signerAddress: sender.address,
    destinations: [
      { address: receiverAddress, attoAlphAmount: DUST_AMOUNT, tokens: [{ id: tokenId, amount: 100n }] }
    ]
  })

  // Get the token balance of the receiver
  const { tokenBalances } = await web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(receiverAddress)
  console.log(`token balance for receiver ${receiverAddress}`, tokenBalances)
}

// Call the above function
transferTomatoCoin()
