import { ConsoleSqlOutlined } from "@ant-design/icons/lib/icons";
import { nearStore } from "../stores/near";
import { Big } from "big.js";

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
    if (nearState.tokenContract && nearState.accountId) {
    const res = await state.tokenContract?.ft_balance_of({
        account_id: state.accountId,
    });
        console.log(balance);
    }

    console.log("Your Balance :", res);
    if (typeof res === 'undefined' ) {
    return;
    } else {
    const blnc = new Big(res);
    }
    const formatted = blnc.div("10e23").toFixed(1);
    if (formatted !== state.aexBalance) {
        state.setAexBalance(formatted);
    }
    return { res, formatted };
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

// export async function storageUnregister(force) {} //probably won't need this
