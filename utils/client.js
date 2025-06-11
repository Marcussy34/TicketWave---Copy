import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID

export const client = createThirdwebClient({
    clientId: clientId
});

export const contract = getContract({
    client,
    chain: defineChain(11155420),
    address: "0x5039e2bF006967F8049933c7DF6c7Ca0b49AeBeB"
  });