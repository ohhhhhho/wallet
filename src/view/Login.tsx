import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { decryptUserData, encryptUserData } from "../utils/crypto";
import PasswordPad from "../component/PasswordPad";
import { v4 as uuidv4 } from 'uuid';
import { getWalletData, setWalletData } from "../utils/walletStorage";
import { UserWithActive } from "../types/type";


export default function Login() {
    const navigate = useNavigate();
    const [errorMsg,setErrorMsg] = useState<string>('');
    const [reset,setReset] = useState<boolean>(false);

    const inputReset = () => {
      setReset(true);
      setTimeout(() => {
        setReset(false);
      }, 0);
    }

    const passwordCheck = (password:string) => {
        const walletData = getWalletData();
      
        if(!walletData){
            setErrorMsg('등록된 계정이 없습니다.');
            inputReset();
            return
        };

        const parseData = JSON.parse(walletData);
        const decryptedPassword = decryptUserData(parseData.password);
        const decryptedMnemonic = decryptUserData(parseData.mnemonic);
        //import로 생성된 지갑
        if(walletData && decryptedMnemonic && parseData.isImport && !decryptedPassword){
          const userInfo:UserWithActive = {
          ...parseData,
          id: encryptUserData(uuidv4()),
          password: encryptUserData(password),
          createdAt: encryptUserData(new Date().toISOString()),
          active:true
          };
        setWalletData(userInfo);
        navigate('/wallet');
        }
        //localStorage에 있는 비밀번호와 비교
        if(decryptedPassword !== password){
          setErrorMsg('Passcode do not match. Try again.');
          inputReset();
          return;
        }
        navigate('/wallet');
    };

  return (
    <PasswordPad
    errorMsg={errorMsg}
    complete={passwordCheck}
    reset={reset}
    />
  )
}
