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
import PopupConfirm from '../common/PopupConfirm.js';
import { toast } from 'react-toastify';

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
        questionSections: [
        ]
      }
    ]
  }

  useEffect(() => {
    TestApi.getListTest(100, 0, "")
      .then((res) => {
        setTests(res.data.data.data);
      })
      .catch((err) => {
        console.error(err);
      });

    QuestionApi.getListQuestion(100, 0, "", "").then(res => {
      setQuestions(res.data.data.data);
    });

  }, [reload]);


  const [test, setTest] = useState(testEmpty);
  const columns = [
    "testCode",
    "testName"
  ];



  const addTestOnClick = () => {
    setFormTitle("Thêm bài kiểm tra");
    setTest(testEmpty);
    setShowFormPopup(true);
    QuestionApi.getListQuestion(100, 0, "", "").then(res => {
      setQuestions(res.data.data.data);
    });
  }

  const testAction = (data) => {
    // setTest(data.data);


    TestApi.getById(data.data.id).then(res => {
      setTest(res.data.data);
      QuestionApi.getListQuestion(100, 0, "", "").then(res1 => {
        let _quesions = res1.data.data.data;
        res.data.data.sections.forEach(section => {
          section.questionSections.forEach(questionSection => {
            _quesions = _quesions.filter(q => q.id != questionSection.questionId);
          });
        });
        setQuestions(_quesions);
      });


    }).catch(err => {
      console.log(err);
    })
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

    if (formTitle == "Thêm bài kiểm tra") {

      let _test = { ...test };
      _test.sections.forEach(section => {
        section.questionSections.forEach(questionSection => {
          questionSection.question = null;
        })
      });

      TestApi.add(_test).then(res => {
        setTest(testEmpty);
        setReload(!reload);
        toast.success('Thêm bài kiểm tra thành công');
        setShowFormPopup(false);
      }).catch(err => {
        setTest(testEmpty);
        toast.error('Mã bài thi đã tồn tại');
        setShowFormPopup(false);
      });
    } else {
      // TestApi.update(id, test).then(res => {
      //   setReload(!reload);
      //   toast.success('Cập nhật bài kiểm tra thành công');
      //   setShowFormPopup(false);
      // }).catch(err => {
      //   toast.error('Cập nhật bài kiểm tra thất bại');
      //   setShowFormPopup(false);
      // })
      toast.success('Tính năng đang được hoàn thiện');
    }
  }

  const addSection = () => {
    setTest({ ...test, sections: [...test.sections, { sectionName: "", questionSections: [] }] });
  }

  const questionClick = (i) => {
    let _test = { ...test };
    _test.sections[sectionIndex].questionSections =
      [..._test.sections[sectionIndex].questionSections, { questionId: questions[i].id, question: questions[i] }];
    setTest(_test);

    let _questions = [...questions];
    _questions.splice(i, 1);
    setQuestions(_questions);
  }

  const setSectionName = (value, index) => {
    let _test = { ...test };
    _test.sections[index].sectionName = value;
    setTest(_test);
  }

  const deleteSection = (i) => {
    let _test = { ...test };
    let _quesions = [...questions];
    let sectionRemove = _test.sections.splice(i, 1);
    sectionRemove[0].questionSections.forEach(questionSection => {
      _quesions.push(questionSection.question);
    });
    setTest(_test);
    setQuestions(_quesions);
  }

  const removeQuestionFromSection = (indexSection, indexQuestion) => {
    let _test = { ...test };
    let _questions = [...questions];
    _questions.push(_test.sections[indexSection].questionSections[indexQuestion].question);
    setQuestions(_questions);
    _test.sections[indexSection].questionSections.splice(indexQuestion, 1);
    setTest(_test);
  }



  return (
    <div className="table-account">
      <div className="header-table">
        <Button btnText={"Thêm bài kiểm tra"} btnType={"btn-primary"} btnOnClick={addTestOnClick} />
      </div>
      <Table rows={tests} columns={columns} onRowDblClick={testAction} />
      <Dialog open={showFormPopup} onClose={() => setShowFormPopup(false)}>
        <DialogTitle>{formTitle}</DialogTitle>
        <DialogContent>
          <div className="test-form">
            <div className="test-form-left">
              <p>Tên bài thi</p>
              <input type="text" value={test.testName} onInput={(e) => { setTest({ ...test, testName: e.target.value }) }} />
              <p>Mã bài thi</p>
              <input type="text" value={test.testCode} onInput={(e) => { setTest({ ...test, testCode: e.target.value }) }} />
              <div className="list-section">
                {test.sections.map((section, index1) => (
                  <div className="section-item">
                    <input type="radio" name="section" onClick={() => { setSectionIndex(index1) }} checked={index1 == sectionIndex} />
                    <p>Tên phần thi</p>
                    <input placeholder="Nhập tên phần thi" type="text" value={section.sectionName} onInput={(e) => { setSectionName(e.target.value, index1) }} />
                    <div className="list-questions-of-section">
                      {section.questionSections.map((questionSection, index2) => (
                        <div className="question-item" onClick={() => { removeQuestionFromSection(index1, index2) }}>{questionSection.question.contentText}</div>
                      ))}
                    </div>
                    <div className="delete-section" onClick={() => { deleteSection(index1) }}><i className="fas fa-trash"></i></div>
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