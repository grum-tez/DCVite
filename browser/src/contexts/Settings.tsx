import { NetworkType } from '@airgap/beacon-sdk'
import constate from 'constate'
import { useState } from 'react'

export const [
  SettingsProvider,
  useAppName,
  useEndpoint,
  useNetwork,
  useContractAddress,
] = constate(
  () => {
    const [settingsState] = useState({
      app_name: 'My DApp',
      endpoint: 'https://ghostnet.tezos.marigold.dev',
      network: NetworkType.GHOSTNET,
      contract: 'KT1FE4Mj2XxYvu26B8GhgS6EXKqUPKbzZABi',
    })
    return settingsState
  },
  (v) => v.app_name,
  (v) => v.endpoint,
  (v) => v.network,
  (v) => v.contract
)