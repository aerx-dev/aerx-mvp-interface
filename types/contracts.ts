/**
 * Type Definition of contracts
 * Refer to the issue(https://github.com/near/near-api-js/issues/719)
 * to see why it's written like this structure
 */

import { Contract } from "near-api-js";

export type TokenContract = Contract & {
    balance_of: () => Promise<void>;
    reward_users_for_anniversaries: () => Promise<void>;
    change_owner_to: () => Promise<void>;
    send_aex: () => Promise<void>;
    ft_balance_of: (accountId: string) => Promise<number>;
    claim_gift: () => Promise<void>;
};

// TODO: add args and return type as needed
export type PNFTContract = Contract & {
    is_username_available: () => Promise<void>;
    has_registered: () => Promise<void>;
    profile_by_id: (arg: {
        user_id: any;
        user_to_find_id: any;
    }) => Promise<any>; // Change the return type
    post_details: () => Promise<void>;
    get_all_posts: () => Promise<void>;
    get_user_ids: () => Promise<void>;
    repost_details: () => Promise<void>;
    get_all_repost: () => Promise<void>;
    mint_profile: () => Promise<void>;
    edit_profile: () => Promise<void>;
    mint_post: (
        args: {
            user_id: string;
            token_metadata: any;
        },
        gas: string,
    ) => Promise<void>; // Change the return type
    comment: (
        arg: {
            commenter_id: any;
            comment: string;
            post_id: number;
        },
        gas: string,
    ) => Promise<any>; // Change the return type any to minted_comment type
    charge: (
        arg: { charger_id: any; post_id: number; amount: string },
        gas: string,
    ) => Promise<void>;
};

// TODO: add args and return type as needed
export type ProfileContract = Contract & {
    mint_post: () => Promise<void>;
    charge_repost: () => Promise<void>;
    repost: () => Promise<void>;
    swap: () => Promise<void>;
    list_post_for_sale: () => Promise<void>;
    transfer_ownership: () => Promise<void>;
    buy_post: () => Promise<void>;
    is_username_available: () => Promise<void>;
    has_registered: () => Promise<void>;
    profile_by_id: () => Promise<void>;
    post_details: () => Promise<void>;
    nft_tokens: () => Promise<void>;
    get_all_posts: () => Promise<void>;
    get_user_ids: () => Promise<void>;
    repost_details: () => Promise<void>;
    get_all_repost: () => Promise<void>;
};

// TODO: add args and return type as needed
export type DexContract = Contract & {
    all_pools: () => Promise<void>;
    connect_or_get_balance: () => Promise<void>;
    create_pool: () => Promise<void>;
    lend: () => Promise<void>;
    swap_aex: () => Promise<void>;
};
