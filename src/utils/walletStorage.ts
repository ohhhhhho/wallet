import { HDNodeWallet, Mnemonic } from "ethers";
import { encryptUserData } from "./crypto";
import { UserKeys, WalletData } from "../types/type";


export const getWalletData = () => {
    return localStorage.getItem('wallet_data');
}

export const setWalletData = (data:WalletData) => {
    localStorage.setItem('wallet_data',JSON.stringify(data));
}

export const restoreWallet = (mnemonicPhrase:string) => {
    const mnemonic = Mnemonic.fromPhrase(mnemonicPhrase);
    return HDNodeWallet.fromMnemonic(mnemonic);
}

export const encryptKeys = (keys:UserKeys) => {
    return {
        publicKey: encryptUserData(keys.publicKey),
        privateKey: encryptUserData(keys.privateKey),
        address: encryptUserData(keys.address),
    }
}