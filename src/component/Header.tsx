import { useNavigate } from "react-router-dom"

export default function Header({title}:{title:string}) {
    const navigate = useNavigate();
    const onClickBack = () => {
        navigate(-1);
    }
  return (
    <header id="header">
        <div className="inner">
            <button onClick={onClickBack} className="return-button"><span className="blind">뒤로가기</span></button>
            <h1>{title}</h1>
        </div>
    </header>
  )
}
