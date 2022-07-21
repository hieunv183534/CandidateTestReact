import React, { useEffect, useState } from "react";
import '../../css/layout/TestAccountContent.css';
import Button from '../common/Button.js';
import Table from '../common/Table.js';
import TestApi from "../../api/entities/TestApi.js";
import TestAccountApi from "../../api/entities/TestAccountApi.js"
import TestResultApi from "../../api/entities/TestResultApi.js"
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


function TestResultsContent() {
    const [tests, setTests] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [testPickedCode, setTestPickedCode] = useState('Bạn chưa chọn');
    const [testId, setTestId] = useState('');
    const [showFormPopup, setShowFormPopup] = useState(false);

    const [testResultId, setTestResultId] = useState('');
    const [candidateName, setCandidateName] = useState("");
    const [testCode, setTestCode] = useState("");
    const [testName, setTestName] = useState("");
    const [sections, setSections] = useState([]);
    const [scores, setScores] = useState([]);
    const [listEssayScore, setListEssayScore] = useState([]);

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
            toast.success("Lấy thành công các danh sách ứng viên của bài thi " + data.data.testCode)
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
                if (_value == true && value == false) {
                    change.listAccountDown.push(candidates[i].candidateId);
                } else if (_value == false && value == true) {
                    change.listAccountUp.push(candidates[i].candidateId);
                }
            }
        }
        console.log(change);
        TestAccountApi.updateTestAccount(change).then(res => {
            toast.success("Thay đổi thành công");
            localStorage.setItem('candidates', JSON.stringify(candidates));
        }).catch(err => {
            toast.error("Thay đổi thất bại");
        });
    }

    const viewTestResult = (candidate) => {
        console.log(candidate);
        setCandidateName(candidate.username);
        TestResultApi.getTestResult(testId, candidate.candidateId).then(res => {

            if (res.data.code != 2004) {
                console.log(JSON.stringify(res.data.data, null, 2));
                setTestCode(res.data.data.testAnswer.testCode);
                setTestName(res.data.data.testAnswer.testName);
                setSections(res.data.data.testAnswer.sections);
                setTestResultId(res.data.data.id);
                let _scores = [res.data.data.soCauDung, res.data.data.soCauSai, res.data.data.soCauTuLuan];
                console.log(_scores);
                setScores(_scores);
                console.log(scores);
                setShowFormPopup(true);
            } else {
                toast.info(`Ứng viên ${candidate.username} chưa làm bài thi ${testPickedCode}!`);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const setMyScore =(indexSection, indexQuestion, value)=>{
        console.log("a ", indexSection, " b ", indexQuestion, " c ", value);
        let _sections = [...sections];
        _sections[indexSection].questionSections[indexQuestion].question.essayScore =  value;
        setSections(_sections);
    }

    const submitChamThi =()=>{
        let listNewScores = [];
        sections.forEach(section=>{
            section.questionSections.forEach(qs=>{
                if(qs.question.type == 3){
                    listNewScores.push(qs.question.essayScore);
                }
            });
        });

        for(let i=0; i<listNewScores.length; i++ ){
            listNewScores[i] = Number(listNewScores[i]);
        }

        console.log(testResultId);
        console.log(listNewScores);

        TestResultApi.chamThi(testResultId,listNewScores).then(res=>{
            toast.success("Chấm bài thi thành công!");
            setShowFormPopup(false);
        }).catch(err=>{
            console.log(err);
            toast.error("Có lỗi, vùi lòng thử lại!");
        })
    }

    return (
        <div className="test-candidate-content">
            <div className="test-candidate-header">
                <span></span>
                <Button btnText={"Reload"} btnType={"btn-primary"} btnOnClick={() => { window.location.reload() }} />
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
                                <div className="test-result" onClick={() => { viewTestResult(candidate) }}>Kết quả</div>
                                <input type="checkbox" checked={candidate.isOfTest}
                                    onClick={(e) => { changeThisCandidate(e, index) }} />
                            </div>
                        ))}
                    </div>
                    <Button btnText={"Xác nhận thay đổi"} btnType={"btn-secondary"} btnOnClick={updateCandidateTest} />
                </div>
            </div>

            <Dialog open={showFormPopup} onClose={() => setShowFormPopup(false)}>
                <DialogTitle>Kết quả thi</DialogTitle>
                <DialogContent>
                    <div className="test-form" style={{ width: 650 }}>
                        <div className="test-form-left" style={{ width: '100%', border: 0 }}>
                            <p>Tên bài thi: <strong>{testName}</strong></p>
                            <p>Mã bài thi: <strong>{testCode}</strong></p>
                            <p>Người làm bài thi: <strong>{candidateName}</strong></p>
                            <p>Số câu trắc nghiệm đúng : <strong>{scores[0]}</strong></p>
                            <p>Số câu trắc nghiệm sai: <strong>{scores[1]}</strong></p>
                            <p>Số câu tự luận: <strong>{scores[2]}</strong></p>
                            <h5 style={{ fontSize: 16 }}>Nội dung bài thi</h5>
                            <div className="list-section">
                                {sections.map((section, index1) => (
                                    <div className="section-item">
                                        <p>Tên phần thi: <strong>{section.sectionName}</strong></p>
                                        <div className="list-questions-of-section">
                                            {section.questionSections.map((questionSection, index2) => (
                                                <div className={"test-result question-item " + `${questionSection.question.type == 3 ? '' : questionSection.question.essayScore == 1 ? 'question-correct' : 'question-incorrect'}`}>
                                                    {questionSection.question.contentText}
                                                    {questionSection.question.type == 3 &&
                                                        <p>{"Trả lời: " + questionSection.question.answerText}</p>}
                                                    {questionSection.question.type == 3 && (
                                                        <span style={{ display: 'flex' }}>
                                                            Nhập số điển cho câu tự luận này (0 đến 1):&nbsp;&nbsp;
                                                            <input type="number" value={ questionSection.question.essayScore } onInput={(e)=>{ setMyScore( index1, index2, e.target.value ) }} max={1} min={0} />
                                                        </span> 
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button btnText={"Hủy"} btnType={"btn-secondary"} btnOnClick={() => setShowFormPopup(false)} />
                    <Button btnText={"Xác nhận"} btnType={"btn-primary"}  btnOnClick={submitChamThi}/>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default TestResultsContent;