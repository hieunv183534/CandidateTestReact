import React, { useState, useEffect } from "react";
import Table from "../common/Table";
import QuestionApi from "../../api/entities/QuestionApi.js";
import "../../css/layout/AccountContent.css";
import Button from "../common/Button.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form } from "devextreme-react/form";
import PopupConfirm from "../common/PopupConfirm.js";
import { toast } from "react-toastify";
import Question from "../common/Question.js";

function QuestionsContent() {
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
    type: 3,
    contentText: "",
    category: 1,
  };
  const [question, setQuestion] = useState(questionEmpty);
  const columns = ["type", "contentText", "category"];

  useEffect(() => {
    QuestionApi.getListQuestion(100, 0, 1, 1)
      .then((res) => {
        res.data.data.data.forEach((q) => {
          q = completeQuestion(q);
        });
        setQuestions(res.data.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [reload]);

  const completeQuestion = (question) => {
    switch (question.type) {
      case 1:
        question.type = "Trắc nghiệm 1 đáp án";
        break;
      case 2:
        question.type = "Trắc nghiệm nhiều đáp án";
        break;
      case 3:
        question.type = "Tự luận";
        break;
      default:
        break;
    }

    switch (question.category) {
      case 1:
        question.category = "Gmat";
        break;
      case 2:
        question.category = "Tiếng anh";
        break;
      case 3:
        question.category = "Chuyên môn";
        break;
      default:
        break;
    }
    return question;
  };

  const addQuestionOnClick = () => {
    setFormTitle("Thêm câu hỏi");
    setQuestion(questionEmpty);
    setShowFormPopup(true);
  };

  const questionAction = (data) => {
    setQuestion({
      type: data.data.type,
      contentText: data.data.contentText,
      category: data.data.category,
    });
    setId(data.data.id);
    setPopupConfirmSetup({
      title: "Thông báo",
      content: "Bạn muốn làm gì với caau hoir " + data.data.contentText,
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
            setFormTitle("Chỉnh sửa Caau hoir");
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
    console.log(formTitle, question);
    if (formTitle == "Thêm câu hỏi") {
      QuestionApi.add(question)
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
      QuestionApi.update(id, question)
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

  let contentjson = [
    {
      key: "Hà Tĩnh",
      value: true,
    },
    {
      key: "Hà Nội",
      value: false,
    },
    {
      key: "Hà Nam",
      value: false,
    },
  ];

  return (
    <div className="table-account">
      <div className="header-table">
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
          <Form formData={question}></Form>
          {question.type != 3 ? (
            <Question contentJSON={contentjson} questionType={question.type} />
          ) : null}
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
