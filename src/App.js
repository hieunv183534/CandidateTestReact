import './App.css';
import {
  Routes ,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import LoginPage from './component/LoginPage';
import AdminPage from './component/AdminPage';
import HomeContent from './component/content/HomeContent'
import AccountsContent from './component/content/AccountsContent'
import QuestionsContent from './component/content/QuestionsContent'
import TestsContent from './component/content/TestsContent'
import TestResultsContent from './component/content/TestResultsContent'

function App() {
  return (
      <Router>
        <div className="App">
          <Routes >
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} >
                  <Route exact path="" element={<HomeContent />} />
                  <Route path="account" element={<AccountsContent />} />
                  <Route path="question" element={<QuestionsContent />} />
                  <Route path="test" element={<TestsContent />} />
                  <Route path="testresult" element={<TestResultsContent />} />
            </Route>
          </Routes >
        </div>
      </Router>
  );
}

export default App;
