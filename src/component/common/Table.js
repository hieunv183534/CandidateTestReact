import React from "react";
import "devextreme/dist/css/dx.light.css";
import {
  DataGrid,
} from "devextreme-react/data-grid";
import "../../css/common/Table.css";

function Table({ rows, columns }) {
  return (
    <div>
      <DataGrid
        dataSource={rows}
        keyExpr="id"
        defaultColumns={columns}
        showBorders={true}
        allowColumnResizing= {true}
      />
    </div>
  );
}

export default Table;
