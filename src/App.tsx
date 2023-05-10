import { useTezosToolkit } from './contexts/Taquito'
import { useContractAddress } from './contexts/Settings'
import React from 'react'
import './App.css'
import ConnectWalletButton from './ConnectButton'
import { useContract } from './contexts/Contract'
import PokeButton from './PokeButton'

function App() {
  const ttk = useTezosToolkit()
  const contractAddress = useContractAddress()
  const [actualContract, setActualContract] = React.useState(undefined)
  const [isActualContract, setIsActualContract] = React.useState(true)
  const [loadingContract, setLoadingContract] = React.useState(true)
  const pokeContract = useContract()

  React.useEffect(() => {
    console.log('mounting')
    let ignore = false

    async function startFetching() {
      try {
        const ctr = await (ttk as any).wallet.at(contractAddress)
        if (!ignore) {
          setActualContract(ctr)
          setIsActualContract(true)
        }
      } catch (e) {
        setIsActualContract(false)
        console.log(e)
      }
      setLoadingContract(false)
    }

    startFetching()
    return () => {
      console.log('unmounting')
      ignore = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('Contract found: ', isActualContract)
  console.log('Contract Object: ', actualContract)

  const callPoke = async () : Promise<void> => {
    try {
      await pokeContract.poke({})
      console.log("poke succeeded")
    }
    catch { console.log("poke failed")}
  }

  return (
    <>
    {loadingContract ? (<p>loading contract...</p>) : (<PokeButton onClick={callPoke} isLoading={loadingContract} />) }
    
      <ConnectWalletButton/>
    </>
  )
}

export default App
