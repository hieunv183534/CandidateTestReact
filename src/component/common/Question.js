import React, { useState } from "react";
import "../../css/common/Question.css";

function Question({ contentJSON = [], questionType, setNewContentJson }) {
  const [ls, setLs] = useState(contentJSON);

  const changeKey = (e, i) => {
    let _ls = [...ls];
    let _item = ls[i];
    _item.key = e.target.value;
    _ls[i] = _item;
    setLs(_ls);
    setNewContentJson(ls);
  };

  const changeValue = (e, i) => {
    let _ls = [...ls];
    if (questionType == 1) {
      _ls.forEach((item) => {
        item.value = false;
      });
      _ls[i].value = true;
    } else {
      let _item = ls[i];
      _item.value = e.target.checked;
      _ls[i] = _item;
    }
    setLs(_ls);
    setNewContentJson(ls);
  };

  return (
    <div className="question">
      {ls.map((item, index) => (
        <div className="question-item" key={index}>
          <input
            type="text"
            value={item.key}
            onInput={(e) => {
              changeKey(e, index);
            }}
          />
          <input
            type={questionType == 1 ? "radio" : "checkbox"}
            name="question"
            checked={item.value}
            onClick={(e) => {
              changeValue(e, index);
            }}
          />
          <button onClick={()=>{
          }}> <i class="fas fa-trash"></i> </button>
        </div>
      ))}
      <button
        className="fas fa-plus"
        onClick={() => {
          setLs([...ls, { key: "Nhập câu trả lời", value: false }]);
        }}
      ></button>
    </div>
  );
}

export default Question;
