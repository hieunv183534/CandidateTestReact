import React from "react";
import "devextreme/dist/css/dx.light.css";
import {
  DataGrid,
  Column,
  SearchPanel
} from "devextreme-react/data-grid";
import 'devextreme/dist/css/dx.light.css';
import "../../css/common/Table.css";

function Table({ rows, columns, onRowDblClick }) {
  return (
    <div>
      <DataGrid
        dataSource={rows}
        keyExpr="id"
        defaultColumns={columns}
        showBorders={true}
        allowColumnResizing={true}
        onRowDblClick={onRowDblClick}
        focusedRowEnabled ={true}
        
        >
      </DataGrid>

    </div>
  );
}

export default Table;
