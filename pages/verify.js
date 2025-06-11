// pages/verify.js
import React, { useState } from 'react';
import { Spinner, Button } from '@nextui-org/react';
import { prepareContractCall, sendTransaction } from "thirdweb";
import { contract } from '../utils/client'; // Adjust this path based on your setup
import dynamic from 'next/dynamic';
import { useActiveAccount } from "thirdweb/react";

// Correctly import the QR Reader with proper configuration
const QrReader = dynamic(() => import('react-qr-reader-es6'), {
    ssr: false,
    loading: () => <p>Loading QR Scanner...</p>
});

const Verify = () => {
    const address = useActiveAccount();
    const [tokenId, setTokenId] = useState(null);
    const [entryStatus, setEntryStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showScanner, setShowScanner] = useState(false);

    const handleScan = (data) => {
        if (data) {
            try {
                const tokenIdMatch = data.match(/tokenId=(\d+)/);
                if (tokenIdMatch && tokenIdMatch[1]) {
                    setTokenId(tokenIdMatch[1]);
                    setEntryStatus('canEnter');
                }
            } catch (error) {
                console.error('Error parsing QR code data:', error);
            }
        }
    };

    const handleError = (error) => {
        console.error('QR Code Scan Error:', error);
    };

    const handleEntryConfirmation = async () => {
        if (!tokenId || !address) return;
        setLoading(true);

        try {
            const transaction = await prepareContractCall({
                contract,
                method: "function scanTicketForEntry(uint256 tokenId)",
                params: [tokenId],
            });

            const { transactionHash } = await sendTransaction({
                transaction,
                account: address,
            });

            console.log("Transaction successful:", transactionHash);
            setEntryStatus('successfulEntry');
            setLoading(false);
        } catch (error) {
            console.error("Transaction failed:", error);
            if (error.message.includes("Ticket already used for entry")) {
                setEntryStatus('alreadyScanned');
            } else {
                setEntryStatus('error');
            }
            setLoading(false);
        }
    };

    const handleStartScan = () => {
        setShowScanner(true);
    };

    const resetState = () => {
        setTokenId(null);
        setEntryStatus(null);
        setShowScanner(true);
        setLoading(false);
    };

    if (!address) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Ticket Verification</h1>
                <p className="text-red-500">Please connect your wallet to verify tickets.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Ticket Verification</h1>
            
            {!tokenId && !showScanner && (
                <div className="flex flex-col items-center gap-4">
                    <p className="mb-4">Click below to start scanning tickets</p>
                    <Button 
                        color="primary" 
                        size="lg"
                        onClick={handleStartScan}
                    >
                        Start Scanning
                    </Button>
                </div>
            )}

            {!tokenId && showScanner && (
                <>
                    <p className="mb-4">Please scan your ticket QR code</p>
                    <div className="flex justify-center mb-4">
                        <div style={{ width: '100%', maxWidth: '400px' }}>
                            <QrReader
                                delay={100}
                                onError={handleError}
                                onScan={handleScan}
                                style={{ width: '100%' }}
                                facingMode="environment"
                            />
                        </div>
                    </div>
                </>
            )}

            {tokenId && entryStatus === 'canEnter' && (
                <>
                    <p className="text-lg mb-4">Ticket #{tokenId} is valid for entry.</p>
                    <div className="flex flex-col items-center gap-4">
                        <Button 
                            color="success" 
                            onClick={handleEntryConfirmation}
                            disabled={loading}
                        >
                            {loading ? <Spinner size="sm" /> : 'Mark as Entered'}
                        </Button>
                        <Button color="primary" onClick={resetState}>Verify Another Ticket</Button>
                    </div>
                </>
            )}

            {tokenId && entryStatus === 'successfulEntry' && (
                <div className="flex flex-col items-center gap-4">
                    <p className="text-lg mb-4 text-green-500">✅ Participant #{tokenId} has been successfully approved for entry!</p>
                    <Button color="primary" onClick={resetState}>Verify Another Ticket</Button>
                </div>
            )}

            {tokenId && entryStatus === 'alreadyScanned' && (
                <div className="flex flex-col items-center gap-4">
                    <p className="text-lg mb-4 text-yellow-500">⚠️ Ticket #{tokenId} has already been scanned and used for entry.</p>
                    <Button color="primary" onClick={resetState}>Verify Another Ticket</Button>
                </div>
            )}

            {tokenId && entryStatus === 'error' && (
                <div className="flex flex-col items-center gap-4">
                    <p className="text-lg mb-4 text-red-500">Error: Unable to verify the ticket. Please try again.</p>
                    <Button color="primary" onClick={resetState}>Verify Another Ticket</Button>
                </div>
            )}
        </div>
    );
};

export default Verify;
