import { Grid, RowDataBoundEventArgs, Page, Sort, Edit, Toolbar, RowDD ,RowDeselectEventArgs, RowDragEventArgs, RowSelectEventArgs } from '@syncfusion/ej2-grids';
import { data } from './datasource';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';

Grid.Inject(Page, Sort, Edit, Toolbar, RowDD)


//rowDataBound
let grid: Grid = new Grid({
    dataSource: data,
    allowPaging: true,
    allowSorting: true,
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
        { field: 'ShipCity', headerText: 'Ship City', width: 100 },
        { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' },
        { field: 'ShipName', headerText: 'Ship Name', width: 100 }
    ],
    rowDataBound: rowBound,
    height: 180
});
grid.appendTo('#Grid');

let count = 1;
function rowBound(args: RowDataBoundEventArgs) {
    console.log("Working : ", count);
    count+=1    
}




//rowDeselected and rowDeselecting
let deselectGrid: Grid = new Grid({
    dataSource: data,
    allowPaging: true,
    allowSorting: true,
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
        { field: 'ShipCity', headerText: 'Ship City', width: 100 },
        { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' },
        { field: 'ShipName', headerText: 'Ship Name', width: 100 }
    ],
    rowDeselected: rowDeselected,
    rowDeselecting: rowDeselecting,
    height: 180
});
deselectGrid.appendTo('#DeSelectGrid');

//rowDeselected
function rowDeselected(args: RowDeselectEventArgs) {
    console.log("DeSelectGrid Working", );   
}

//rowDeselecting
function rowDeselecting(args: RowDeselectEventArgs) {
    console.log("row Deselecting is Working", );   
}




//rowDrag and rowDragStart 
let rowDragGrid: Grid = new Grid({
    dataSource: data,
    allowPaging: true,
    allowSorting: true, 
    allowRowDragAndDrop: true,
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
        { field: 'ShipCity', headerText: 'Ship City', width: 100 },
        { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' },
        { field: 'ShipName', headerText: 'Ship Name', width: 100 }
    ],
    rowDragStartHelper:rowDragStartHelper,
    rowDragStart:rowDragStart,
    rowDrag: rowDrag,
    rowDrop:rowDrop,
    height: 180
});
rowDragGrid.appendTo('#RowDragGrid');

//rowDrag
function rowDrag(args: RowDragEventArgs) {
    console.log("rowDrag is Working", );   
}

//rowDragStart 
function rowDragStart(args: RowDragEventArgs) {
    console.log("rowDragStart is Working", );   
}

//rowDragStartHelper
function rowDragStartHelper(args: RowDragEventArgs) {
    console.log("rowDragStartHelper is Working", );   
}

//rowDrop
function rowDrop(args: RowDragEventArgs) {
    console.log("rowDrop is Working", );   
}




//rowselected and rowDeselecting
let selectGrid: Grid = new Grid({
    dataSource: data,
    allowPaging: true,
    allowSorting: true,
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
        { field: 'ShipCity', headerText: 'Ship City', width: 100 },
        { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' },
        { field: 'ShipName', headerText: 'Ship Name', width: 100 }
    ],
    rowSelected: rowSelected,
    rowSelecting: rowSelecting,
    height: 180
});
selectGrid.appendTo('#RowSelected');

//rowselected
function rowSelected(args: RowSelectEventArgs) {
    console.log("rowSelected Grid Working", );   
}

//rowselecting
function rowSelecting(args: RowSelectEventArgs) {
    console.log("rowSelecting Grid Working", );   
}



//toolbarClick
let tgrid: Grid = new Grid({
    dataSource: data,
    allowPaging: true,
    allowSorting: true,
    toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
    editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true },
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
        { field: 'ShipCity', headerText: 'Ship City', width: 100 },
        { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' },
        { field: 'ShipName', headerText: 'Ship Name', width: 100 }
    ],
    toolbarClick: toolbarClick,
    height: 180
});
tgrid.appendTo('#ToolBarGrid');

function toolbarClick(args: ClickEventArgs) {
    console.log("Toolbar Click Working");
    count+=1    
}
