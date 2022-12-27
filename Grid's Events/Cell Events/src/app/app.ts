import { Grid, Page, Sort, Edit, Toolbar, RowDD ,CellDeselectEventArgs, CellSelectEventArgs, CheckBoxChangeEventArgs, CellSelectingEventArgs, CellEditArgs, CellSaveArgs } from '@syncfusion/ej2-grids';
import { data } from './datasource';

Grid.Inject(Page, Sort, Edit, Toolbar, RowDD)

//(cellSelected, cellSelecting) And (cellDeselected, cellDeselecting)
let grid: Grid = new Grid({
    dataSource: data,
    allowPaging: true,
    allowSorting: true,
    selectionSettings: { mode: 'Cell' },
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100, isPrimaryKey: true  },
        { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
        { field: 'ShipCity', headerText: 'Ship City', width: 100 },
        { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' },
        { field: 'ShipName', headerText: 'Ship Name', width: 100 }
    ],
    cellDeselected: cellDeselected,
    cellDeselecting: cellDeselecting,
    cellSelecting: cellSelecting,
    cellSelected: cellSelected,
    height: 180
}); 
grid.appendTo('#Grid');

function cellDeselected(args: CellDeselectEventArgs) {
    console.log("CellDeselected Working");    
}

function cellDeselecting(args: CellDeselectEventArgs) {
    console.log("Cell Deselecting Working");    
}

function cellSelected(args: CellSelectEventArgs) {
    console.log("cell Selected Working");    
}

function cellSelecting(args: CellSelectingEventArgs) {
    console.log("cell Selecting Working");    
}



//cellEdit cellSave and cellSaved
let cellGrid: Grid = new Grid({
    dataSource: data,
    toolbar:['Add', 'Delete', 'Update', 'Cancel'],
    allowPaging: true,
    allowSorting: true,
    editSettings: { allowAdding: true, allowEditing:true, allowDeleting:true, mode: 'Batch' },
    selectionSettings: { mode: 'Cell' },
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100, isPrimaryKey: true  },
        { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
        { field: 'ShipCity', headerText: 'Ship City', width: 100 },
        { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' },
        { field: 'ShipName', headerText: 'Ship Name', width: 100 }
    ],
    cellEdit: cellEdit,
    cellSave: cellSave,
    cellSaved: cellSaved,
    height: 180
}); 
cellGrid.appendTo('#CellGrid');


function cellEdit(args: CellEditArgs) {
    console.log("Cell Edit Working");    
}

function cellSave(args: CellSaveArgs) {
    console.log("Cell Save Working");    
}

function cellSaved(args: CellSaveArgs) {
    console.log("Cell Saved Working");    
}



//checkBoxChange
let checkBoxGrid: Grid = new Grid({
    dataSource: data,
    allowPaging: true,
    allowSorting: true,
    selectionSettings: { mode: 'Cell' },
    columns: [
        { field: 'Select', type: 'Checkbox'},
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 100, isPrimaryKey: true  },
        { field: 'CustomerID', headerText: 'Customer ID', width: 120 },
        { field: 'ShipCity', headerText: 'Ship City', width: 100 },
        { field: 'Freight', headerText: 'Freight', width: 100, format: 'C2' },
        { field: 'ShipName', headerText: 'Ship Name', width: 100 }
    ],
    checkBoxChange : checkBoxChange, 
    height: 180
}); 
checkBoxGrid.appendTo('#CheckBoxChange');

function checkBoxChange(args: CheckBoxChangeEventArgs) {
    console.log("Check Box Change Working");    
}

