import { getWalletData } from "../utils/walletStorage";

export default function Home() {
    const walletData = getWalletData();
  return (
    <main id="home">
        <section className="section">
            <div className="inner">
                <div className="logo">
                    <h1 className="logo__title">
                        <span className="blind">Creditcoin</span>
                    </h1>
                    <p className="logo__subtitle">Welcome to the
                        Credit Wallet!
                    </p>
                </div>
                <div className="button-area">
                    <a href="/signup" className="button-common">
                        <span>{walletData ? 'Login' : 'CreateWallet'}</span>
                    </a>
                    <a href="/import" className="button-import">
                        <span>I already have a wallet</span>
                    </a>
                </div>
            </div>
        </section>
    </main>
  )
}
