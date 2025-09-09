const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// Load the contract ABI
const contractPath = path.resolve(__dirname, '../build/contracts/TouristIdentity.json');
const contractJSON = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const contractABI = contractJSON.abi;

class IdentityService {
  constructor(providerUrl, contractAddress) {
    // Initialize Web3
    this.web3 = new Web3(providerUrl);
    
    // Initialize contract instance
    this.contract = new this.web3.eth.Contract(contractABI, contractAddress);
  }

  /**
   * Create a new tourist identity on the blockchain
   * @param {Object} identityData - The tourist identity data
   * @param {string} issuerAddress - The address of the issuing authority
   * @param {string} issuerPrivateKey - The private key of the issuing authority
   * @returns {Promise<Object>} Transaction receipt
   */
  async createIdentity(identityData, issuerAddress, issuerPrivateKey) {
    const {
      touristId,
      name,
      nationality,
      passportNumber,
      issuedDate,
      expiryDate,
      itineraryHash,
      emergencyContacts
    } = identityData;

    // Create transaction object
    const tx = {
      from: issuerAddress,
      to: this.contract.options.address,
      gas: 2000000,
      data: this.contract.methods.createIdentity(
        touristId,
        name,
        nationality,
        passportNumber,
        issuedDate,
        expiryDate,
        itineraryHash,
        emergencyContacts
      ).encodeABI()
    };

    // Sign and send transaction
    const signedTx = await this.web3.eth.accounts.signTransaction(tx, issuerPrivateKey);
    const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
    return receipt;
  }

  /**
   * Verify a tourist identity
   * @param {string} touristId - The tourist ID
   * @param {string} verifierAddress - The address of the verifying authority
   * @param {string} verifierPrivateKey - The private key of the verifying authority
   * @returns {Promise<Object>} Transaction receipt
   */
  async verifyIdentity(touristId, verifierAddress, verifierPrivateKey) {
    const tx = {
      from: verifierAddress,
      to: this.contract.options.address,
      gas: 2000000,
      data: this.contract.methods.verifyIdentity(touristId).encodeABI()
    };

    const signedTx = await this.web3.eth.accounts.signTransaction(tx, verifierPrivateKey);
    const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
    return receipt;
  }

  /**
   * Revoke a tourist identity
   * @param {string} touristId - The tourist ID
   * @param {string} revokerAddress - The address of the revoking authority
   * @param {string} revokerPrivateKey - The private key of the revoking authority
   * @returns {Promise<Object>} Transaction receipt
   */
  async revokeIdentity(touristId, revokerAddress, revokerPrivateKey) {
    const tx = {
      from: revokerAddress,
      to: this.contract.options.address,
      gas: 2000000,
      data: this.contract.methods.revokeIdentity(touristId).encodeABI()
    };

    const signedTx = await this.web3.eth.accounts.signTransaction(tx, revokerPrivateKey);
    const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
    return receipt;
  }

  /**
   * Check if a tourist identity is valid
   * @param {string} touristId - The tourist ID
   * @returns {Promise<boolean>} Whether the identity is valid
   */
  async isIdentityValid(touristId) {
    try {
      const isValid = await this.contract.methods.isIdentityValid(touristId).call();
      return isValid;
    } catch (error) {
      console.error('Error checking identity validity:', error);
      return false;
    }
  }

  /**
   * Get a tourist identity
   * @param {string} touristId - The tourist ID
   * @returns {Promise<Object>} The tourist identity data
   */
  async getIdentity(touristId) {
    try {
      const identity = await this.contract.methods.identities(touristId).call();
      return {
        touristId: identity.touristId,
        name: identity.name,
        nationality: identity.nationality,
        passportNumber: identity.passportNumber,
        issuedDate: parseInt(identity.issuedDate),
        expiryDate: parseInt(identity.expiryDate),
        itineraryHash: identity.itineraryHash,
        emergencyContacts: identity.emergencyContacts,
        isActive: identity.isActive,
        isVerified: identity.isVerified,
        issuer: identity.issuer,
        createdAt: parseInt(identity.createdAt),
        updatedAt: parseInt(identity.updatedAt)
      };
    } catch (error) {
      console.error('Error getting identity:', error);
      return null;
    }
  }

  /**
   * Get the total number of identities
   * @returns {Promise<number>} The total number of identities
   */
  async getTotalIdentities() {
    try {
      const count = await this.contract.methods.getTotalIdentities().call();
      return parseInt(count);
    } catch (error) {
      console.error('Error getting total identities:', error);
      return 0;
    }
  }
}

module.exports = IdentityService;