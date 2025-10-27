import { useNavigate } from "react-router-dom";
import { decryptUserData } from "../utils/crypto";
import { useEffect, useRef, useState } from "react";
import { getWalletData } from "../utils/walletStorage";

export default function Recovery() {
    const navigate = useNavigate();
    const [mnemonic,setMnemonic] = useState<string>("");
    const ref = useRef<HTMLTextAreaElement>(null);
    const [isCopy,setIsCopy] = useState<boolean>(true);
    const [copyStatus, setCopyStatus] = useState<string>("none");
    useEffect(() => {
        const walletData = getWalletData();
        if(!walletData) {
            navigate('/');
            return
        }
        const parseData = JSON.parse(walletData)
        setMnemonic(decryptUserData(parseData.mnemonic))
    },[])

    const showMessage = (status:string) => {
        setCopyStatus(status);
        setTimeout(() => setCopyStatus("none"), 1000);
    };
    const onClickCopy = async() => {
        if(!ref.current) return;
        await navigator.clipboard.writeText(ref.current.value);
        setIsCopy(!isCopy);
        showMessage("copied")
    }
    const onClickDelete = async() => {
        await navigator.clipboard.writeText('');
        setIsCopy(!isCopy);
        showMessage("cleared")
    }
  return (
    <main id="recovery">
        <section className="section">
            <div className="inner">
                <h6 className="title">Recovery phrase</h6>
                <p className="desc">This is the only way to recover your wallets, so record them in a secure manner.</p>
                <textarea name="mnemonic" id="mnemonic" className="textarea" ref={ref} value={mnemonic} readOnly/>
                <div className="button-wrap">
                    {isCopy ? (
                        <button onClick={onClickCopy} className="button-wrap__copy"><span>Copy to clipboard</span></button>
                    ):
                    (
                        <button onClick={onClickDelete} className="button-wrap__delete"><span>Delete to clipboard</span></button>
                    )}
                </div>
                <div className="status">
                    {copyStatus === 'copied' && <span className="status__text">Copied to clipboard.</span>}
                    {copyStatus === 'cleared' && <span className="status__text">The clipboard has been cleared.</span>}
                </div>
            </div>
        </section>
    </main>
  )
}
