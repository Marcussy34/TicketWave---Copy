import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  BatchMetadataUpdate,
  ConcertAdded,
  MetadataUpdate,
  OwnershipTransferred,
  ScannerStatusUpdated,
  TicketMinted,
  TicketScanned,
  Transfer
} from "../generated/ConcertTicketsNFT/ConcertTicketsNFT"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createBatchMetadataUpdateEvent(
  _fromTokenId: BigInt,
  _toTokenId: BigInt
): BatchMetadataUpdate {
  let batchMetadataUpdateEvent = changetype<BatchMetadataUpdate>(newMockEvent())

  batchMetadataUpdateEvent.parameters = new Array()

  batchMetadataUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "_fromTokenId",
      ethereum.Value.fromUnsignedBigInt(_fromTokenId)
    )
  )
  batchMetadataUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "_toTokenId",
      ethereum.Value.fromUnsignedBigInt(_toTokenId)
    )
  )

  return batchMetadataUpdateEvent
}

export function createConcertAddedEvent(
  concertId: BigInt,
  capacity: BigInt
): ConcertAdded {
  let concertAddedEvent = changetype<ConcertAdded>(newMockEvent())

  concertAddedEvent.parameters = new Array()

  concertAddedEvent.parameters.push(
    new ethereum.EventParam(
      "concertId",
      ethereum.Value.fromUnsignedBigInt(concertId)
    )
  )
  concertAddedEvent.parameters.push(
    new ethereum.EventParam(
      "capacity",
      ethereum.Value.fromUnsignedBigInt(capacity)
    )
  )

  return concertAddedEvent
}

export function createMetadataUpdateEvent(_tokenId: BigInt): MetadataUpdate {
  let metadataUpdateEvent = changetype<MetadataUpdate>(newMockEvent())

  metadataUpdateEvent.parameters = new Array()

  metadataUpdateEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )

  return metadataUpdateEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createScannerStatusUpdatedEvent(
  scanner: Address,
  isApproved: boolean
): ScannerStatusUpdated {
  let scannerStatusUpdatedEvent = changetype<ScannerStatusUpdated>(
    newMockEvent()
  )

  scannerStatusUpdatedEvent.parameters = new Array()

  scannerStatusUpdatedEvent.parameters.push(
    new ethereum.EventParam("scanner", ethereum.Value.fromAddress(scanner))
  )
  scannerStatusUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "isApproved",
      ethereum.Value.fromBoolean(isApproved)
    )
  )

  return scannerStatusUpdatedEvent
}

export function createTicketMintedEvent(
  concertId: BigInt,
  buyer: Address,
  tokenId: BigInt,
  timestamp: BigInt,
  tokenURI: string,
  seatType: string
): TicketMinted {
  let ticketMintedEvent = changetype<TicketMinted>(newMockEvent())

  ticketMintedEvent.parameters = new Array()

  ticketMintedEvent.parameters.push(
    new ethereum.EventParam(
      "concertId",
      ethereum.Value.fromUnsignedBigInt(concertId)
    )
  )
  ticketMintedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  ticketMintedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  ticketMintedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  ticketMintedEvent.parameters.push(
    new ethereum.EventParam("tokenURI", ethereum.Value.fromString(tokenURI))
  )
  ticketMintedEvent.parameters.push(
    new ethereum.EventParam("seatType", ethereum.Value.fromString(seatType))
  )

  return ticketMintedEvent
}

export function createTicketScannedEvent(
  tokenId: BigInt,
  concertId: BigInt,
  attendee: Address,
  timestamp: BigInt
): TicketScanned {
  let ticketScannedEvent = changetype<TicketScanned>(newMockEvent())

  ticketScannedEvent.parameters = new Array()

  ticketScannedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  ticketScannedEvent.parameters.push(
    new ethereum.EventParam(
      "concertId",
      ethereum.Value.fromUnsignedBigInt(concertId)
    )
  )
  ticketScannedEvent.parameters.push(
    new ethereum.EventParam("attendee", ethereum.Value.fromAddress(attendee))
  )
  ticketScannedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return ticketScannedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}
