import { ConsoleSqlOutlined } from "@ant-design/icons/lib/icons";
import { nearStore } from "../stores/near";
import { Big } from "big.js";


const tokenIssueServiceUrl =
    "https://izhogova-node-app-9phex.ondigitalocean.app/token";
// afaik this has to be run just once the contract has been deployed and before it's used
// I've already ran this on our contract with the token value of 1000000000 - that's our current total supply
// Accepts accountID & totalSupply of token that you wanna create. accountID gets all tokens.
async function initTheContractDefault(accountId, totalSupply) {
    return await window.tokenContract.new_default_meta({
        owner_id: accountId,
        total_supply: totalSupply,
    });
}

//Returns the total number of tokens that exist in circulation
export async function getTotalSupply() {
    return await window.tokenContract.ft_total_supply();
}

//Returns the number of tokens the user has
export async function getBalance(state) {
    if (!state.tokenContract) {
        return
    }
    const res = await state.tokenContract.ft_balance_of({
        account_id: state.accountId,
    });
    const blnc = new Big(res);
    const formatted = blnc.div('10e21').toFixed(1);
    if (formatted !== state.aexBalance) {
        state.setAexBalance(formatted);
    }
    return { res, formatted }
}

//Transfers token to user with receiverIdm returns (can attach a note - memo), returns void
export function sendToken(state, receiverId, amount, memo) {
    // near call $FT ft_transfer '{"receiver_id":"'$FT'", "amount":"111"}' --accountId $ID --depositYocto 1
    state.tokenContract.ft_transfer(
        { receiver_id: receiverId, amount: amount, memo: memo },
        "300000000000000", // attached GAS (optional)
        1, // attached deposit in yoctoNEAR (optional)
    );
}

//fairly confused about this one, -> https://nomicon.io/Standards/FungibleToken/Core#reference-level-explanation
export async function sendTokenCallContract(receiverId, amount, memo, msg) {
    return await window.tokenContract.ft_transfer_call({
        receiver_id: receiverId,
        amount: amount,
        memo: memo,
        msg: msg,
    });
}

/* CHANGE METHODS on receiving contract */
export async function collectTokenTransfer(senderId, amount, msg) {
    return await window.tokenContract.ft_on_transfer({
        sender_id: senderId,
        amount: amount,
        msg: msg,
    });
}

// Finalize an `ft_transfer_call` chain of cross-contract calls.
//
// The `ft_transfer_call` process:
//
// 1. Sender calls `ft_transfer_call` on FT contract
// 2. FT contract transfers `amount` tokens from sender to receiver
// 3. FT contract calls `ft_on_transfer` on receiver contract
// 4+. [receiver contract may make other cross-contract calls]
// N. FT contract resolves promise chain with `ft_resolve_transfer`, and may
//    refund sender some or all of original `amount`
//
// Requirements:
// * Contract MUST forbid calls to this function by any account except self
// * If promise chain failed, contract MUST revert token transfer
// * If promise chain resolves with a non-zero amount given as a string,
//   contract MUST return this amount of tokens to `sender_id`
//
// Arguments:
// * `sender_id`: the sender of `ft_transfer_call`
// * `receiver_id`: the `receiver_id` argument given to `ft_transfer_call`
// * `amount`: the `amount` argument given to `ft_transfer_call`
//
// Returns a string representing a string version of an unsigned 128-bit
// integer of how many total tokens were spent by sender_id. Example: if sender
// calls `ft_transfer_call({ "amount": "100" })`, but `receiver_id` only uses
// 80, `ft_on_transfer` will resolve with `"20"`, and `ft_resolve_transfer`
// will return `"80"`.
export function resolveTransfer(senderId, receiverId, amount) {
    return window.tokenContract.ft_resolve_transfer({
        sender_id: senderId,
        receiver_id: receiverId,
        amount: amount,
    });
}

//Storage - https://nomicon.io/Standards/StorageManagement#reference-level-explanation
/* Returns an object with user's total and available reserved gas for transactions */
export async function getStorageBalance(accountId) {
    return await window.tokenContract.storage_balance_of({
        account_id: accountId,
    });
}

/* Returns false if the user isn't registered */
export async function isUserRegistered(state) {
    // while(state.tokenContract==null) // wait for object to become available
    //     await new Promise(resolve => setTimeout(resolve, 100));
    let result = false;
    let balance = await state.tokenContract.storage_balance_of({
        account_id: state.accountId,
    });
    if (balance) result = true;
    console.log("userRegistered:" + result);
    return result;
}

//Allocates some storage space for user on the contract using their funds, therefore registering them on the contract
export async function registerUser(state, registrationOnly) {
    let storageBalance = await state.tokenContract
        .storage_deposit(
            {
                account_id: state.accountId,
                registration_only: registrationOnly,
            },
            "300000000000000", // attached GAS (optional)
            "1000000000000000000000000", // attached deposit in yoctoNEAR (optional)
        )
        .catch((err) => console.log("registerUser():" + err));
    return storageBalance;
}

//Calls a small service with accountID, which issues them tokens.
export async function issueTokens(accountId) {
    console.log("issueTokens");
    console.log(accountId);

    // POST request using fetch with async/await
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: accountId }),
    };

    return new Promise((resolve, reject) => {
        try {
            fetch(tokenIssueServiceUrl, requestOptions)
                .then((response) => response.json())
                .then((data) => resolve(data.result));
        } catch (e) {
            reject(e);
        }
    });
}

/* Returns a struct with min and max values, where min is the min amount of token required to start using the contract. Max could be null */
export async function getStorageBalanceBounds() {
    return await window.tokenContract.storage_balance_bounds();
}

/* Gets the min amount of token required to successfully communicate with the contract.
 *Probably a better version of the above, we only really need the min here. */
export async function getMinStorageBound() {
    let balanceBounds = await window.tokenContract.storage_balance_bounds();
    return balanceBounds.min;
}

//probably won't be using this.
export async function storageWithdraw(amount) {
    let storageBalance = await window.tokenContract.storage_withdraw({
        amount,
    });
    return storageBalance;
}

// export async function storageUnregister(force) {} //probably won't need this
