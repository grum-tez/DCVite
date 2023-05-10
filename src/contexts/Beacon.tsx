import { BeaconWallet } from '@taquito/beacon-wallet'
import constate from 'constate'
import React from 'react'

import { useAppName, useEndpoint, useNetwork } from './Settings'
import { useTezosToolkit } from './Taquito'

export const [
  BeaconProvider,
  useWalletAddress,
  useWalletName,
  useConnect,
  useDisconnect,
  useIsConnected,
] = constate(
  MakeBeacon,
  (v) => v.beaconState.user_address,
  (v) => v.beaconState.wallet,
  (v) => v.utils.connect,
  (v) => v.utils.disconnect,
  (v) => v.utils.isConnected
)

function MakeBeacon() {
  const network = useNetwork()
  const endpoint = useEndpoint()
  const name = useAppName()
  const ttk = useTezosToolkit()

  const [beaconState, setState] = React.useState(
    (): {
      beacon: undefined | BeaconWallet
      user_address: undefined | string
      wallet: undefined | string
    } => ({
      beacon: new BeaconWallet({ name: name, preferredNetwork: network }),
      user_address: undefined,
      wallet: undefined,
    })
  )

  React.useEffect(() => {
    // to be executed on mount
    ttk.setWalletProvider(beaconState.beacon)
    const on_mount = async () => {
      const account = await beaconState.beacon?.client.getActiveAccount()
      const address = account?.address
      const peers = await beaconState.beacon?.client?.getPeers()
      const wallet_name = peers !== undefined ? peers[0].name : undefined
      setState((s) => {
        return { ...s, user_address: address, wallet: wallet_name }
      })
    }
    on_mount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const connect = async () => {
    try {
      let beacon: BeaconWallet | undefined = undefined
      if (beaconState.beacon) {
        beacon = beaconState.beacon
        ttk.setWalletProvider(beacon)
        await beacon.requestPermissions({
          network: {
            type: network,
            rpcUrl: endpoint,
          },
        })
        const address = await beacon.getPKH()
        const peers = await beacon.client.getPeers()
        const wallet_name = peers[0].name
        setState((s) => {
          return { ...s, user_address: address, wallet: wallet_name }
        })
      } else {
        throw new Error('Beacon Not Initialized')
      }
    } catch (e) {
      console.log(e)
    }
  }

  const disconnect = async () => {
    beaconState.beacon?.client.disconnect()
    setState((s) => {
      return { ...s, user_address: undefined }
    })
  }

  const isConnected = () => {
    return beaconState.user_address !== undefined
  }

  return { beaconState, utils: { connect, disconnect, isConnected } }
}
