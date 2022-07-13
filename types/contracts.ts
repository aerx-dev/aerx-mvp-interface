import { Contract } from "near-api-js";

export type TokenContract = Contract & {
    ft_total_supply: () => Promise<any>;
    ft_balance_of: (accountId: string) => Promise<number>;
    get_all_posts: (userId: string) => Promise<any[]>;
    ft_transfer: ({ receiverId, amount, memo }) => Promise<any>;
    ft_transfer_call: ({ receiverId, amount, memo, msg }) => Promise<void>;
    ft_on_transfer: () => Promise<void>;
    ft_resolve_transfer: ({ senderId, receiverId, amount }) => Promise<void>;
};
