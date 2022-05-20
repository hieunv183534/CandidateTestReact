import './App.css';
import {
  Routes ,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import LoginPage from './component/LoginPage';
import AdminPage from './component/AdminPage';

function App() {
  return (
      <Router>
        <div className="App">
          <Routes >
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes >
        </div>
      </Router>
  );
}

export default App;
