import './style/index.scss';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './view/Home';
import Wallet from './view/Wallet';
import Login from './view/Login';
import ProtectedRoute from './component/ProtectedRoute';
import SignUp from './view/SignUp';
import About from './view/About';
import Recovery from './view/Recovery';
import Header from './component/Header';
import Import from './view/Import';

const pageTitle: { [key: string]: string } = {
  '/wallet': "Wallet",
  '/about': "About",
  '/recovery': "Recovery",
  '/import': ""
};
const noHeader = ['/', '/signup', '/login'];

function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname;
  const onHeader = !noHeader.includes(currentPath);
  const title = pageTitle[currentPath] || "" ;
  return (
    <main id="content" className="App">
      {onHeader && <Header title={title} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/import" element={<Import />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wallet" element={<ProtectedRoute />}>
          <Route index element={<Wallet />} />
        </Route>
        <Route path="/about" element={<ProtectedRoute />}>
          <Route index element={<About/>} />
        </Route>
        <Route path="/recovery" element={<ProtectedRoute />}>
          <Route index element={<Recovery />} />
        </Route>
      </Routes>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
