import { useEffect } from "react";
import { decryptUserData, encryptUserData } from "../utils/crypto";
import { HDNodeWallet } from "ethers";
import { useNavigate } from "react-router-dom";
import { encryptKeys, getWalletData, restoreWallet, setWalletData } from "../utils/walletStorage";

export default function Wallet() {
  const navigate = useNavigate();
  useEffect(() => {
    const walletData = getWalletData();
    if (!walletData){ 
      navigate('/');
      return
    }
    
    const parseData = JSON.parse(walletData);
    const decryptedPassword = decryptUserData(parseData.password);

    //import로 생성된 지갑
    if(walletData && parseData.mnemonic && parseData.active){
      const decryptedMnemonic = decryptUserData(parseData.mnemonic);
      const wallet = restoreWallet(decryptedMnemonic)
      const encryptedKey = encryptKeys(wallet)
      const updatedState = {
        ...parseData,
        ...encryptedKey
      }
      setWalletData(updatedState);
    };
    //일반 지갑 생성
    if(!parseData.mnemonic){
      const newWallet = HDNodeWallet.createRandom(decryptedPassword);
      const decryptedMnemonic = newWallet.mnemonic?.phrase || ""
      const wallet = restoreWallet(decryptedMnemonic)
      const encryptedKey = encryptKeys(wallet)

      const updatedState = {
        ...parseData,
        mnemonic: encryptUserData(decryptedMnemonic),
        ...encryptedKey
      }
      setWalletData(updatedState);
    }
}, []);

  return (
    <main id="wallet">
      <section className="section balance">
        <div className="inner">
            <div className="info">
              <p className="info__desc">Total CTC Balance</p>
              <h3 className="info__total">0 CTC</h3>
            </div>
            <div className="button-area">
              <a href="/about" className="button-common"><span>About Wallet</span></a>
              <a href="/recovery" className="button-common"><span>Recovery phrase</span></a>
            </div>
        </div>
      </section>
    </main>
  );
}
