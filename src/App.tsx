import { useState } from 'react'
import { useTezosToolkit } from './contexts/Taquito'
import { useContractAddress } from './contexts/Settings'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const ttk = useTezosToolkit()
  const contractAddress = useContractAddress()
  const [actualContract, setActualContract] = React.useState(undefined)
  const [isActualContract, setIsActualContract] = React.useState(true)
  const [isAddEntrypoint, setIsAddEntrypoint] = React.useState(true)
  const [loadingContract, setLoadingContract] = React.useState(true)

  React.useEffect(() => {
    console.log('mounting')
    let ignore = false

    async function startFetching() {
      try {
        const ctr = await (ttk as any).wallet.at(contractAddress)
        if (!ignore) {
          setActualContract(ctr)
          setIsActualContract(true)
          setIsAddEntrypoint(!!(ctr as any)?.entrypoints?.entrypoints?.add_poll)
        }
      } catch (e) {
        setIsActualContract(false)
        setIsAddEntrypoint(false)
        console.log(e)
      }
      setLoadingContract(false)
    }

    startFetching()
    return () => {
      console.log('unmounting')
      ignore = true
    }
  }, [])

  console.log('Contract found: ', isActualContract)
  console.log('Contract Object: ', actualContract)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and saveassdgsdfgddfsafd to tafsfsdfest
          HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
