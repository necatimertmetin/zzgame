import logo from './logo.svg';
import './App.css';
import Menu from './components/pages/menu';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import GamePage from './components/pages/gamePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<Menu />}
        />
        <Route
          exact
          path="/zz"
          element={<GamePage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
