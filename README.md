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
