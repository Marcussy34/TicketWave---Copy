import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenuItem, NavbarMenu } from "@nextui-org/react";
import Link from 'next/link';
import { ConnectButton } from 'thirdweb/react';
import { client } from '../utils/client';
import { inAppWallet, createWallet } from 'thirdweb/wallets';
import { defineChain } from "thirdweb/chains";
import { useRouter } from 'next/router';

const TicketWaveNavbar = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const handleNavigation = (e, path) => {
        e.preventDefault();
        setIsMenuOpen(false);
        router.push(path);
    };

    const menuItems = [
        { name: "EVENTS", path: "/events" },
        { name: "PROFILE", path: "/profile" },
        { name: "CONTACT US", path: "/contact" },
    ];

    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            maxWidth="full"
            className="bg-[#1d2951] h-[90px] px-4 flex items-center"
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent justify="start" className="gap-4 sm:gap-12 h-full items-center">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="lg:hidden text-white"
                />
                <NavbarBrand>
                    <Link href="/" onClick={(e) => handleNavigation(e, '/')}>
                        <p className="font-serif font-bold text-inherit text-xl sm:text-3xl text-white cursor-pointer">TicketWave</p>
                    </Link>
                </NavbarBrand>

                {/* Desktop Navigation */}
                <NavbarContent className="font-serif hidden lg:flex gap-10 h-full items-center">
                    {menuItems.map((item, index) => (
                        <NavbarItem key={index}>
                            <Link 
                                href={item.path} 
                                onClick={(e) => handleNavigation(e, item.path)} 
                                className="text-white text-2xl"
                            >
                                {item.name}
                            </Link>
                        </NavbarItem>
                    ))}
                </NavbarContent>
            </NavbarContent>

            <NavbarContent justify="end" className="gap-2 lg:gap-10 h-full items-center">
                <NavbarItem className="scale-90 lg:scale-100">
                    <ConnectButton
                        client={client}
                        wallets={[
                            inAppWallet({
                                auth: {
                                    options: ["email", "google", "facebook","phone","apple"]
                                },
                                hidePrivateKeyExport: true,
                            }),
                            createWallet("io.metamask"),
                            createWallet("com.coinbase.wallet"),
                            createWallet("me.rainbow"),
                        ]}
                        connectButton={{ label: "Sign in" }}
                        connectModal={{
                            title: "Sign in to TicketWave",
                            showThirdwebBranding: false,
                        }}
                        accountAbstraction={{
                            chain: defineChain(11155420),
                            sponsorGas: true,
                            hidePrivateKeyOption: true
                          }}
                    />
                </NavbarItem>
            </NavbarContent>

            {/* Mobile Navigation Menu */}
            <NavbarMenu className="bg-[#1d2951] pt-6 font-serif">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={index}>
                        <Link
                            className="w-full text-white text-xl py-2"
                            href={item.path}
                            onClick={(e) => handleNavigation(e, item.path)}
                        >
                            {item.name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};

export default TicketWaveNavbar;    