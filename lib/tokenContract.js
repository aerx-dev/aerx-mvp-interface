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
        const balance = await state.tokenContract
        ?.ft_balance_of({
            account_id: state.accountId,
        }).catch((err) => {
            console.log(err.message);
            if (err.message.includes("User does not exist")) {
                return 0;
            }
        });
        console.log("Your Balance :", balance);
        const blnc = new Big(balance || 0);
        const formatted = blnc.div("10e23").toFixed(1);
        if (formatted !== state.aexBalance) {
            state.setAexBalance(formatted);
        } 
        return { balance, formatted }; 
}

//Todo: this should be moved to another file tokenContract should be for anything token related
export async function fetchpostsData(state) {
    if (state.pnftContract) {
        const isUserRegistered = await state.pnftContract?.has_registered({user_id: state.accountId});
        console.log("Is user registered? : ", isUserRegistered);
        if (isUserRegistered) {
            const responseFeeddata = await state.pnftContract?.get_all_posts({
                user_id: state.accountId,
            });
            console.log("All posts data :", responseFeeddata);
            if (responseFeeddata) {
                state.setFeed(responseFeeddata.reverse());
            }
        }
    }
}
