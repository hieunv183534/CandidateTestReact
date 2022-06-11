import React from "react";
import "devextreme/dist/css/dx.light.css";
import {
  DataGrid,
  Column,
  SearchPanel
} from "devextreme-react/data-grid";
import 'devextreme/dist/css/dx.light.css';
import "../../css/common/Table.css";

function Table({ rows, columns }) {
  return (
    <div>
      <DataGrid
        dataSource={rows}
        keyExpr="id"
        defaultColumns={columns}
        showBorders={true}
        allowColumnResizing= {true}>

          <SearchPanel visible={true} />
          <Column allowSearch={false} />
        </DataGrid>
      
    </div>
  );
}

export default Table;
