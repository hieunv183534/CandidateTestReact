import React, { useEffect, useState } from "react";
import '../../css/layout/TestAccountContent.css';
import Button from '../common/Button.js';
import Table from '../common/Table.js';
import TestApi from "../../api/entities/TestApi.js";
import TestAccountApi from "../../api/entities/TestAccountApi.js"
import { toast } from 'react-toastify';


function TestResultsContent() {
    const [tests, setTests] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [testPickedCode, setTestPickedCode] = useState('Bạn chưa chọn');
    const [testId, setTestId] = useState('');

    useEffect(() => {
        TestApi.getListTest(100, 0, '').then(res => {
            setTests(res.data.data.data);
        }).catch(err => {
            toast.error("Có lỗi vui lòng reload lại trang");
        });
    }, []);

    const columns = [
        "testCode",
        "testName"
    ];

    const chooseTest = (data) => {
        setTestPickedCode(data.data.testCode);
        setTestId(data.data.id);
        TestApi.getListCandidate(data.data.id).then(res => {
            setCandidates(res.data.data);
            toast.success("Lấy thành công các danh sách ứng viên của bài thi "+ data.data.testCode)
            localStorage.setItem('candidates', JSON.stringify(res.data.data));
        }).catch(err => {
            console.log(err);
            toast.error("Có lỗi vui lòng reload lại trang");
        })
    }

    const changeThisCandidate = (e, i) => {
        let _candidates = [...candidates];
        let _candidate = _candidates[i];
        _candidate.isOfTest = e.target.checked;
        setCandidates(_candidates);
    }

    const updateCandidateTest = () => {
        let change = {
            listAccountUp: [],
            listAccountDown: [],
            testId: testId
        }
        let _candidates = JSON.parse(localStorage.getItem('candidates'));
        console.log(candidates);
        for (let i = 0; i < candidates.length; i++) {
            let _value = _candidates[i].isOfTest;
            let value = candidates[i].isOfTest;
            if ((_value == true && value == true) || (_value == false) && (value == false)) {
                continue;
            } else {
                if(_value == true && value == false){
                    change.listAccountDown.push(candidates[i].candidateId);
                }else if(_value == false && value == true){
                    change.listAccountUp.push(candidates[i].candidateId);
                }
            }
        }
        console.log(change);
        TestAccountApi.updateTestAccount(change).then(res=>{
            toast.success("Thay đổi thành công");
            localStorage.setItem('candidates', JSON.stringify(candidates));
        }).catch(err=>{
            toast.error("Thay đổi thất bại");
        });
    }

    return (
        <div className="test-candidate-content">
            <div className="test-candidate-header">
                <span></span>
                <Button btnText={"Thêm gì đây?"} btnType={"btn-primary"} btnOnClick={() => { alert(1) }} />
            </div>
            <div className="test-candidate-body">
                <div className="list-test">
                    <h3>DANH SÁCH BÀI THI</h3>
                    <Table rows={tests} columns={columns} onRowDblClick={chooseTest} />
                </div>
                <div className="list-candidate">
                    <h3>DANH SÁCH ỨNG VIÊN</h3>
                    <h4>Bài thi được chọn: {testPickedCode}</h4>
                    <div className="list-of-candidate">
                        {candidates.map((candidate, index) => (
                            <div className="candidate-item" key={index}>
                                <p>{candidate.username}</p>
                                <input type="checkbox" checked={candidate.isOfTest}
                                    onClick={(e) => { changeThisCandidate(e, index) }} />
                            </div>
                        ))}
                    </div>
                    <Button btnText={"Xác nhận thay đổi"} btnType={"btn-secondary"} btnOnClick={updateCandidateTest} />
                </div>
            </div>
        </div>
    );
}

export default TestResultsContent;