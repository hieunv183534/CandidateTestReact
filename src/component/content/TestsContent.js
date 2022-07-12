import React, { useState, useEffect } from "react";
import Table from "../common/Table";
import TestApi from "../../api/entities/TestApi.js";
import QuestionApi from "../../api/entities/QuestionApi.js";
import "../../css/layout/TestContent.css";
import Button from '../common/Button.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Form } from 'devextreme-react/form';
import PopupConfirm from '../common/PopupConfirm.js';
import { toast } from 'react-toastify';
import Question from '../common/Question.js';

function TestsContent() {
  const [reload, setReload] = useState(true);
  const [id, setId] = useState('');
  const [tests, setTests] = useState([]);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [formTitle, setFormTitle] = useState("Thêm bài kiểm tra");
  const [popupConfirmSetup, setPopupConfirmSetup] = useState({ isOpen: false, actions: [] });
  const [questions, setQuestions] = useState([]);
  const [sectionIndex, setSectionIndex] = useState(0);
  const testEmpty = {
    testCode: '',
    testName: '',
    sections: [
      {
        sectionName: '',
        questions: [
        ]
      }
    ]
  }

  useEffect(() => {
    TestApi.getListTest(100, 0, "", "")
      .then((res) => {
        setTests(res.data.data.data);
        console.log('Đã nhận api' + res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });

    QuestionApi.getListQuestion(100, 0, 3, 1).then(res => {
      setQuestions(res.data.data.data);
    })

  }, [reload]);


  const [test, setTest] = useState(testEmpty);
  const columns = [
    "sectionName",
    "testCode",
    "testName"
  ];



  const addTestOnClick = () => {
    setFormTitle("Thêm bài kiểm tra");
    setTest(testEmpty);
    setShowFormPopup(true);
  }

  const testAction = (data) => {
    setTest({
      testCode: data.data.testCode,
      testName: data.data.testName,
      sections: data.data.sections
    });
    setId(data.data.id);
    setPopupConfirmSetup({
      title: "Thông báo",
      content: "Bạn muốn làm gì với bài kiểm tra " + data.data.testName,
      isOpen: true,
      actions:
        [
          {
            text: "Hủy",
            buttonType: "btn-secondary",
            callBack: () => {
              setPopupConfirmSetup({ ...popupConfirmSetup, isOpen: false })
            }
          },
          {
            text: "Chỉnh sửa",
            buttonType: "btn-primary",
            callBack: () => {
              setFormTitle("Chỉnh sửa bài kiểm tra");
              setShowFormPopup(true);
              setPopupConfirmSetup({ ...popupConfirmSetup, isOpen: false })
            }
          },
          {
            text: "Xóa",
            buttonType: "btn-secondary",
            callBack: () => {
              TestApi.delete(data.data.id).then(res => {
                setReload(!reload);
                toast.success('Xóa bài kiểm tra thành công');
                setPopupConfirmSetup({ ...popupConfirmSetup, isOpen: false })
              }).catch(err => {
                toast.error('Xóa bài kiểm tra thất bại');
                setPopupConfirmSetup({ ...popupConfirmSetup, isOpen: false })
              });
            }
          }
        ]
    });
  }

  const formTestOnSubmit = () => {
    console.log(formTitle, test);
    if (formTitle == "Thêm bài kiểm tra") {
      let _test = { ...test };
      _test.sections.forEach((section, index) => {
        section.questionSections = [];
        section.questions.forEach(question => {
          section.questionSections.push({ questionId: question.id });
        });
      });
      TestApi.add(_test).then(res => {
        setReload(!reload);
        toast.success('Thêm bài kiểm tra thành công');
        setShowFormPopup(false);
      }).catch(err => {
        toast.error('Thêm bài kiểm tra thất bại');
        setShowFormPopup(false);
      });
    } else {
      TestApi.update(id, test).then(res => {
        setReload(!reload);
        toast.success('Cập nhật bài kiểm tra thành công');
        setShowFormPopup(false);
      }).catch(err => {
        toast.error('Cập nhật bài kiểm tra thất bại');
        setShowFormPopup(false);
      })
    }
  }

  const addSection = () => {
    setTest({ ...test, sections: [...test.sections, { sectionName: "", questions: [] }] });
  }

  const questionClick = (i) => {
    console.log(questions[i]);
    let _test = { ...test };
    _test.sections[sectionIndex].questions =
      [..._test.sections[sectionIndex].questions, { id: questions[i].id, contentText: questions[i].contentText }];
    console.log(_test);
    setTest(_test);
    console.log(test);
  }

  const setSectionName = (value, index) => {
    let _test = { ...test };
    _test.sections[index].sectionName = value;
    setTest(_test);
  }



  return (
    <div className="table-account">
      <div className="header-table">
        <Button btnText={"Thêm bài kiểm tra"} btnType={"btn-primary"} btnOnClick={addTestOnClick} />
      </div>
      <Table rows={tests} columns={columns} onRowDblClick={testAction} />
      <Dialog open={true} onClose={() => setShowFormPopup(false)}>
        <DialogTitle>{formTitle}</DialogTitle>
        <DialogContent>
          <div className="test-form">
            <div className="test-form-left">
              <p>Tên bài thi</p>
              <input type="text" value={test.testName} onInput={(e) => { setTest({ ...test, testName: e.target.value }) }} />
              <p>Mã bài thi</p>
              <input type="text" value={test.testCode} onInput={(e) => { setTest({ ...test, testCode: e.target.value }) }} />
              <div className="list-section">
                {test.sections.map((section, index) => (
                  <div className="section-item">
                    <input type="radio" name="section" onClick={() => { setSectionIndex(index) }} />
                    <p>Tên phần thi</p>
                    <input placeholder="Nhập tên phần thi" type="text" value={section.sectionName} onInput={(e) => { setSectionName(e.target.value, index) }} />
                    <div className="list-questions-of-section">
                      {section.questions.map((question, index) => (
                        <div className="question-item">{question.contentText}
                          {question.type == 3 ? <input/> : <Question questionType={question.type} contentJSON={[]}/>} 
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <button onClick={addSection}><i className="fas fa-plus"></i></button>
              </div>
            </div>
            <div className="test-form-right">
              {questions.map((question, index) => (
                <div className="question-item" onClick={() => {
                  questionClick(index)
                }}>{question.contentText}</div>
              ))}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button btnText={"Hủy"} btnType={"btn-secondary"} btnOnClick={() => setShowFormPopup(false)} />
          <Button btnText={"Xác nhận"} btnType={"btn-primary"} btnOnClick={formTestOnSubmit} />
        </DialogActions>
      </Dialog>

      <PopupConfirm
        isOpen={popupConfirmSetup.isOpen}
        title={popupConfirmSetup.title}
        content={popupConfirmSetup.content}
        actions={popupConfirmSetup.actions} />
    </div>
  );
}

export default TestsContent;