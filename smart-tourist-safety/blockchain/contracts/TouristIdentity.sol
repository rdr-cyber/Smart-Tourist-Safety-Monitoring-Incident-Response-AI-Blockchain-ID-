// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title TouristIdentity
 * @dev Smart contract for managing digital tourist identities on the blockchain
 */
contract TouristIdentity {
    // Structure to represent a tourist's digital identity
    struct DigitalIdentity {
        string touristId;
        string name;
        string nationality;
        string passportNumber;
        uint256 issuedDate;
        uint256 expiryDate;
        string itineraryHash; // Hash of the tourist's itinerary
        string emergencyContacts; // Encrypted emergency contacts
        bool isActive;
        bool isVerified;
        address issuer; // Authority that issued the identity
        uint256 createdAt;
        uint256 updatedAt;
    }

    // Mapping from tourist ID to DigitalIdentity
    mapping(string => DigitalIdentity) public identities;
    
    // Mapping from address to list of tourist IDs (for authorities)
    mapping(address => string[]) public authorityTourists;
    
    // List of all tourist IDs
    string[] public allTouristIds;
    
    // Authority management
    mapping(address => bool) public authorities;
    
    // Events
    event IdentityCreated(
        string indexed touristId,
        string name,
        string nationality,
        uint256 issuedDate,
        uint256 expiryDate,
        address issuer
    );
    
    event IdentityVerified(string indexed touristId, address verifier);
    event IdentityRevoked(string indexed touristId, address revoker);
    event IdentityUpdated(string indexed touristId, address updater);

    // Modifier to restrict access to authorities only
    modifier onlyAuthority() {
        require(authorities[msg.sender], "Only authorized entities can perform this action");
        _;
    }

    // Constructor to set the contract deployer as the first authority
    constructor() {
        authorities[msg.sender] = true;
    }

    /**
     * @dev Add a new authority
     * @param _authority The address to be added as authority
     */
    function addAuthority(address _authority) public onlyAuthority {
        authorities[_authority] = true;
    }

    /**
     * @dev Remove an authority
     * @param _authority The address to be removed from authorities
     */
    function removeAuthority(address _authority) public onlyAuthority {
        authorities[_authority] = false;
    }

    /**
     * @dev Create a new digital identity for a tourist
     * @param _touristId Unique identifier for the tourist
     * @param _name Name of the tourist
     * @param _nationality Nationality of the tourist
     * @param _passportNumber Passport number of the tourist
     * @param _issuedDate Timestamp when the identity was issued
     * @param _expiryDate Timestamp when the identity expires
     * @param _itineraryHash Hash of the tourist's itinerary
     * @param _emergencyContacts Encrypted emergency contacts
     */
    function createIdentity(
        string memory _touristId,
        string memory _name,
        string memory _nationality,
        string memory _passportNumber,
        uint256 _issuedDate,
        uint256 _expiryDate,
        string memory _itineraryHash,
        string memory _emergencyContacts
    ) public onlyAuthority {
        require(bytes(identities[_touristId].touristId).length == 0, "Identity already exists");
        
        DigitalIdentity memory newIdentity = DigitalIdentity({
            touristId: _touristId,
            name: _name,
            nationality: _nationality,
            passportNumber: _passportNumber,
            issuedDate: _issuedDate,
            expiryDate: _expiryDate,
            itineraryHash: _itineraryHash,
            emergencyContacts: _emergencyContacts,
            isActive: true,
            isVerified: true,
            issuer: msg.sender,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        
        identities[_touristId] = newIdentity;
        authorityTourists[msg.sender].push(_touristId);
        allTouristIds.push(_touristId);
        
        emit IdentityCreated(
            _touristId,
            _name,
            _nationality,
            _issuedDate,
            _expiryDate,
            msg.sender
        );
    }

    /**
     * @dev Verify a tourist's identity
     * @param _touristId The ID of the tourist to verify
     */
    function verifyIdentity(string memory _touristId) public onlyAuthority {
        require(bytes(identities[_touristId].touristId).length > 0, "Identity does not exist");
        
        identities[_touristId].isVerified = true;
        identities[_touristId].updatedAt = block.timestamp;
        
        emit IdentityVerified(_touristId, msg.sender);
    }

    /**
     * @dev Revoke a tourist's identity
     * @param _touristId The ID of the tourist to revoke
     */
    function revokeIdentity(string memory _touristId) public onlyAuthority {
        require(bytes(identities[_touristId].touristId).length > 0, "Identity does not exist");
        
        identities[_touristId].isActive = false;
        identities[_touristId].updatedAt = block.timestamp;
        
        emit IdentityRevoked(_touristId, msg.sender);
    }

    /**
     * @dev Update a tourist's itinerary hash
     * @param _touristId The ID of the tourist
     * @param _itineraryHash New itinerary hash
     */
    function updateItinerary(string memory _touristId, string memory _itineraryHash) public onlyAuthority {
        require(bytes(identities[_touristId].touristId).length > 0, "Identity does not exist");
        
        identities[_touristId].itineraryHash = _itineraryHash;
        identities[_touristId].updatedAt = block.timestamp;
        
        emit IdentityUpdated(_touristId, msg.sender);
    }

    /**
     * @dev Get the total number of tourist identities
     * @return The count of all tourist identities
     */
    function getTotalIdentities() public view returns (uint256) {
        return allTouristIds.length;
    }

    /**
     * @dev Check if a tourist identity is valid (exists, active, and not expired)
     * @param _touristId The ID of the tourist to check
     * @return Boolean indicating if the identity is valid
     */
    function isIdentityValid(string memory _touristId) public view returns (bool) {
        DigitalIdentity memory identity = identities[_touristId];
        return (
            bytes(identity.touristId).length > 0 &&
            identity.isActive &&
            identity.isVerified &&
            block.timestamp <= identity.expiryDate
        );
    }

    /**
     * @dev Get authority's tourist count
     * @param _authority The authority address
     * @return The count of tourists registered by the authority
     */
    function getAuthorityTouristCount(address _authority) public view returns (uint256) {
        return authorityTourists[_authority].length;
    }
}