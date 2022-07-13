// import type { IPFS } from "ipfs-core-types";

export {};

declare global {
    interface Window {
        accountId: any;
        ipfs: any; // TODO: SHOULD BE ABLE TO USE IPFS TYPE IMPORTED
    }
}
