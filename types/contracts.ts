import { Contract } from "near-api-js";

export type TokenContract = Contract & {
    balance_of: () => Promise<void>;
    reward_users_for_anniversaries: () => Promise<void>;
    change_owner_to: () => Promise<void>;
    send_aex: () => Promise<void>;
    ft_balance_of: (accountId: string) => Promise<number>;
    claim_gift: () => Promise<void>;
};
