import { NetworkType } from '@airgap/beacon-sdk'
import constate from 'constate'
import { useState } from 'react'

const app_name = 'Archetemplate'

const sandboxSettings = {
  app_name: app_name,
  endpoint: 'http://localhost:20000',
  network: NetworkType.CUSTOM,
  contract: 'KT1EgXM17ghcfrmugYwfi67yfVn5SpmXxdbQ',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ghostnetSettings = {
  app_name: app_name,
  endpoint: 'https://ghostnet.tezos.marigold.dev',
  network: NetworkType.GHOSTNET,
  contract: 'KT1FE4Mj2XxYvu26B8GhgS6EXKqUPKbzZABi',
}

export const [
  SettingsProvider,
  useAppName,
  useEndpoint,
  useNetwork,
  useContractAddress,
] = constate(
  () => {
    const [settingsState] = useState(sandboxSettings)
    return settingsState
  },
  (v) => v.app_name,
  (v) => v.endpoint,
  (v) => v.network,
  (v) => v.contract
)
