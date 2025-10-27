import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWalletData } from "../utils/walletStorage";

interface PasswordPadProps{
    passwordLength?:number;
    complete:(password:string) => void;
    errorMsg?:string;
    reset?:boolean;
}
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, "blank", 0, "delete"];

export default function PasswordPad({passwordLength = 6,
  errorMsg,
  complete,
  reset = false
}:PasswordPadProps) {
    const [input, setInput] = useState<string>("");  
    const [numbers] = useState<(number | string)[]>(NUMBERS);
    const navigate = useNavigate();
    const walletData = getWalletData();
    const parseData = walletData ? JSON.parse(walletData) : null;

    useEffect(() => {
      if(reset){
          setInput("");
      }
    },[reset])

    const onClickPad = (value: number)=> {
      if (passwordLength > input.length) {
        const newInput = input + value;
        setInput(newInput);

        if (passwordLength === newInput.length) {
          complete(newInput);
        }
      }
    };

    const onClickDelete = () => {
      setInput((prev) => prev.slice(0, -1));
    };

    const onClickBack = () => {
      setInput("");
      navigate("/");
    };

  return (
    <div id="passwordPad">
      <div className="inner">
        <div className="heading">
          <button
            className="return-button"
            onClick={onClickBack}
            aria-label="뒤로가기"
          >
            <span className="blind">뒤로가기</span>
          </button>
        </div>

        <div className="password-check">
          {parseData?.id ? (
            <h2 className="password-check__login-title">Please enter your passcode</h2>
          ):(
            <div className="password-check__signup">
              <h2 className="title">Create passcode</h2>
              <p className="desc">This is the passcode used when opening a wallet or transacting on-chain.</p>
            </div>
          )}
          <div className="password-check__wrap">
            <div className="password-check__wrap__item">
              {[...Array(passwordLength)].map((_, idx) => (
                <div
                  key={idx}
                  className={`dot ${input.length > idx ? 'active' : ''}`}
                />
              ))}
            </div>
            {errorMsg && <span className="error">{errorMsg}</span>}
          </div>
        </div>

        <div className="password-input">
          <div className="password-input__box">
            {numbers.map((item, idx) => item === 'blank' ? 
              (
                <div key={idx} className="blank" />
              ): item === 'delete' ?
              (
                <button
                  key={idx}
                  className="button-delete"
                  onClick={onClickDelete}
                >
                  <span className="blind">삭제</span>
                </button>
              ):
              (
                <button
                  key={idx}
                  className="button-pad"
                  onClick={() => onClickPad(item as number)}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
