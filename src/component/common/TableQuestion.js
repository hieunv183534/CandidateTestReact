import React from 'react';
import 'devextreme/dist/css/dx.light.css';
import MOCK_DATAquestion from '../MOCK_DATA question.json';
import {
    DataGrid,
    FilterRow,
    SearchPanel,
    Column,
    RequiredRule,
    Editing
} from 'devextreme-react/data-grid';
import '../../css/common/Table.css'

 
function TableQuestion() {
    return (
        <div>
            <DataGrid id="dataGrid" 
            dataSource={MOCK_DATAquestion}
                keyExpr="id">
                <FilterRow visible={true} />
                <SearchPanel visible={true} />
               
                <Column dataField="id">
                    <RequiredRule />
                </Column>
                <Column dataField="type">
                    <RequiredRule />
                </Column>
                <Column dataField="contentText">
                    <RequiredRule />
                </Column>
                <Column dataField="category">
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
 
export default TableQuestion;