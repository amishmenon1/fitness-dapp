# React + TypeScript + Vite + WAGMI + Web3Modal

## Fitness Voting App (Using self-deployed smart contracts)

This is a simple application that allows users to vote between Weightlifting and Cardio. The results are posted to the Sepolia testnet via a custom smart contract that keeps track of the votes. The score is displayed in the UI.

**This is for testing purposes only. All addresses and keys are for the Ropsten testnet.**

## Prerequisites

### Install Node JS

Refer to <https://nodejs.org/en/> to install nodejs

### Install NPM dependencies

After cloning the project, install dependencies like so:

```bash
npm install
```

### Install MetaMask

To access the dapp, you must have a MetaMask wallet setup and connected to the Sepolia testnet. Votes are managed by a Voting contract which is deployed to the Sepolia chain.

### Use a Sepolia Faucet to Receive Test ETH

In order to place your vote, a write transaction must be made, which requires gas. You can get SepoliaETH by visiting any Sepolia faucets online, such as:

<https://www.alchemy.com/faucets/ethereum-sepolia>

### Set Up Environment Variables

You will need 2 environment variables setup:

1. `VITE_WALLET_CONNECT_PROJECT_ID` - Connect to <https://cloud.walletconnect.com/> using either your wallet or username/password. The project ID is needed for the Web3Modal configuration. This allows the user to connect their wallet to the app using WalletConnect's multichain modal.

2. `VITE_VOTING_CONTRACT_SEPOLIA` - needed to connect to the Voting contract. This allows the user to view the current number of votes for each fitness option, as well as place their own vote. See the value below:

```
VITE_VOTING_CONTRACT_SEPOLIA=0x5103ae21fEB68760466f70321e0B6b0bfb8Ef907
```

### Running the Application Locally

In order to run the application

```bash
npm run dev
```

## Application Design & Architecture

This dapp demonstrates proficiency in the following technologies and design decisions:

- React
- React Router
- Protected/Authenticated Routes
- React Query
- React Hooks
  - useContext
  - useState
  - useLocation
- Custom Hooks
  - useVotingContract
  - useContractStatuses
  - Wagmi Hooks
- Reusable Components
- Component Composition
- Conditional Rendering
- Web3/RPC Integration
- TypeScript
- Tailwind
- tw-merge/classNames

## Resources

## Developer Docs

### Prerequisites

1. Install Ethers
   - `npm install ethers`
2. Install Truffle (I used 5.0.0)
   - `npm install truffle@5.0.0`
3. Install Ganache CLI
   - `npm install ganache-cli`
4. Install HDWallet Provider
   - `npm install @truffle/hdwallet-provider`
5. Register for Infura account and set up node on Ropsten network (ETH testnet)
6. Install Metamask and configure connection to Ropsten testnet
   - You will also need to fund the wallet with test ETH from a Ropsten faucet

### Configuring Truffle and Ganache

1. Start Ganache CLI

   - `ganache-cli`
   - the first address in the array is the account being used (accounts[0])
   - Add mnemonic phrase to _.env_ file (must be git ignored!!)

2. Configure development network to point to local ganache instance (CLI is 8545, GUI is 7545)

3. Add Infura `PROJECT_ID` to same _.env_ file (must be git ignored!!)

4. Setup HDWallet Provider to be able to connect to a testnet

   - add these 2 lines at the top of _truffle-config.js_:
     - `require("dotenv").config();`
     - `const HDWalletProvider = require("@truffle/hdwallet-provider");`

5. Configure Ropsten network to point to Infura instance

   - ```ropsten: {
       provider: () =>
         new HDWalletProvider(
           process.env.MNEMONIC,
           `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
         ),
       network_id: 3, // Ropsten's id
       gas: 5500000, // Ropsten has a lower block limit than mainnet
       confirmations: 2, // # of confs to wait between deployments. (default: 0)
       timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
       skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
     },
     ```

   ```

   ```

### Compiling and Deploying Smart Contracts (Local)

1. Add Solidity smart contracts (.sol) to _/contracts_ folder
2. Compile with Truffle
   - `truffle compile`
   - if truffle command not found, try `npx truffle compile`
3. Migrate smart contracts to _/build_ folder
   - `truffle migrate` or `npx truffle migrate`

### Deploying Smart Contract to Testnet via Infura Node

1. Fund your test account with ETH on the Ropsten network
   - go to a Ropsten faucet and provide your account address (accounts[0] from above)
2. Migrate smart contracts to Ropsten network
   - `truffle migrate --network ropsten`

### Connecting to Smart Contract via UI

#### (Assuming an already set up skeleton UI project - I'm using React)

1. Import ethers
2. Pull in ABIs from _build_ folder
3. Pull in deployed contract address from _build_ folder
4. Get contract
   - `const storageContract = new ethers.Contract(<contract_address>)`

## Resources

- https://medium.com/coinmonks/simplest-way-to-connect-your-smart-contracts-to-the-front-end-react-with-web3-js-1e75702ea36a

- https://blog.infura.io/ethereum-javascript-libraries-web3-js-vs-ethers-js-part-ii/
