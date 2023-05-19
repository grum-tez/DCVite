import React, { useState } from "react";
import constate from "constate";
// 1️⃣ Create a custom hook as usual
function useTrackChallenges() {


//TODO: Create 3 way string interface - "unknown", "correct", "incorrect" 

  const [walletConnects, setWalletConnects] = useState(false)

  const [contractExists, setContractExists] = useState(false)

  const [pokeCallable, setPokeCallable] = useState("unknown")

  return { 
    walletConnects,
    setWalletConnects, 
    contractExists, 
    setContractExists,
    pokeCallable,
    setPokeCallable
  };
}

// 2️⃣ Wrap your hook with the constate factory
export const [ChallengesProvider, useChallengesContext] = constate(useTrackChallenges);