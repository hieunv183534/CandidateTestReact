import React, { useState, useEffect } from "react";
import Table from "../common/Table";
import Form from "../common/Form";
import "../../css/common/Table.css";
import AccountApi from "../../api/entities/AccountApi.js";
import "../../css/layout/AccountContent.css";
import { Popup } from "devextreme-react/popup";


const renderContent = () =>  {
  return (
    <>
      <Form />
    </>
  )}


function AccountsContent() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    AccountApi.getListAccount(0, 100, "", "admin")
      .then((res) => {
        setAccounts(res.data.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const columns = [
    "id",
    "fullName",
    "email",
    "phone",
    "address",
    "dateOfBirth",
    "role",
  ];

  // const employee = {
  //   name: "John Heart",
  //   officeNumber: 901,
  //   hireDate: new Date(2012, 4, 13),
  // };

  const [isPopupVisible, setPopupVisibility] = useState(false);

  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };

  // const contentRender = () => {
  //   return (
  //     <>
        
  //     </>
  //   );
  // };

  return (
    <div className="table-account">
      <div className="header-table">
        <button onClick={togglePopup}>Thêm tài khoản</button>
      </div>
      <Table rows={accounts} columns={columns} />
      <Popup
        visible={isPopupVisible}
        closeOnOutsideClick={true}
        onHiding={togglePopup}
        showTitle={true}
        title={"Thêm tài khoản"}
        width={500}
        height={500}
        resizeEnabled={true}
        contentRender={renderContent}
         />
      
    </div>
  );
}

export default AccountsContent;
