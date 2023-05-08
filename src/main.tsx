import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SettingsProvider } from './contexts/Settings'
import { TaquitoProvider } from './contexts/Taquito'
import { BeaconProvider } from './contexts/Beacon'
import { ContractProvider } from './contexts/Contract'
//Buffer lines below prevent polyfill issues. See https://github.com/vitejs/vite/discussions/2785:
import { Buffer } from 'buffer'
globalThis.Buffer = Buffer

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
  </React.StrictMode>
)
