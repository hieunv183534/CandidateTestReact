import React, { useState, useEffect } from "react";
import Table from "../common/Table";
import TestApi from "../../api/entities/TestApi.js";
import "../../css/layout/AccountContent.css";
import Button from '../common/Button.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Form } from 'devextreme-react/form';
import PopupConfirm from '../common/PopupConfirm.js';
import { toast } from 'react-toastify';

function TestsContent() {
  const [reload,setReload] =  useState(true);
  const [id, setId] = useState('');
  const [tests, setTests] = useState([]);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [formTitle, setFormTitle] = useState("Thêm bài kiểm tra");
  const [popupConfirmSetup, setPopupConfirmSetup] = useState({ isOpen: false, actions: [] });
  const [search, setSearch] = useState ("");
  const testEmpty = {
    testCode: '',
    testName: '',
    sections: ''
  
    
  }
  
  const [test, setTest] = useState(testEmpty);
  const columns = [
    "testCode",
    "testName",
    "sections",
   
  ];

  useEffect(() => {
    TestApi.getListTest(0, 100, "", "")
      .then((res) => {
        setTests(res.data.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [reload]);

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
      TestApi.add(test).then(res => {
        setReload(!reload);
        toast.success('Thêm bài kiểm tra thành công');
        setShowFormPopup(false);
      }).catch(err => {
        toast.error('Thêm bài kiểm tra thất bại');
        setShowFormPopup(false);
      })
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
  const searchOnClick = () => {
       reload();
  }





  return (
    <div className="table-account">
      <div className="header-table">
      <input type="text" className="search" placeholder="Search for..." onChange={(e)=>setSearch(e.target.value)}/>
      <Button btnText={"Tìm kiếm"} btnType={"btn-primary"}  btnOnClick={searchOnClick} />
        <Button btnText={"Thêm bài kiểm tra"} btnType={"btn-primary"} btnOnClick={addTestOnClick} />
      </div>
      <Table rows={tests} columns={columns} onRowDblClick={testAction} />
      <Dialog open={showFormPopup} onClose={() => setShowFormPopup(false)}>
        <DialogTitle>{formTitle}</DialogTitle>
        <DialogContent>
          <Form
            formData={test}>
          </Form>
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
