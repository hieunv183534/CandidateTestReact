import './App.css';
import {
  Routes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import Login from './component/Login.jsx';
import AdminPage from './component/AdminPage';
import HomeContent from './component/content/HomeContent'
import AccountsContent from './component/content/AccountsContent'
import QuestionsContent from './component/content/QuestionsContent'
import TestsContent from './component/content/TestsContent'
import TestResultsContent from './component/content/TestResultsContent'
import TestCandidateContent from './component/content/TestCandidateContent'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes >
            <Route exact path="/" element={<Login />} />
            <Route path="/admin" element={<AdminPage />} >
              <Route exact path="" element={<HomeContent />} />
              <Route path="account" element={<AccountsContent />} />
              <Route path="question" element={<QuestionsContent />} />
              <Route path="test" element={<TestsContent />} />
              <Route path="testcandidate" element={<TestCandidateContent />} />
              <Route path="testresult" element={<TestResultsContent />} />
            </Route>
          </Routes >
        </div>
      </Router>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
