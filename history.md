vscode ➜ /workspaces/DCVite (archetemplate) $ completium-cli version
0.4.87
vscode ➜ /workspaces/DCVite (archetemplate) $ completium-cli start sandbox
Waiting for sandbox to start ...
sandbox is running
vscode ➜ /workspaces/DCVite (archetemplate) $ completium-cli switch endpoint
Current network: ghost
Current endpoint: https://ghostnet.ecadinfra.com
✔ Switch endpoint · sandbox http://localhost:20000
endpoint updated
vscode ➜ /workspaces/DCVite (archetemplate) $ completium-cli deploy ./blockchain/contracts/poke_contract.arl
Http error response: (403)
vscode ➜ /workspaces/DCVite (archetemplate) $ docker run --rm --name my-sandbox --detach -p 20000:20000 --cpus 1 -e block_time=10 -e flextesa_node_cors_origin='\*' oxheadalpha/flextesa:latest mumbaibox start
Unable to find image 'oxheadalpha/flextesa:latest' locally
latest: Pulling from oxheadalpha/flextesa
47517142f6ba: Pulling fs layer
658ce7058e30: Pulling fs layer
64addd922c32: Pulling fs layer
adb05cfad7a9: Waiting
90590301ad80: Waiting
4c27c32bcfac: Waiting
924da27af88d: Waiting
9ef886a97620: Waiting
e4ccaaa7cd9b: Waiting
32a6c58a22ce: Waiting
e5451ee3965c: Waiting
6bb4cc8679a8: Waiting
b10f48bc78c8: Waiting
d3c43085a7f9: Waiting
2eeb72cddc0e: Waiting
b385aabc42d4: Pull complete
f974333bafdb: Pull complete
7f59979eb6b3: Pull complete
c0087fc4d740: Pull complete
8e050ae15ea5: Pull complete
cf01129770c3: Pull complete
9ced5a310966: Pull complete
80ef921493d1: Pull complete
5a55d5fd6eae: Pull complete
72d6d5d48db1: Pull complete
a3b81a32d4c3: Pull complete
5ad046ebb22d: Pull complete
4db323cacffd: Pull complete
f15aa32b799e: Pull complete
ef7b2ab7c6d3: Pull complete
b5c2f0a12d3b: Pull complete
6cdb4e6bc887: Pull complete
11b83f0ed160: Pull complete
76567e98c016: Pull complete
b5dc167a0414: Pull complete
1ccbff00ff9a: Pull complete
cb53c32116e0: Pull complete
56507fff1400: Pull complete
Digest: sha256:712a62ae4dadaa6a1c2eea2feef9af13106caf4e5e3aa3599c7978878fb445bf
Status: Downloaded newer image for oxheadalpha/flextesa:latest
435234ac7aebf13856bb3c5eb6636b5ea60a654a80dcb738b0cff44efcfcbeb2
vscode ➜ /workspaces/DCVite (archetemplate) $ completium-cli switch endpoint
Current network: sandbox
Current endpoint: http://localhost:20000
✔ Switch endpoint · sandbox http://localhost:20000
endpoint updated
vscode ➜ /workspaces/DCVite (archetemplate) $ completium-cli deploy ./blockchain/contracts/poke_contract.arl
Originate settings:
network : sandbox
contract : poke_contract
as : alice
send : 0 ꜩ
storage : 0
total cost : 0.080981 ꜩ
Confirm settings [Yn] y
Forging operation...
Waiting for confirmation of origination for KT1WVSyowVGNjtET8gjKWTBNYGCGi7kakyaR ...
Cannot read properties of undefined (reading 'forEach')
vscode ➜ /workspaces/DCVite (archetemplate) $ completium-cli init
Completium updated successfully!
vscode ➜ /workspaces/DCVite (archetemplate) $ completium-cli switch endpoint
Current network: ghost
Current endpoint: https://ghostnet.ecadinfra.com
✔ Switch endpoint · sandbox http://localhost:20000
endpoint updated
vscode ➜ /workspaces/DCVite (archetemplate) $ completium-cli deploy ./blockchain/contracts/poke_contract.arl
Originate settings:
network : sandbox
contract : poke_contract
as : alice
send : 0 ꜩ
storage : 0
total cost : 0.080981 ꜩ
Confirm settings [Yn] y
Forging operation...
Waiting for confirmation of origination for KT1EgXM17ghcfrmugYwfi67yfVn5SpmXxdbQ ...
Origination completed for KT1EgXM17ghcfrmugYwfi67yfVn5SpmXxdbQ named poke_contract.
https://localhost:8080/sandbox/KT1EgXM17ghcfrmugYwfi67yfVn5SpmXxdbQ
