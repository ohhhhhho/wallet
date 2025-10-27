import { useRef, useState } from "react";
import { decryptUserData, encryptUserData } from "../utils/crypto";
import { useNavigate } from "react-router-dom";
import { getWalletData, setWalletData } from "../utils/walletStorage";
import { UserImport } from "../types/type";

export default function Import() {
    const walletData = getWalletData();
    const navigate = useNavigate();
    const ref = useRef<HTMLTextAreaElement>(null);
    const [error,setError] = useState<string>("");
    const onClickImport = () => {
        if(!ref.current) return;
        const userInput = ref.current?.value.trim() || "";
        const userArr = userInput.split(/\s+/);

        //새로운 시드로 니모닉 생성
        if(!walletData) {
            if(userArr.length === 12 || userArr.length === 18 || userArr.length === 24){
                const userMnemonic:UserImport = {
                    mnemonic:encryptUserData(userInput),
                    isImport:true
                }
                setWalletData(userMnemonic)
                navigate('/login');
            }else{
                setError("Invalid recovery phrase");
            }
            return;
        };

        const parseData = JSON.parse(walletData);
        const decryptedMnemonic = decryptUserData(parseData.mnemonic).trim();
        const invalidRegex = /[^a-z\s]/;

        const mnemonicArr = decryptedMnemonic.split(/\s+/);
        const diffWord = mnemonicArr.filter((item, idx) => item !== userArr[idx]);

        //특수문자 에러
        if(invalidRegex.test(userInput)){
            setError("Invalid recovery phrase");
            return;
        }
        //니모닉 불일치 에러
        else if(decryptedMnemonic === userInput){
            setError("Already been imported");
            return;
        //니모닉 개수 에러
        }else if(mnemonicArr.length !== userArr.length){
            setError("Invalid recovery phrase");
            return;
        //성공시
        }else if(diffWord.length === 0){
            navigate('/login');
        }
    }
  return (
    <main id="import">
        <section className="section">
            <div className="inner">
                <div className="heading">
                    <h2 className="heading__title">Recovery phrase</h2>
                    <p className="heading__desc">Restore your existing wallet by entering the 12+ word secret recovery phrase generated during wallet creation.</p>
                </div>
                <textarea name="mnemonic" id="mnemonic" className="textarea" ref={ref} onFocus={() => setError("")}></textarea>
                {error ? <span className="error">{error}</span> : null}
                <div className="button-area">
                    <button className="button-common" onClick={onClickImport}>Import</button>
                </div>
            </div>
        </section>
    </main>
  )
}
