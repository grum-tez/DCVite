import React from 'react';
import { useConnect, useDisconnect, useIsConnected, useWalletAddress } from './contexts/Beacon'
import { useChallengesContext } from './contexts/Challenges';

const ConnectWalletButton: React.FC = () => {
  const connect = useConnect();
  const disconnect = useDisconnect()
  const isConnected = useIsConnected()
  const walletAddress = useWalletAddress();

  const handleClick = async () => {
    try {
      if (!isConnected()) {
        await connect();
      } else {
        await disconnect();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {isConnected() ? (
        <button onClick={handleClick}>Disconnect Wallet</button>
      ) : (
        <button onClick={handleClick}>Connect Wallet</button>
      )}
      {isConnected() && <p>Address of connected wallet: {walletAddress}</p>}
    </div>
  );
};

export default ConnectWalletButton;
