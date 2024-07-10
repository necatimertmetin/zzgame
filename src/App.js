import logo from './logo.svg';
import './App.css';
import Menu from './components/pages/menu';
import { Routes, Route } from 'react-router-dom';
import GamePage from './components/pages/gamePage';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Menu />} />
      <Route exact path="/zz" element={<GamePage />} />
    </Routes>
  );
}

export default App;
