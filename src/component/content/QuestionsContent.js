import React, { useState, useEffect } from "react";
import Table from "../common/Table";
import QuestionApi from "../../api/entities/QuestionApi.js";
import "../../css/layout/AccountContent.css";
import Button from "../common/Button.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Item } from "devextreme-react/form";
import PopupConfirm from "../common/PopupConfirm.js";
import { toast } from "react-toastify";
import Dropdown from "../common/Dropdown.js";
import Question from "../common/Question.js";
import { TextBox } from 'devextreme-react/text-box';

var type = '';
var category = '';
var _searchTerms = '';


function QuestionsContent() {
  const types = ["Trắc nghiệm 1 đáp án", "Trắc nghiệm nhiều đáp án", "Tự luận"];
  const categorys = ["Gmat", "Tiếng Anh", "Chuyên môn"];
  const [reload, setReload] = useState(true);
  const [id, setId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [formTitle, setFormTitle] = useState("Thêm tài khoản");
  const [popupConfirmSetup, setPopupConfirmSetup] = useState({
    isOpen: false,
    actions: [],
  });
  const questionEmpty = {
    contentText: ""
  };
  const [question, setQuestion] = useState(questionEmpty);
  const columns = ["type", "contentText", "category"];
  const [contentJSON, setContentJSON] = useState([]);

  const [questionType, setQuestionType] = useState(1);

  const loadQuestions = () => {
    QuestionApi.getListQuestion(100, 0, type, category, _searchTerms)
      .then((res) => {
        res.data.data.data.forEach((q) => {
          q = completeQuestion(q);
        });
        setQuestions(res.data.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    loadQuestions();
  }, [reload]);

  const completeQuestion = (question) => {
    question.type = types[question.type - 1];
    question.category = categorys[question.category - 1];
    return question;
  };

  const addQuestionOnClick = () => {
    setFormTitle("Thêm câu hỏi");
    setQuestion(questionEmpty);
    setShowFormPopup(true);
    setContentJSON([]);
  };

  const questionAction = (data) => {
    console.log(data.data);
    setQuestion({
      type: data.data.type,
      contentText: data.data.contentText,
      category: data.data.category,
    });
    for (let i = 0; i < 3; i++) {
      if (types[i] == data.data.type) {
        setQuestionType(i + 1);
        break;
      }
    }
    setContentJSON(data.data.contentListObject);
    setId(data.data.id);
    setPopupConfirmSetup({
      title: "Thông báo",
      content: "Bạn muốn làm gì với câu hỏi" + data.data.contentText,
      isOpen: true,
      actions: [
        {
          text: "Hủy",
          buttonType: "btn-secondary",
          callBack: () => {
            setPopupConfirmSetup({ ...popupConfirmSetup, isOpen: false });
          },
        },
        {
          text: "Chỉnh sửa",
          buttonType: "btn-primary",
          callBack: () => {
            setFormTitle("Chỉnh sửa câu hỏi");
            setShowFormPopup(true);
            setPopupConfirmSetup({ ...popupConfirmSetup, isOpen: false });
          },
        },
        {
          text: "Xóa",
          buttonType: "btn-secondary",
          callBack: () => {
            QuestionApi.delete(data.data.id)
              .then((res) => {
                setReload(!reload);
                toast.success("Xóa câu hỏi thành công");
                setPopupConfirmSetup({ ...popupConfirmSetup, isOpen: false });
              })
              .catch((err) => {
                toast.error("Xóa câu hỏi thất bại");
                setPopupConfirmSetup({ ...popupConfirmSetup, isOpen: false });
              });
          },
        },
      ],
    });
  };

  const formQuestionOnSubmit = () => {
    let myType;
    let myCategory;
    for (let i = 0; i < 3; i++) {
      if (types[i] == question.type) {
        myType = i + 1;
        break;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (categorys[i] == question.category) {
        myCategory = i + 1;
        break;
      }
    }
    let _question = { ...question, contentListObject: contentJSON, type: myType, category: myCategory };
    if (formTitle == "Thêm câu hỏi") {
      QuestionApi.add(_question)
        .then((res) => {
          setReload(!reload);
          toast.success("Thêm câu hỏi thành công");
          setShowFormPopup(false);
        })
        .catch((err) => {
          toast.error("Thêm câu hỏi thất bại");
          setShowFormPopup(false);
        });
    } else {
      QuestionApi.update(id, _question)
        .then((res) => {
          setReload(!reload);
          toast.success("Cập nhật câu hỏi thành công");
          setShowFormPopup(false);
        })
        .catch((err) => {
          toast.error("Cập nhật câu hỏi thất bại");
          setShowFormPopup(false);
        });
    }
  };

  const actions1 = [
    { id: '', text1: "Tất cả" },
    { id: 1, text1: "Trắc nghiệm 1 đáp án" },
    { id: 2, text1: "Trắc nghiệm nhiều đáp án" },
    { id: 3, text1: "Tự luận" },
  ];
  const actions2 = [
    { id: '', text1: "Tất cả" },
    { id: 1, text1: "Gmat" },
    { id: 2, text1: "Tiếng anh" },
    { id: 3, text1: "Chuyên môn" },
  ];

  const dropdownOnSelect1 = (actions1) => {
    type = actions1.id;
    loadQuestions();
  };
  const dropdownOnSelect2 = (actions2) => {
    category = actions2.id;
    loadQuestions();
  };



  const changeType = (e) => {
    for (let i = 0; i < 3; i++) {
      if (types[i] == e.itemData) {
        setQuestionType(i + 1);
        break;
      }
    }
  }


  return (
    <div className="table-account">
      <div className="header-table">
        <TextBox
          showClearButton={true}
          placeholder="Tìm kiếm câu hỏi"
          onEnterKey={() => {
            loadQuestions();
          }}
          onValueChange={(v) => { _searchTerms = v }}
        />
        <Dropdown actions={actions1} onSelect={dropdownOnSelect1} />
        <Dropdown actions={actions2} onSelect={dropdownOnSelect2} />

        <Button
          btnText={"Thêm câu hỏi"}
          btnType={"btn-primary"}
          btnOnClick={addQuestionOnClick}
        />
      </div>
      <Table
        rows={questions}
        columns={columns}
        onRowDblClick={questionAction}
      />
      <Dialog open={showFormPopup} onClose={() => setShowFormPopup(false)}>
        <DialogTitle>{formTitle}</DialogTitle>
        <DialogContent>
          <Form formData={question}>
            <Item dataField="contentText" />
            <Item
              dataField="type"
              editorType="dxSelectBox"
              editorOptions={{
                items: types,
                onItemClick: changeType
              }}
            />
            <Item
              dataField="category"
              editorType="dxSelectBox"
              editorOptions={{
                items: categorys
              }}
            />
          </Form>
          {questionType == 3 ? null : <Question contentJSON={contentJSON} questionType={questionType} setNewContentJson={setContentJSON} />}

        </DialogContent>
        <DialogActions>
          <Button
            btnText={"Hủy"}
            btnType={"btn-secondary"}
            btnOnClick={() => setShowFormPopup(false)}
          />
          <Button
            btnText={"Xác nhận"}
            btnType={"btn-primary"}
            btnOnClick={formQuestionOnSubmit}
          />
        </DialogActions>
      </Dialog>

      <PopupConfirm
        isOpen={popupConfirmSetup.isOpen}
        title={popupConfirmSetup.title}
        content={popupConfirmSetup.content}
        actions={popupConfirmSetup.actions}
      />
    </div>
  );
}

export default QuestionsContent;