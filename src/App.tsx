import React, {useState} from 'react';
import './App.css';
import ConnectWalletButton from './ConnectButton';
import { useContract } from './contexts/Contract';
import PokeButton from './PokeButton';
import TestBar from './components/TestBar';
import Box from '@mui/material/Box';
import { useChallengesContext } from './contexts/Challenges';

function App() {
  
const { setPokeCallable } = useChallengesContext()

  const pokeContract = useContract();

  
  const callPoke = async (): Promise<void> => {
    try {
      await pokeContract.poke({});
      console.log('poke succeeded');
      //TODO: Ideally setPokeCallable would be triggered by watching the chain for a successful call, rather than the user having to input this themselves.
      setPokeCallable("correct")
    } catch {
      console.log('poke failed');
      setPokeCallable("incorrect")
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        
        <TestBar />
          <Box>
            <PokeButton onClick={callPoke} isLoading={false} />
            <ConnectWalletButton />
          </Box>
      </Box>

    </>
  );
}

export default App;


