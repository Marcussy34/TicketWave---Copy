import React from 'react';
import { Card, CardBody, Avatar, Button } from "@nextui-org/react";

const ProfileHeader = ({ ticketCount, address }) => {
    return (
        <Card className="w-full mb-8">
            <CardBody className="flex flex-col md:flex-row items-center gap-6 p-8">
                <Avatar 
                    src="https://your-default-avatar.jpg" 
                    className="w-24 h-24 text-large"
                    isBordered
                    color="primary"
                />
                <div className="flex flex-col flex-grow">
                    <h2 className="text-2xl font-bold">
                        {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
                    </h2>
                    <p className="text-default-500">Joined since 2024</p>
                    <div className="flex gap-4 mt-4">
                        <div>
                            <p className="text-xl font-bold">{ticketCount}</p>
                            <p className="text-default-500">Tickets</p>
                        </div>
                        <div>
                            <p className="text-xl font-bold">{ticketCount}</p>
                            <p className="text-default-500">Events Attended</p>
                        </div>
                    </div>
                </div>
                {/* <Button color="primary">Edit Profile</Button> */}
            </CardBody>
        </Card>
    );
};

export default ProfileHeader;