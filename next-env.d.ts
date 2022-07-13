/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

// import type { IPFS } from "ipfs-core-types";

export {};

declare global {
    interface Window {
        accountId: any;
        ipfs: any; // TODO: SHOULD BE ABLE TO USE IPFS TYPE IMPORTED
    }
}
