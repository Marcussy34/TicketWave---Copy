// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol"; 

contract ConcertTicketsNFT is ERC721URIStorage, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Concert {
        uint256 totalCapacity;
        uint256 ticketsSold;
    }

    struct Ticket {
        uint256 concertId;
        bool hasEntered;
        uint256 purchaseDate;
    }

    mapping(uint256 => Concert) public concerts; // concertId => Concert
    mapping(uint256 => Ticket) public tickets; // tokenId => Ticket

    event TicketMinted(
        uint256 indexed concertId,
        address indexed buyer,
        uint256 tokenId,
        uint256 timestamp,
        string tokenURI,
        string seatType
    );

    event ConcertAdded(uint256 indexed concertId, uint256 capacity);

    event TicketScanned(
        uint256 indexed tokenId,
        uint256 indexed concertId,
        address indexed attendee,
        uint256 timestamp
    );

    // Add new mapping for scanners
    mapping(address => bool) public approvedScanners;
    
    // Add event for scanner management
    event ScannerStatusUpdated(address scanner, bool isApproved);
    
    // Add modifier for scanner access
    modifier onlyScanner() {
        require(approvedScanners[msg.sender] || msg.sender == owner(), "Not authorized scanner");
        _;
    }

    constructor() ERC721("ConcertTicket", "CTKT") Ownable() {}

    // Add a new concert
    function addConcert(
        uint256 concertId,
        uint256 capacity
    ) external onlyOwner {
        require(
            concerts[concertId].totalCapacity == 0,
            "Concert already exists"
        );
        require(capacity > 0, "Capacity must be greater than 0");

        concerts[concertId] = Concert({
            totalCapacity: capacity,
            ticketsSold: 0
        });

        emit ConcertAdded(concertId, capacity);
    }

    // Modified purchase ticket function to accept image URI directly
    function purchaseTicket(
        uint256 concertId,
        string memory imageURI,
        string memory seatType
    ) external nonReentrant {
        Concert storage concert = concerts[concertId];
        require(concert.totalCapacity > 0, "Concert does not exist");
        require(
            concert.ticketsSold < concert.totalCapacity,
            "Concert sold out"
        );

        concert.ticketsSold += 1;
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        // Create a base64 encoded JSON metadata with the image URI
        string memory metadata = string(
            abi.encodePacked(
                '{"name": "Concert Ticket #',
                toString(newTokenId),
                '", "description": "Concert Ticket", "image": "',
                imageURI,
                '"}'
            )
        );
        
        // Encode the JSON as base64 and create a data URI
        string memory tokenURI = string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(bytes(metadata))
            )
        );

        // Mint the ticket as an NFT and set the token URI
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        // Store ticket data
        tickets[newTokenId] = Ticket({
            concertId: concertId,
            hasEntered: false,
            purchaseDate: block.timestamp
        });

        emit TicketMinted(
            concertId,
            msg.sender,
            newTokenId,
            block.timestamp,
            tokenURI,
            seatType
        );
    }

    // Helper function to convert uint to string
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    // Scan ticket for entry
    function scanTicketForEntry(
        uint256 tokenId
    ) external nonReentrant onlyScanner {
        require(_exists(tokenId), "Ticket does not exist");
        Ticket storage ticket = tickets[tokenId];
        require(!ticket.hasEntered, "Ticket already used for entry");

        ticket.hasEntered = true;

        emit TicketScanned(
            tokenId,
            ticket.concertId,
            ownerOf(tokenId),
            block.timestamp
        );
    }

    // View function to get ticket details
    function getTicketDetails(
        uint256 tokenId
    )
        external
        view
        returns (
            uint256 concertId,
            bool hasEntered,
            uint256 purchaseDate,
            string memory tokenURI,
            address ticketOwner
        )
    {
        require(_exists(tokenId), "Ticket does not exist");
        Ticket memory ticket = tickets[tokenId];
        return (
            ticket.concertId,
            ticket.hasEntered,
            ticket.purchaseDate,
            super.tokenURI(tokenId),
            ownerOf(tokenId)
        );
    }

    // View function to get concert details
    function getConcertDetails(
        uint256 concertId
    ) external view returns (uint256 totalCapacity, uint256 ticketsSold) {
        Concert memory concert = concerts[concertId];
        return (concert.totalCapacity, concert.ticketsSold);
    }

    // Add function to manage scanners
    function setScanner(address scanner, bool isApproved) external onlyOwner {
        approvedScanners[scanner] = isApproved;
        emit ScannerStatusUpdated(scanner, isApproved);
    }
}