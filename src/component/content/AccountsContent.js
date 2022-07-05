import React, { useState, useEffect } from "react";
import Table from "../common/Table";
import AccountApi from "../../api/entities/AccountApi.js";
import "../../css/layout/AccountContent.css";
import Button from "../common/Button.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Item } from "devextreme-react/form";
import PopupConfirm from "../common/PopupConfirm.js";
import { toast } from "react-toastify";
import DropDown from "../common/Dropdown";
const accountEmpty = {
  userName: "",
  fullName: "",
  password: "",
  phone: "",
  email: "",
  dateOfBirth: new Date(),
  address: "",
};
const columns = [
  "userName",
  "fullName",
  "email",
  "phone",
  "address",
  "dateOfBirth",
  "role",
];

const filterUser = [
  {
    id: null,
    text1: "Clear",
  },
  {
    id: "admin",
    text1: "Admin",
  },
  {
    id: "candidate",
    text1: "Candidate",
  },
];

function AccountsContent() {
  const [reload, setReload] = useState(true);
  const [id, setId] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [formTitle, setFormTitle] = useState("Thêm tài khoản");
  const [popupConfirmSetup, setPopupConfirmSetup] = useState({
    isOpen: false,
    actions: [],
  });
  const [account, setAccount] = useState(accountEmpty);

  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async (searchTerms, role) => {
    try {
      let rs = await AccountApi.getListAccount(
        0,
        100,
        searchTerms || "",
        role || ""
      );
      setAccounts(rs.data.data.data);
    } catch (error) {
      console.log("AccountContent-fetchData");
    }
  };

  const addAccountOnClick = () => {
    setFormTitle("Thêm tài khoản");
    setAccount(accountEmpty);
    setShowFormPopup(true);
  };

  const accountAction = (data) => {
    setAccount({
      userName: data.data.userName,
      fullName: data.data.fullName,
      password: "Nhập mật khẩu mới",
      phone: data.data.phone,
      email: data.data.email,
      dateOfBirth: new Date(data.data.dateOfBirth),
      address: data.data.address,
      role: data.data.role,
    });
    setId(data.data.id);
    setPopupConfirmSetup({
      title: "Thông báo",
      content: "Bạn muốn làm gì với tài khoản " + data.data.userName,
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
            setFormTitle("Chỉnh sửa tài khoản");
            setShowFormPopup(true);
            setPopupConfirmSetup({ ...popupConfirmSetup, isOpen: false });
          },
        },
        {
          text: "Xóa",
          buttonType: "btn-secondary",
          callBack: () => {
            AccountApi.delete(data.data.id)
              .then((res) => {
                setReload(!reload);
                toast.success("Xóa tài khoản thành công");
                setPopupConfirmSetup({ ...popupConfirmSetup, isOpen: false });
              })
              .catch((err) => {
                toast.error("Xóa tài khoản thất bại");
                setPopupConfirmSetup({ ...popupConfirmSetup, isOpen: false });
              });
          },
        },
      ],
    });
  };

  const formAccountOnSubmit = () => {
    console.log(formTitle, account);
    if (formTitle == "Thêm tài khoản") {
      AccountApi.add(account)
        .then((res) => {
          setReload(!reload);
          toast.success("Thêm tài khoản thành công");
          setShowFormPopup(false);
        })
        .catch((err) => {
          toast.error("Thêm tài khoản thất bại");
          setShowFormPopup(false);
        });
    } else {
      AccountApi.update(id, account)
        .then((res) => {
          setReload(!reload);
          toast.success("Cập nhật tài khoản thành công");
          setShowFormPopup(false);
        })
        .catch((err) => {
          toast.error("Cập nhật tài khoản thất bại");
          setShowFormPopup(false);
        });
    }
  };

  return (
    <div className="table-account">
      <div className="header-table">
        <DropDown
          actions={filterUser}
          onSelect={(value) => {
            fetchData(null, value.id);
          }}
        />
        <Button
          btnText={"Thêm tài khoản"}
          btnType={"btn-primary"}
          btnOnClick={addAccountOnClick}
        />
      </div>
      <Table rows={accounts} columns={columns} onRowDblClick={accountAction} />
      <Dialog open={showFormPopup} onClose={() => setShowFormPopup(false)}>
        <DialogTitle>{formTitle}</DialogTitle>
        <DialogContent>
          <Form formData={account}>
            <Item dataField="userName" />
            <Item dataField="fullName" />
            <Item dataField="password" />
            <Item dataField="phone" />
            <Item dataField="email" />
            <Item dataField="dateOfBirth" editorType="dxDateBox" />
            <Item
              dataField="role"
              editorType="dxSelectBox"
              editorOptions={{
                items: ["admin", "user"],
              }}
            />
          </Form>
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
            btnOnClick={formAccountOnSubmit}
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

export default AccountsContent;
