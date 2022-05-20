import React from "react";
import HomeContent from './content/HomeContent'
import AccountsContent from './content/AccountsContent'
import QuestionsContent from './content/QuestionsContent'
import TestsContent from './content/TestsContent'
import TestResultsContent from './content/TestResultsContent'
import Menu from './common/Menu';
import Header from './common/Header';
import {
    Routes ,
    Route,
  } from "react-router-dom";

function AdminPage(){
    return( 
        <div>
                <h2>Trang admin</h2>
                <Header/>
                <Menu/>
                <Routes >
                    <Route exact path="/home" element={<HomeContent />} />
                    <Route path="/account" element={<AccountsContent />} />
                    <Route path="/question" element={<QuestionsContent />} />
                    <Route path="/test" element={<TestsContent />} />
                    <Route path="/testresult" element={<TestResultsContent />} />
                </Routes >
        </div> 
    );
}

export default AdminPage;