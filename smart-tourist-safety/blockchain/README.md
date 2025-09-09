# Blockchain Component for Smart Tourist Safety System

This directory contains the blockchain implementation for the Digital Tourist ID Generation Platform using Ethereum smart contracts.

## Overview

The blockchain component provides:
- Immutable storage of tourist digital identities
- Verification and revocation mechanisms
- Tamper-proof audit trail for all identity-related actions
- Integration with the web and mobile applications

## Smart Contract

The `TouristIdentity` smart contract manages:
- Creation of digital identities for tourists
- Verification and revocation of identities
- Storage of tourist data with timestamps
- Authority management for trusted entities

## Prerequisites

- Node.js (v16 or higher)
- Truffle Suite
- Ganache (for local development)
- Ethereum wallet with test ETH (for testnets/mainnet)

## Installation

```bash
cd blockchain
npm install
```

## Development

### 1. Start a local blockchain

Using Ganache CLI:
```bash
ganache-cli
```

Or using Ganache GUI application.

### 2. Compile the smart contracts

```bash
truffle compile
```

### 3. Deploy to local network

```bash
truffle migrate --reset
```

## Testing

```bash
truffle test
```

## Deployment to Testnets

1. Configure your wallet mnemonic and Infura key in `.env`:
```
MNEMONIC="your wallet mnemonic"
INFURA_KEY="your infura project key"
```

2. Deploy to Goerli testnet:
```bash
truffle migrate --network goerli
```

## Integration with Backend

The backend server uses the `IdentityService` to interact with the smart contract:

```javascript
const IdentityService = require('./services/identityService');

const identityService = new IdentityService(
  'http://localhost:8545',  // Ethereum provider URL
  '0x...'                   // Deployed contract address
);
```

## Smart Contract Functions

### Authority Management
- `addAuthority(address)` - Add a new authority
- `removeAuthority(address)` - Remove an authority

### Identity Management
- `createIdentity(...)` - Create a new tourist identity
- `verifyIdentity(string touristId)` - Verify a tourist identity
- `revokeIdentity(string touristId)` - Revoke a tourist identity
- `updateItinerary(string touristId, string itineraryHash)` - Update tourist itinerary

### Query Functions
- `isIdentityValid(string touristId)` - Check if an identity is valid
- `getIdentity(string touristId)` - Get identity details
- `getTotalIdentities()` - Get total number of identities

## Security Considerations

1. Only authorized entities can create, verify, or revoke identities
2. Private keys should be securely stored and never exposed
3. All sensitive data should be encrypted before being stored on-chain
4. Regular audits of authority addresses should be performed

## Future Enhancements

1. Integration with IPFS for storing large documents
2. Implementation of zero-knowledge proofs for privacy
3. Cross-chain compatibility
4. Upgradeable smart contracts using proxy patterns