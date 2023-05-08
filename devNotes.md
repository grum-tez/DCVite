A few notes about this file that may be useful for future debugging:

The reason I have used vite is in order to have as neutral and unopionated dev experience as possible for the purpose of tutorials. With in this setup, it should be possible to focus on the tezos aspects of building a dapp, and remain indifferent to the peculiarities of next.js or similair

I had a lot of trouble with polyfill issues while trying to get this to work. I wrote the 'vite.config.ts' file largely with help from bing chatbot and don't understand some parts of it. However, it seems to do the job of the corresponding config-overrides.js file from the create react app version, and there are no polyfill errors when running the most basic dapp template calling a contract and initiating beacon wallet.

There is also a few lines in src/main.tsx related to Buffer that are required for the beacon wallet to work.

There was a dependency clash between the most recent version of the taquito package, specifically an RPC dependency, and the @completium/dapp-ts package. dapp-ts most likely needs to be updated, but to temporarily correct this I have pinned the taquito version to the same as dapp-ts, which is v16.0.0.

I have set up yarn workspaces. This seems to be required because of the 'blockchain' subfolder that includes the archetype contracts. This folder was built with the completium create project command. 
