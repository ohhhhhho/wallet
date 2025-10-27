import { useNavigate } from "react-router-dom";
import { decryptUserData } from "../utils/crypto"
import { useEffect, useState } from "react";
import { getWalletData } from "../utils/walletStorage";

interface WalletInfo {
    publicKey:string;
    privateKey:string;
}

export default function AboutWallet() {
    const navigate = useNavigate();
    const [walletInfo,setWalletInfo] = useState<WalletInfo>({
        publicKey:"",
        privateKey:""
    })
    useEffect(() => {
        const walletData = getWalletData();
        if(!walletData){
            navigate('/');
        }else{
            const parseData = JSON.parse(walletData);
            setWalletInfo({
                publicKey:decryptUserData(parseData.publicKey),
                privateKey:decryptUserData(parseData.privateKey)
            });
        }
    },[]);
    
  return (
    <main id="about">
        <section className="section">
            <div className="inner">
                <ul className="list">
                    <li className="list__item">
                        <span className="list__item__label">publicKey : </span>
                        <p className="list__item__value">{walletInfo.publicKey}</p>
                    </li>
                    <li className="list__item">
                        <span className="list__item__label">privateKey : </span>
                        <p className="list__item__value">{walletInfo.privateKey}</p>
                    </li>
                </ul>
            </div>
      </section>
    </main>
  )
}
