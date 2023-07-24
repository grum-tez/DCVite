import fs from 'fs'
import { TezosToolkit } from '@taquito/taquito'
import { InMemorySigner } from '@taquito/signer'
const GHOSTNET = 'https://ghostnet.ecadinfra.com'

const Tezos = new TezosToolkit(GHOSTNET)
Tezos.setProvider({
  signer: new InMemorySigner(
    'edskRi7c9YoEqy9s1W2wg3uSdo1CJKhkzzisjKWhrgKjz7TaaStmLJcpbihcXjuos9DkqqYSdW718r1rmBj3Ux3rxRoTS9HDvJ'
  ),
})

// Load the contents of the file into a variable
const michelineMap = JSON.parse(fs.readFileSync('shortmap.json', 'utf-8'))

const op = await Tezos.contract.registerGlobalConstant(michelineMap)

await op.confirmation()

const hash = op.globalConstantHash

console.log(hash)
