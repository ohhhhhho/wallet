import { useNavigate } from "react-router-dom"
import { encryptUserData } from "../utils/crypto";
import { v4 as uuidv4 } from 'uuid';
import PasswordPad from "../component/PasswordPad";
import { useEffect } from "react";
import { getWalletData, setWalletData } from "../utils/walletStorage";
import { UserBase } from "../types/type";

export default function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    const walletData = getWalletData();
    if(walletData){
        navigate('/login')
      }
  },[])

  const passwordCheck = (password:string) => {
    const walletData = getWalletData();
    if(!walletData){
        const userInfo:UserBase = {
          id: encryptUserData(uuidv4()),
          password: encryptUserData(password),
          createdAt: encryptUserData(new Date().toISOString()),
        };
        setWalletData(userInfo)
        navigate('/wallet');
    }else {
      navigate('/login')
    }
  }

  return (
    <PasswordPad
      complete={passwordCheck}
    />
  )
}
