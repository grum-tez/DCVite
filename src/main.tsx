import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SettingsProvider } from './contexts/Settings'
import { TaquitoProvider } from './contexts/Taquito'
import { BeaconProvider } from './contexts/Beacon'
import { ContractProvider } from './contexts/Contract'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
          <SettingsProvider>
        <TaquitoProvider>
          <BeaconProvider>
            <ContractProvider>
        <App />
    </ContractProvider>
          </BeaconProvider>
        </TaquitoProvider>
      </SettingsProvider>
  </React.StrictMode>,
)
