import React from 'react';
import 'devextreme/dist/css/dx.light.css';
import MOCK_DATA from '../MOCK_DATA.json';
import {
    DataGrid,
    FilterRow,
    SearchPanel,
    Column,
    RequiredRule,
    Editing
} from 'devextreme-react/data-grid';
import '../../css/common/Table.css'
 
function Table() {
    return (
        <div className="App">
            <DataGrid id="dataGrid" 
            dataSource={MOCK_DATA}
                keyExpr="id">
                <FilterRow visible={true} />
                <SearchPanel visible={true} />
               
                <Column dataField="id">
                    <RequiredRule />
                </Column>
                <Column dataField="Name">
                    <RequiredRule />
                </Column>
                <Column dataField="Address">
                    <RequiredRule />
                </Column>
                <Column dataField="email">
                    <RequiredRule />
                </Column>
                <Column dataField="gender">
                    <RequiredRule />
                </Column>
                <Column dataField="phone">
                    <RequiredRule />
                </Column>
                <Column dataField="DateOfBirth">
                    <RequiredRule />
                </Column>
                <Editing
                    mode="popup"
                    allowUpdating={true}
                    allowDeleting={true}
                    allowAdding={true}
                />
            </DataGrid>
        </div>
    );
}
 
export default Table;