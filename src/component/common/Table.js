import React from "react";
import DataGrid from "react-data-grid";

function Table(props) {
  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' }
  ];
  
  const rows = [
    { id: 0, title: 'Example' },
    { id: 1, title: 'Demo' }
  ];
  return(
    <div>
      <DataGrid columns={columns} rows={rows}/>
    </div>
  )
}

export default Table;
